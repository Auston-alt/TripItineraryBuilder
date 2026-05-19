import React, { useState, SubmitEvent, ChangeEvent } from "react";
import { ItineraryItem } from "./ItineraryItem";

type ItineraryAddFormProps = {
  onAddItem: (item: Omit<ItineraryItem, "id">) => void;
};

function ItineraryAddForm({ onAddItem }: ItineraryAddFormProps) {
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newItem: Omit<ItineraryItem, "id"> = {
      activity,
      location,
      timeStart: new Date(),
      timeEnd: new Date(),
    };
    onAddItem(newItem);

    setActivity("");
    setLocation("");
  };

  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleTimeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeStart(new Date(e.target.value));
  };

  const handleTimeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeEnd(new Date(e.target.value));
  };

  return (
    <div>
      <h2>Add Itinerary Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity">Activity:</label>
        <input
          type="text"
          id="activity"
          name="activity"
          value={activity}
          onChange={handleActivityChange}
        />
        <br />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />
        <br />
        <label htmlFor="timeStart">Start Time:</label>
        <input
          type="datetime-local"
          id="timeStart"
          name="timeStart"
          value={timeStart.toISOString().slice(0, 16)}
          onChange={handleTimeStartChange}
        />
        <br />
        <label htmlFor="timeEnd">End Time:</label>
        <input
          type="datetime-local"
          id="timeEnd"
          name="timeEnd"
          value={timeEnd.toISOString().slice(0, 16)}
          onChange={handleTimeEndChange}
        />
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItineraryAddForm;
