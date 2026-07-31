import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '+254742370307';
  const message = 'Hello, I would like to order some flowers.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 md:bottom-8 md:right-6 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-xl z-[999] transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)' }}
    >
      {/* Official WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.002 2C8.28 2 2 8.28 2 16c0 2.48.67 4.8 1.84 6.8L2 30l7.4-1.8A13.94 13.94 0 0 0 16.002 30C23.72 30 30 23.72 30 16S23.72 2 16.002 2zm0 25.6a11.55 11.55 0 0 1-5.9-1.62l-.42-.25-4.38 1.07 1.1-4.27-.27-.44A11.56 11.56 0 0 1 4.4 16c0-6.4 5.2-11.6 11.6-11.6S27.6 9.6 27.6 16s-5.2 11.6-11.598 11.6zm6.36-8.68c-.35-.18-2.07-1.02-2.39-1.13-.32-.12-.55-.18-.78.18s-.9 1.13-1.1 1.37c-.2.23-.4.26-.75.09-.35-.18-1.47-.54-2.8-1.73a10.5 10.5 0 0 1-1.94-2.41c-.2-.35-.02-.54.15-.71.16-.16.35-.4.52-.6.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.62-.09-.18-.78-1.88-1.07-2.57-.28-.68-.57-.59-.78-.6h-.67c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.85s1.23 3.3 1.4 3.53c.18.23 2.42 3.7 5.86 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.07-.85 2.36-1.67.29-.82.29-1.52.2-1.67-.08-.15-.31-.23-.66-.4z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
