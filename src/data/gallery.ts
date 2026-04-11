export interface GalleryPhoto {
  id: string;
  url: string;
  price: number;
}

export interface GalleryEvent {
  id: string;
  slug: string;
  name: string;
  accessKey: string;
  photos: GalleryPhoto[];
}

export const PRIVATE_GALLERIES: GalleryEvent[] = [
  {
    id: "champions-2026",
    slug: "final-champions-2026",
    name: "Evento Final Champions",
    accessKey: "PRO123",
    photos: [
      { id: "001", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "002", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "003", url: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "004", url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "005", url: "https://images.unsplash.com/photo-1518091044124-0121eb35f742?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "006", url: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "007", url: "https://images.unsplash.com/photo-1575361204480-aadea2a16a85?auto=format&fit=crop&q=80", price: 5.00 },
      { id: "008", url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80", price: 5.00 },
    ]
  }
];
