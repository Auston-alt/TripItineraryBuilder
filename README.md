# TripItinerary

TripItinerary is a React + TypeScript web app for creating, editing, reordering, and exporting travel itinerary items.

Each itinerary item includes:
- Activity
- Location
- Start time
- End time

The app supports exporting your itinerary as:
- PDF (`.pdf`)
- Calendar import file (`.ics`) with one calendar event per itinerary item

## Tech Stack

- React 19
- TypeScript
- Vite
- SCSS
- jsPDF + jspdf-autotable (PDF export)

## Features

- Add new itinerary items via a form
- Edit itinerary items inline
- Move items up/down in the list with wraparound behavior
	- Moving the first item up sends it to the end
	- Moving the last item down sends it to the start
- Export itinerary to PDF
- Export itinerary to ICS (works for calendar import on iOS/Android/desktop calendar apps)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage

1. Add an itinerary item in the form section.
2. Edit any item directly in the list.
3. Reorder items with the up/down controls.
4. Export using one of the actions:
	 - `Add to Calendar (.ics)`
	 - `Download Itinerary PDF`

## Project Structure

```text
src/
	App.tsx
	components/
		ItineraryAddForm.tsx (named ItineraryForm.tsx in this repo)
		ItineraryDisplay.tsx
		ItineraryItem.tsx
		ItineraryDownloadControls.tsx
	types/
		itinerary.ts
	utils/
		dateTime.ts
```

## Architecture Notes

- `App.tsx` owns itinerary state (single source of truth).
- `ItineraryForm.tsx` manages a local draft and submits completed items to `App`.
- `ItineraryDisplay.tsx` renders saved items and handles reordering controls.
- `ItineraryItem.tsx` is a shared controlled-fields component used by both form and display.
- Shared domain types are defined in `src/types/itinerary.ts`.

## Calendar Export Details

- ICS export creates one `VEVENT` per itinerary item.
- Event text is escaped for calendar compatibility.
- If an item has `end <= start`, the export adjusts end time by +30 minutes to avoid invalid events in some calendar clients.

## Known Notes

- You may see a build warning about `/src/style.css` not existing if stale references remain in generated HTML/CSS imports.
- Bundle size warnings may appear due to export libraries; this does not block builds.

## Future Improvements
- Auto sorting by start date/time
- Drag-and-drop reordering
- Better handling of all-day events (currently not supported)
- Auto-adjusting end times to update based on start time changes