import React from "react";
import ItineraryDisplay from "../components/ItineraryDisplay";
import ItineraryAddForm from "../components/ItineraryForm";
import ItineraryDownloadControls from "../components/ItineraryDownloadControls";
import { ItineraryItem, ItineraryItemAddHandler, ItineraryItemMoveHandler, ItineraryItemUpdateHandler } from "../types/itinerary";

export function useItinerary() {
    // App owns the single source of truth for all itinerary data.
    const [itinerary, setItinerary] = React.useState<ItineraryItem[]>([]);

    // Create a new item here so ids stay centralized in the parent.
    const handleAddItem:
        ItineraryItemAddHandler = (item: Omit<ItineraryItem, "id">) => {
            const newItem: ItineraryItem = {
                id: crypto.randomUUID(),
                ...item,
            };

            setItinerary((prev) => [...prev, newItem]);
        };

    // Handler to move itinerary items up or down
    const handleMoveItem: ItineraryItemMoveHandler = (id: string, direction: -1 | 1) => {
        setItinerary((prev) => {
            const length = prev.length;
            // Fail fast if there are not enough items to move
            if (length < 2) return prev;

            const currentIndex = prev.findIndex((item) => item.id === id);
            // Fail fast if the item to move does not exist
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

    return {
        itinerary,
        handleAddItem,
        handleMoveItem,
        handleUpdateItem,
    };
}