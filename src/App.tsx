import React from "react";
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import ItineraryDisplay from "./components/ItineraryDisplay";
import ItineraryAddForm from "./components/ItineraryForm";
import ItineraryDownloadControls from "./components/ItineraryDownloadControls";
import { useItinerary } from "./hooks/useItinerary";

type GoogleJwtPayload = {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
};

const decodeGoogleJwt = (token: string): GoogleJwtPayload | null => {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const decoded = atob(padded);

    return JSON.parse(decoded) as GoogleJwtPayload;
  } catch {
    return null;
  }
};

function App() {
  const { itinerary, handleAddItem, handleMoveItem, handleUpdateItem } = useItinerary();
  const [user, setUser] = React.useState<GoogleJwtPayload | null>(null);

  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (!response.credential) return;

    const decoded = decodeGoogleJwt(response.credential);
    if (!decoded) return;

    setUser(decoded);

    // In production, send response.credential to your backend for verification,
    // session creation, and authorization checks.
  };

  const handleSignOut = () => {
    googleLogout();
    setUser(null);
  };

  if (!user) {
    return (
      <main>
        <h1>TripItinerary</h1>
        <p>Sign in with Google to access your itinerary planner.</p>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => undefined} />
      </main>
    );
  }

  return (
    <>
      <header>
        <p>
          Signed in as {user.name ?? "Unknown User"}
          {user.email ? ` (${user.email})` : ""}
        </p>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </header>
      <ItineraryDownloadControls itinerary={itinerary} />
      <ItineraryAddForm onAddItem={handleAddItem} />
      <ItineraryDisplay
        itinerary={itinerary}
        onUpdateItem={handleUpdateItem}
        onMoveItem={handleMoveItem}
      />
    </>
  );
}

export default App;
