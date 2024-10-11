export interface Projection {
  _id: string;
  movie: {
    _id: string;
    image_url: string;
    name: string;
    genre: string;
    duration: number;
    description: string;
    producer: string;
    actors: string[];
  };
  price: number;
  starting_at: Date;
}
