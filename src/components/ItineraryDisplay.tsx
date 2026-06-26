import React from "react";
import { ItineraryItem as ItineraryItemComponent } from "./ItineraryItem";
import type {
  ItineraryItem,
  ItineraryItemUpdateHandler,
} from "../types/itinerary";

type ItineraryDisplayProps = {
  itinerary: ItineraryItem[];
  onUpdateItem: ItineraryItemUpdateHandler;
  onMoveItem: (id: string, direction: -1 | 1) => void;
};

function ItineraryDisplay({
  itinerary,
  onUpdateItem,
  onMoveItem,
}: ItineraryDisplayProps) {
  return (
    <div className="itinerary-display">
      <ul>
        {itinerary.map((item) => (
          <li key={item.id}>
            {/* Render the shared item editor for each saved itinerary entry. */}
            <ItineraryItemComponent item={item} onUpdateItem={onUpdateItem} />
            <button
              className="move-up-button"
              onClick={() => onMoveItem(item.id, -1)}
            >
              <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </button>
            <button
              className="move-down-button"
              onClick={() => onMoveItem(item.id, 1)}
            >
              <i className="fa fa-chevron-down" aria-hidden="true"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryDisplay;
