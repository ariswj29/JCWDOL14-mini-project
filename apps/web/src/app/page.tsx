import Category from '@/components/homeSection/Category';
import EventList from '@/components/homeSection/EventList';
import SearchBar from '@/components/homeSection/SearchBar';

export default function Home() {
  return (
    <main className="container max-w-screen-xl mx-auto">
      <Category />
      <SearchBar />
      <EventList />
    </main>
  );
}
