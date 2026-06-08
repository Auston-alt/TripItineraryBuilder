import React from "react";
import ItineraryDisplay from "./components/ItineraryDisplay";
import ItineraryAddForm from "./components/ItineraryForm";
import ItineraryDownloadControls from "./components/ItineraryDownloadControls";
import type {
  ItineraryItem,
  ItineraryItemUpdateHandler,
} from "./types/itinerary";

function App() {
  // App owns the single source of truth for all itinerary data.
  const [itinerary, setItinerary] = React.useState<ItineraryItem[]>([]);

  // Create a new item here so ids stay centralized in the parent.
  const handleAddItem = (item: Omit<ItineraryItem, "id">) => {
    const newItem: ItineraryItem = {
      id: Date.now(),
      ...item,
    };

    setItinerary((prev) => [...prev, newItem]);
  };

  // Handler to move itinerary items up or down
  const handleMoveItem = (id: number, direction: -1 | 1) => {
    setItinerary((prev) => {
      const length = prev.length;
      if (length < 2) return prev;

      const currentIndex = prev.findIndex((item) => item.id === id);
      if (currentIndex === -1) return prev;

      const targetIndex = (currentIndex + direction + length) % length;

      const next = [...prev]; // Create a shallow copy of the itinerary array
      const [moved] = next.splice(currentIndex, 1); // Remove the item to move
      next.splice(targetIndex, 0, moved); // Insert it at the target index

      return next;
    });
  };

  // Generic field updates keep the item editing contract reusable across views.
  const handleUpdateItem: ItineraryItemUpdateHandler = (id, field, value) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  return (
    <>
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
