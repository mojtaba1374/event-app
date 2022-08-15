import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage() {

    const featuredEvents = getFeaturedEvents();

    return(
        <div>
            <EventList items={featuredEvents} />
            <h1>Home Page</h1>
        </div>
    );
}

export default HomePage;