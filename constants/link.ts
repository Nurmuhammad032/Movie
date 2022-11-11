export interface Links {
  text: string;
  value: string;
}

export const movies: Links[] = [
  {
    text: "Popular",
    value: "popular",
  },
  {
    text: "Now Playing",
    value: "playing",
  },
  {
    text: "Upcoming",
    value: "upcoming",
  },
  {
    text: "Top Rated",
    value: "top-rated",
  },
];

export const tvShows: Links[] = [
  {
    text: "Popular",
    value: "tv-popular",
  },
  {
    text: "Airing Today",
    value: "airing-today",
  },
  {
    text: "On TV",
    value: "on-tv",
  },
  {
    text: "Top Rated",
    value: "airing-today",
  },
];

export const people: Links[] = [
  {
    text: "Popular people",
    value: "popular-people",
  },
];
