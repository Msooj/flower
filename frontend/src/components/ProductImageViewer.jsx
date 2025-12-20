import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';

const ProductImageViewer = ({ imageUrl, alt = "Product Image", children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children || (
          <img 
            src={imageUrl} 
            alt={alt} 
            className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
          />
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-none">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={imageUrl}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImageViewer;
