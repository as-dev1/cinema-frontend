export interface Movie {
  _id: string;
  image_url: string;
  name: string;
  description: string;
  genre: string;
  duration: number;
  producer: string;
  actors: string[];
  releaseDate: Date;
}
