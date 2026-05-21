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
      <input
        type="text"
        value={item.activity}
        className="activity-input"
        onChange={(e) => onUpdateItem(item.id, "activity", e.target.value)}
      />
      <input
        type="text"
        value={item.location}
        className="location-input"
        onChange={(e) => onUpdateItem(item.id, "location", e.target.value)}
      />
      <input
        type="datetime-local"
        value={toDateTimeLocalValue(item.timeStart)}
        className="time-start-input"
        onChange={(e) =>
          onUpdateItem(item.id, "timeStart", new Date(e.target.value))
        }
      />
      <input
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
