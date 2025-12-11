<<<<<<< HEAD
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from supabase import create_client, Client
=======
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
<<<<<<< HEAD
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests
import base64
import json
=======
from typing import List
import uuid
from datetime import datetime, timezone

>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

<<<<<<< HEAD
# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Supabase connection
supabase_url = os.environ.get("SUPABASE_URL", "")
supabase_key = os.environ.get("SUPABASE_KEY", "")
supabase: Client = create_client(supabase_url, supabase_key)
=======
# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
<<<<<<< HEAD
    model_config = ConfigDict(extra="ignore")
=======
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

<<<<<<< HEAD
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
=======
# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
<<<<<<< HEAD
    # Convert to dict and serialize datetime to ISO string for Supabase
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    # Supabase insert
    response = supabase.table('status_checks').insert(doc).execute()
    # The response.data will contain the inserted record(s)
    
=======
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
<<<<<<< HEAD
    response = supabase.table('status_checks').select("*").execute()
    status_checks = response.data
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
=======
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

<<<<<<< HEAD
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

=======
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
<<<<<<< HEAD
)
=======
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
