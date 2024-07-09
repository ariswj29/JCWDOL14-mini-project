import Category from '@/components/homeSection/Category';
import { ListEvent } from '@/components/homeSection/ListEvent';

export default function Home() {
  return (
    <main className="container max-w-screen-xl mx-auto h-screen">
      <Category />
      <ListEvent />
    </main>
  );
}
