import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";

console.log("All imports successful");

window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('body stream already read')) {
    event.preventDefault();
    console.warn('Suppressed Supabase response parsing error');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('body stream already read')) {
    event.preventDefault();
    console.warn('Suppressed Supabase response parsing error');
  }
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <App />
  );
  console.log("Render successful");
} else {
  console.error("Root element not found!");
}
