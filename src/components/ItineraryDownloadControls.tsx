import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ItineraryItem } from "./ItineraryItem";

type ItineraryDownloadControlsProps = {
  itinerary: ItineraryItem[];
};

// Utility function to escape HTML special characters to prevent injection issues
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// Format a Date object into a human-readable string
const formatDate = (value: Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);

// Generate a date stamp for the filename in YYYY-MM-DD format
const fileDateStamp = () => new Date().toISOString().slice(0, 10);

function ItineraryDownloadControls({
  itinerary,
}: ItineraryDownloadControlsProps) {
  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // Set up the PDF document with a title and generation date
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
      "", // Placeholder for "Completed?" column
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
        onClick={handleDownloadPdf}
        disabled={!itinerary.length}
      >
        Download Itinerary PDF
      </button>
    </>
  );
}

export default ItineraryDownloadControls;
