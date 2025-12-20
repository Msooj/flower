from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests
import base64
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Supabase connection - moved to function to avoid module-level issues
def get_supabase_client():
    supabase_url = os.environ.get("SUPABASE_URL", "")
    supabase_key = os.environ.get("SUPABASE_KEY", "")
    
    if not supabase_url:
        logger.warning("SUPABASE_URL not found in environment variables")
    if not supabase_key:
        logger.warning("SUPABASE_KEY not found in environment variables")
    
    if not supabase_url or not supabase_key:
        logger.error("Supabase credentials missing. Please check your .env file.")
        raise ValueError("Supabase credentials are required")
    
    try:
        client = create_client(supabase_url, supabase_key)
        # Test connection
        test_response = client.table('products').select('id').limit(1).execute()
        logger.info("Supabase connection successful")
        return client
    except Exception as e:
        logger.error(f"Failed to connect to Supabase: {e}")
        raise

# For backward compatibility - will raise error if Supabase not configured
try:
    supabase = get_supabase_client()
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {e}")
    supabase = None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class MpesaPaymentRequest(BaseModel):
    phone_number: str
    amount: float
    order_id: str
    account_reference: str = "FlowerShop"
    transaction_desc: str = "Flower Purchase"

class MpesaCallbackResponse(BaseModel):
    merchant_request_id: str
    checkout_request_id: str
    result_code: int
    result_desc: str
    amount: Optional[float] = None
    mpesa_receipt_number: Optional[str] = None
    transaction_date: Optional[str] = None
    phone_number: Optional[str] = None

