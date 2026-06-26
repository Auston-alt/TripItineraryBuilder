export type ItineraryItem = {
  id: string;
  activity: string;
  location: string;
  timeStart: Date;
  timeEnd: Date;
  position?: number;
};

// Fields that can be edited by the form or display editor.
export type ItineraryItemEditableField = Exclude<
  keyof ItineraryItem,
  "id" | "position"
>;

// Shared callback contract for updating a single field on an itinerary item.
export type ItineraryItemUpdateHandler = <K extends ItineraryItemEditableField>(
  id: string,
  field: K,
  value: ItineraryItem[K],
) => void;

export type ItineraryItemMoveHandler = (id: string, direction: -1 | 1) => void;
export type ItineraryItemAddHandler = (item: Omit<ItineraryItem, "id">) => void;
