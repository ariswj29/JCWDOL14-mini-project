export interface Event {
  id: number;
  name: string;
  price: number | null;
  date: string;
  location: string;
  image: string;
  isFree: Boolean;
  time: string;
  description: string;
  availableSeats: string;
  categoryId: string;
  userId: string;
  category: {
    id: number;
    name: string;
  };
  promotion: {
    id: number;
    code: string;
    expiredAt: string;
  }[];
}

export interface Profile {
  id: number;
  saldo: number;
  points: number;
  discount: number;
  referralCode: string;
}

export interface Transactions {
  id: number;
  no: number;
  userId: number;
  price: number;
  event: {
    id: number;
    name: string;
    price: number;
  };
  user: {
    firstName: string;
    lastName: string;
  };
  transaction: {
    price: number;
  };
}

export interface Review {
  id: number;
  no: number;
  rating: string;
  comment: string;
  eventId: number;
  transactionId: number;
  userId: number;
  event: {
    name: string;
  };
  user: {
    firstName: string;
    lastName: string;
  };
}
