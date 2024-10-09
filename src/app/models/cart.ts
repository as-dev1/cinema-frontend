export interface Cart {
  user: string;
  projection: string;
}

export interface Reservation {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  projection: {
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
  };
  status: string;
}
