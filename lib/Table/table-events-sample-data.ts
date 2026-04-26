"use client";

export type EventStatus = "open" | "closed" | "private";

export type EventRow = {
  id: string;
  artist: string;
  imageUrl: string;
  venue: string;
  dateLabel: string;
  extraDatesLabel: string;
  dateChipShadow?: boolean;
  status: EventStatus;
};

export const eventRowsSample: EventRow[] = [
  {
    id: "1",
    artist: "Bad Bunny",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
    venue: "RIVER",
    dateLabel: "13/02/2026",
    extraDatesLabel: "+2 fechas",
    dateChipShadow: true,
    status: "open",
  },
  {
    id: "2",
    artist: "Rels B",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=64&h=64&fit=crop",
    venue: "Movistar Arena",
    dateLabel: "13/02/2026",
    extraDatesLabel: "+2 fechas",
    status: "closed",
  },
  {
    id: "3",
    artist: "Nicki Nicole",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
    venue: "Teatro Colón",
    dateLabel: "13/02/2026",
    extraDatesLabel: "+2 fechas",
    status: "private",
  },
];
