export type ItineraryItem = {
  id: number;
  activity: string;
  location: string;
  timeStart: Date;
  timeEnd: Date;
  position?: number;
};
