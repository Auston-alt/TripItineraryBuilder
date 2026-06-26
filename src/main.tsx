import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.scss";
import "./tailwind.css";
import App from "./App";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <p>Missing VITE_GOOGLE_CLIENT_ID in environment configuration.</p>
    )}
  </StrictMode>,
);
