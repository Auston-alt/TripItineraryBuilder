import React from "react";
import ItineraryDisplay from "./components/ItineraryDisplay";
import ItineraryAddForm from "./components/ItineraryForm";
import { ItineraryItem } from "./components/ItineraryItem";

function App() {
  const [itinerary, setItinerary] = React.useState<ItineraryItem[]>([]);

  const handleAddItem = (item: Omit<ItineraryItem, "id">) => {
    const newItem: ItineraryItem = {
      id: Date.now(),
      ...item,
    };

    setItinerary((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (
    id: number,
    field: "activity" | "location" | "timeStart" | "timeEnd",
    value: string | Date,
  ) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  return (
    <>
      <ItineraryAddForm onAddItem={handleAddItem} />
      <ItineraryDisplay itinerary={itinerary} onUpdateItem={handleUpdateItem} />
    </>
  );
}

export default App;
