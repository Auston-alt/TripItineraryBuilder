import React from "react";
import { toDateTimeLocalValue } from "../utils/dateTime";
import type {
  ItineraryItem,
  ItineraryItemUpdateHandler,
} from "../types/itinerary";

export function ItineraryItem({
  item,
  onUpdateItem,
}: {
  item: ItineraryItem;
  onUpdateItem: ItineraryItemUpdateHandler;
}) {
  return (
    <>
      {/* Shared controlled fields for both create and edit flows. */}
      <label htmlFor={`activity-${item.id}`}>Activity</label>
      <input
        id={`activity-${item.id}`}
        type="text"
        value={item.activity}
        className="activity-input"
        onChange={(e) => onUpdateItem(item.id, "activity", e.target.value)}
      />
      <label htmlFor={`location-${item.id}`}>Location</label>
      <input
        id={`location-${item.id}`}
        type="text"
        value={item.location}
        className="location-input"
        onChange={(e) => onUpdateItem(item.id, "location", e.target.value)}
      />
      <label htmlFor={`time-start-${item.id}`}>Start Time</label>
      <input
        id={`time-start-${item.id}`}
        type="datetime-local"
        value={toDateTimeLocalValue(item.timeStart)}
        className="time-start-input"
        onChange={(e) =>
          onUpdateItem(item.id, "timeStart", new Date(e.target.value))
        }
      />
      <label htmlFor={`time-end-${item.id}`}>End Time</label>
      <input
        id={`time-end-${item.id}`}
        type="datetime-local"
        value={toDateTimeLocalValue(item.timeEnd)}
        className="time-end-input"
        onChange={(e) =>
          onUpdateItem(item.id, "timeEnd", new Date(e.target.value))
        }
      />
    </>
  );
}
