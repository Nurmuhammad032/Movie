export interface User {
  user?: {
    avatar: {
      gravatar: {
        hash: string;
      };
      tmdb: {
        avatar_path: string | null;
      };
    };
    id: number;
    include_adult: boolean;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    username: string;
  };
  isAuthenticated: boolean;
  sessionId: string;
}

export interface Search {
  searchQuery: string;
  page: number;
}

export interface Favorite{
  favorite: Object;
}

export interface Movie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}