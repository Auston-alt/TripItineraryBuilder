import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { ItineraryItem } from "../types/itinerary";

type ItineraryDownloadControlsProps = {
  itinerary: ItineraryItem[];
};

// Keep date output consistent across the PDF export.
const formatDate = (value: Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);

// Stable filename suffix for downloaded files.
const fileDateStamp = () => new Date().toISOString().slice(0, 10);

const toIcsDateTimeUtc = (value: Date) => {
  const iso = value.toISOString();
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
};

const escapeIcsText = (value: string) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll(/\r\n|\r|\n/g, "\\n");

const buildIcs = (itinerary: ItineraryItem[]) => {
  const nowStamp = toIcsDateTimeUtc(new Date());

  const events = itinerary
    .map((item, index) => {
      const start = new Date(item.timeStart);
      const end = new Date(item.timeEnd);

      // Some calendar apps reject events with end <= start.
      if (end <= start) {
        end.setMinutes(start.getMinutes() + 30);
      }

      return [
        "BEGIN:VEVENT",
        `UID:${item.id}-${index}-${nowStamp}@tripitinerary.local`,
        `DTSTAMP:${nowStamp}`,
        `DTSTART:${toIcsDateTimeUtc(start)}`,
        `DTEND:${toIcsDateTimeUtc(end)}`,
        `SUMMARY:${escapeIcsText(item.activity)}`,
        `LOCATION:${escapeIcsText(item.location)}`,
        "DESCRIPTION:Imported from TripItinerary",
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//TripItinerary//Itinerary Export//EN",
    "METHOD:PUBLISH",
    events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
};

function ItineraryDownloadControls({
  itinerary,
}: ItineraryDownloadControlsProps) {
  const handleDownloadIcs = () => {
    const icsContent = buildIcs(itinerary);
    const file = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trip-itinerary-${fileDateStamp()}.ics`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // Build a simple, readable PDF export using the current itinerary state.
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Trip Itinerary", 40, 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.text(`Generated on ${formatDate(new Date())}`, 40, 68);

    const rows = itinerary.map((item) => [
      item.activity,
      item.location,
      formatDate(item.timeStart),
      formatDate(item.timeEnd),
      "",
      "",
    ]);

    autoTable(doc, {
      startY: 84,
      head: [["Activity", "Location", "Start", "End", "Completed?", "Rating"]],
      body: rows,
      styles: {
        fontSize: 10,
        cellPadding: 8,
        lineColor: [204, 204, 204],
        lineWidth: 1,
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [31, 41, 55],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [31, 41, 55],
      },
    });

    doc.save(`trip-itinerary-${fileDateStamp()}.pdf`);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDownloadIcs}
        disabled={!itinerary.length}
      >
        Add to Calendar (.ics)
      </button>
      <button
        type="button"
        onClick={handleDownloadPdf}
        disabled={!itinerary.length}
      >
        Download Itinerary PDF
      </button>
    </>
  );
}

export default ItineraryDownloadControls;
