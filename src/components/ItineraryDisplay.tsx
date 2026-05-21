import React from "react";
import { ItineraryItem as ItineraryItemComponent } from "./ItineraryItem";
import type {
  ItineraryItem,
  ItineraryItemUpdateHandler,
} from "../types/itinerary";

type ItineraryDisplayProps = {
  itinerary: ItineraryItem[];
  onUpdateItem: ItineraryItemUpdateHandler;
};

function ItineraryDisplay({ itinerary, onUpdateItem }: ItineraryDisplayProps) {
  return (
    <div className="itinerary-display">
      <ul>
        {itinerary.map((item) => (
          <li key={item.id}>
            {/* Render the shared item editor for each saved itinerary entry. */}
            <ItineraryItemComponent item={item} onUpdateItem={onUpdateItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryDisplay;
