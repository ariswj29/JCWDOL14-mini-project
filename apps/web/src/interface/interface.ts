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
}
