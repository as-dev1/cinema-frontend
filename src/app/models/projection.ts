export interface Projection {
  _id: string;
  movie: {
    _id: string;
    image_url: string;
    name: string;
    genre: string;
    duration: number;
  };
  price: number;
  starting_at: Date;
}
