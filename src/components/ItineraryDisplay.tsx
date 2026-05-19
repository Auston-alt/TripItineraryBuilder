import React from "react";
import { ItineraryItem } from "./ItineraryItem";

type ItineraryDisplayProps = {
  itinerary: ItineraryItem[];
  onUpdateItem: (
    id: number,
    field: "activity" | "location" | "timeStart" | "timeEnd",
    value: string | Date,
  ) => void;
};

function ItineraryDisplay({ itinerary, onUpdateItem }: ItineraryDisplayProps) {
  return (
    <div className="itinerary-display">
      <ul>
        {itinerary.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.activity}
              className="activity-input"
              onChange={(e) =>
                onUpdateItem(item.id, "activity", e.target.value)
              }
            />
            <input
              type="text"
              value={item.location}
              className="location-input"
              onChange={(e) =>
                onUpdateItem(item.id, "location", e.target.value)
              }
            />
            <input
              type="datetime-local"
              value={item.timeStart.toISOString().slice(0, 16)}
              className="time-start-input"
              onChange={(e) =>
                onUpdateItem(item.id, "timeStart", new Date(e.target.value))
              }
            />
            <input
              type="datetime-local"
              value={item.timeEnd.toISOString().slice(0, 16)}
              className="time-end-input"
              onChange={(e) =>
                onUpdateItem(item.id, "timeEnd", new Date(e.target.value))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryDisplay;
