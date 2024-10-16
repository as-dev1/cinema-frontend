export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  favouriteGenres?: string[];
}

export type UserUpdate = Omit<User, 'password'>;
