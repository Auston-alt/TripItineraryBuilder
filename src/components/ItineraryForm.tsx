import React, { useState, SubmitEvent } from "react";
import { ItineraryItem as ItineraryItemComponent } from "./ItineraryItem";
import type {
  ItineraryItem,
  ItineraryItemEditableField,
} from "../types/itinerary";

type ItineraryAddFormProps = {
  onAddItem: (item: Omit<ItineraryItem, "id">) => void;
};

// The form edits a draft item that matches the shared itinerary shape,
// but uses a placeholder id until the item is submitted to App.
const emptyDraft = (): ItineraryItem => ({
  id: 0,
  activity: "",
  location: "",
  timeStart: new Date(),
  timeEnd: new Date(),
});

function ItineraryAddForm({ onAddItem }: ItineraryAddFormProps) {
  const [draft, setDraft] = useState<ItineraryItem>(emptyDraft());

  // Bridge the shared fields component to local draft state while creating a new item.
  const handleUpdateDraft = <K extends ItineraryItemEditableField>(
    _id: number,
    field: K,
    value: ItineraryItem[K],
  ) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id: _id, ...newItem } = draft;
    onAddItem(newItem);
    setDraft(emptyDraft());
  };

  return (
    <div>
      <h2>Add Itinerary Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Reuse the same field component so create and edit flows stay consistent. */}
        <ItineraryItemComponent item={draft} onUpdateItem={handleUpdateDraft} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItineraryAddForm;