class Product(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    category: str
    image: Optional[str] = None
    badge: Optional[str] = None
    rating: Optional[float] = 5.0
    reviews: Optional[int] = 0
    stock: Optional[int] = 100
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class OrderItem(BaseModel):
    id: Optional[str] = None
    order_id: Optional[str] = None
    product_id: str
    product_name: str
    quantity: int
    price: float
    created_at: Optional[str] = None

class Order(BaseModel):
    id: Optional[str] = None
    user_id: Optional[str] = None
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    customer_address: str
    personalized_message: Optional[str] = None
    delivery_date: Optional[str] = None
    delivery_time: Optional[str] = None
    total_amount: float
    status: str = 'pending'
    payment_method: Optional[str] = 'cash'
    payment_phone_number: Optional[str] = None
    payment_status: Optional[str] = 'pending'
    order_items: Optional[List[OrderItem]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class UserProfile(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    role: str = 'customer'
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# M-Pesa Configuration
MPESA_CONSUMER_KEY = os.environ.get("MPESA_CONSUMER_KEY", "")
MPESA_CONSUMER_SECRET = os.environ.get("MPESA_CONSUMER_SECRET", "")
MPESA_BUSINESS_SHORTCODE = os.environ.get("MPESA_BUSINESS_SHORTCODE", "174379")
MPESA_PASSKEY = os.environ.get("MPESA_PASSKEY", "")
MPESA_CALLBACK_URL = os.environ.get("MPESA_CALLBACK_URL", "https://your-domain.com/api/mpesa/callback")
MPESA_ENVIRONMENT = os.environ.get("MPESA_ENVIRONMENT", "sandbox")  # sandbox or production

# M-Pesa URLs
if MPESA_ENVIRONMENT == "production":
    MPESA_BASE_URL = "https://api.safaricom.co.ke"
else:
    MPESA_BASE_URL = "https://sandbox.safaricom.co.ke"

def get_mpesa_access_token():
    """Get M-Pesa access token"""
    try:
        url = f"{MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
        credentials = base64.b64encode(f"{MPESA_CONSUMER_KEY}:{MPESA_CONSUMER_SECRET}".encode()).decode()
        
        headers = {
            "Authorization": f"Basic {credentials}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        return response.json().get("access_token")
    except Exception as e:
        logger.error(f"Error getting M-Pesa access token: {e}")
        return None

def format_phone_number(phone: str) -> str:
    """Format phone number to M-Pesa format (254XXXXXXXXX)"""
    phone = phone.strip().replace(" ", "").replace("+", "")
    if phone.startswith("0"):
        phone = "254" + phone[1:]
    elif phone.startswith("7") or phone.startswith("1"):
        phone = "254" + phone
    return phone

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Flower Shop API - M-Pesa Integration Active"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for Supabase
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    # Supabase insert
    response = supabase.table('status_checks').insert(doc).execute()
    # The response.data will contain the inserted record(s)
    
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    try:
        response = supabase.table('status_checks').select("*").execute()
        status_checks = response.data or []
        
        # Convert ISO string timestamps back to datetime objects
        for check in status_checks:
            if isinstance(check.get('timestamp'), str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        
        return status_checks
    except Exception as e:
        logger.error(f"Error fetching status checks: {e}")
        # Return empty list if table doesn't exist or other error
        return []

@api_router.post("/mpesa/stk-push")
async def initiate_stk_push(payment_request: MpesaPaymentRequest):
    """Initiate M-Pesa STK Push payment"""
    try:
        access_token = get_mpesa_access_token()
        if not access_token:
            raise HTTPException(status_code=500, detail="Failed to get M-Pesa access token")
        
        # Format phone number
        phone_number = format_phone_number(payment_request.phone_number)
        
        # Generate timestamp and password
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(
            f"{MPESA_BUSINESS_SHORTCODE}{MPESA_PASSKEY}{timestamp}".encode()
        ).decode()
        
        # STK Push payload
        payload = {
            "BusinessShortCode": MPESA_BUSINESS_SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(payment_request.amount),
            "PartyA": phone_number,
            "PartyB": MPESA_BUSINESS_SHORTCODE,
            "PhoneNumber": phone_number,
            "CallBackURL": MPESA_CALLBACK_URL,
            "AccountReference": payment_request.account_reference,
            "TransactionDesc": payment_request.transaction_desc
        }
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        url = f"{MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest"
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        result = response.json()
        
        # Store payment request in database
        payment_data = {
            "order_id": payment_request.order_id,
            "phone_number": phone_number,
            "amount": payment_request.amount,
            "merchant_request_id": result.get("MerchantRequestID"),
            "checkout_request_id": result.get("CheckoutRequestID"),
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Note: You'll need to create a 'mpesa_payments' table in your database
        # supabase.table('mpesa_payments').insert([payment_data]).execute()
        
        return {
            "success": True,
            "message": "STK Push sent successfully",
            "merchant_request_id": result.get("MerchantRequestID"),
            "checkout_request_id": result.get("CheckoutRequestID")
        }
        
    except requests.exceptions.RequestException as e:
        logger.error(f"M-Pesa API error: {e}")
        raise HTTPException(status_code=500, detail="M-Pesa service unavailable")
    except Exception as e:
        logger.error(f"STK Push error: {e}")
        raise HTTPException(status_code=500, detail="Payment initiation failed")

@api_router.post("/mpesa/callback")
async def mpesa_callback(callback_data: dict):
    """Handle M-Pesa payment callback"""
    try:
        logger.info(f"M-Pesa callback received: {callback_data}")
        
        # Extract callback data
        stk_callback = callback_data.get("Body", {}).get("stkCallback", {})
        merchant_request_id = stk_callback.get("MerchantRequestID")
        checkout_request_id = stk_callback.get("CheckoutRequestID")
        result_code = stk_callback.get("ResultCode")
        result_desc = stk_callback.get("ResultDesc")
        
        # Process successful payment
        if result_code == 0:
            callback_metadata = stk_callback.get("CallbackMetadata", {}).get("Item", [])
            
            # Extract payment details
            payment_details = {}
            for item in callback_metadata:
                name = item.get("Name")
                value = item.get("Value")
                if name == "Amount":
                    payment_details["amount"] = value
                elif name == "MpesaReceiptNumber":
                    payment_details["receipt_number"] = value
                elif name == "TransactionDate":
                    payment_details["transaction_date"] = value
                elif name == "PhoneNumber":
                    payment_details["phone_number"] = value
            
            # Update payment status in database
            # You'll need to implement this based on your database schema
            logger.info(f"Payment successful: {payment_details}")
            
            # Update order status to 'paid'
            # supabase.table('orders').update({"payment_status": "paid"}).eq("id", order_id).execute()
            
        else:
            # Payment failed
            logger.warning(f"Payment failed: {result_desc}")
            
        return {"ResultCode": 0, "ResultDesc": "Success"}
        
    except Exception as e:
        logger.error(f"Callback processing error: {e}")
        return {"ResultCode": 1, "ResultDesc": "Error processing callback"}

@api_router.get("/mpesa/payment-status/{checkout_request_id}")
async def check_payment_status(checkout_request_id: str):
    """Check M-Pesa payment status"""
    try:
        access_token = get_mpesa_access_token()
        if not access_token:
            raise HTTPException(status_code=500, detail="Failed to get M-Pesa access token")
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(
            f"{MPESA_BUSINESS_SHORTCODE}{MPESA_PASSKEY}{timestamp}".encode()
        ).decode()
        
        payload = {
            "BusinessShortCode": MPESA_BUSINESS_SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "CheckoutRequestID": checkout_request_id
        }
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        url = f"{MPESA_BASE_URL}/mpesa/stkpushquery/v1/query"
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        return response.json()
        
    except Exception as e:
        logger.error(f"Payment status check error: {e}")
        raise HTTPException(status_code=500, detail="Failed to check payment status")

@api_router.get("/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection not available")
    try:
        response = supabase.table('products').select('*').order('created_at', ascending=False).execute()
        if hasattr(response, 'data'):
            return response.data or []
        return []
    except Exception as e:
        logger.error(f"Error fetching products: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch products: {str(e)}")

@api_router.post("/products", response_model=Product)
async def create_product(product: Product):
    """Create a new product"""
    try:
        product_data = product.model_dump(exclude={'id', 'created_at', 'updated_at'})
        product_data['created_at'] = datetime.now(timezone.utc).isoformat()
        product_data['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        response = supabase.table('products').insert([product_data]).execute()
        return response.data[0] if response.data else product_data
    except Exception as e:
        logger.error(f"Error creating product: {e}")
        raise HTTPException(status_code=500, detail="Failed to create product")

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: Product):
    """Update an existing product"""
    try:
        product_data = product.model_dump(exclude={'id', 'created_at', 'updated_at'})
        product_data['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        response = supabase.table('products').update(product_data).eq('id', product_id).execute()
        return response.data[0] if response.data else product_data
    except Exception as e:
        logger.error(f"Error updating product: {e}")
        raise HTTPException(status_code=500, detail="Failed to update product")

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """Delete a product"""
    try:
        supabase.table('products').delete().eq('id', product_id).execute()
        return {"success": True, "message": "Product deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting product: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete product")

@api_router.get("/orders", response_model=List[Order])
async def get_orders():
    """Get all orders with order items"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection not available")
    try:
        response = supabase.table('orders').select('*, order_items(*)').order('created_at', ascending=False).execute()
        if hasattr(response, 'data'):
            return response.data or []
        return []
    except Exception as e:
        logger.error(f"Error fetching orders: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch orders: {str(e)}")

class OrderStatusUpdate(BaseModel):
    status: str

@api_router.put("/orders/{order_id}")
async def update_order(order_id: str, update: OrderStatusUpdate):
    """Update order status"""
    try:
        update_data = {
            'status': update.status,
            'updated_at': datetime.now(timezone.utc).isoformat()
        }
        response = supabase.table('orders').update(update_data).eq('id', order_id).execute()
        return {"success": True, "message": "Order updated successfully", "data": response.data}
    except Exception as e:
        logger.error(f"Error updating order: {e}")
        raise HTTPException(status_code=500, detail="Failed to update order")

@api_router.get("/users", response_model=List[UserProfile])
async def get_users():
    """Get all user profiles"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection not available")
    try:
        response = supabase.table('user_profiles').select('*').order('created_at', ascending=False).execute()
        if hasattr(response, 'data'):
            return response.data or []
        return []
    except Exception as e:
        logger.error(f"Error fetching users: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch users: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
