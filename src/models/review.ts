export interface Review {
  _id: string;
  movie: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReview {
  movie: string;
  user: string;
  rating: number;
  comment: string;
}
