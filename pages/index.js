import { useEffect } from 'react';
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

import axios from 'axios';

function HomePage() {

    const featuredEvents = getFeaturedEvents();

    useEffect(() => {
        fetch('https://next-test-2155b-default-rtdb.firebaseio.com/events.json')
            .then(res => res.json())
            .then(data => console.log(data));
        
    }, []);

    return(
        <div>
            <EventList items={featuredEvents} />
        </div>
    );
}

export async function getStaticProps(context) {

    const data = axios('https://next-test-2155b-default-rtdb.firebaseio.com/events.json');
    const events = await data;
    console.log(events);

    // fetch('https://next-test-2155b-default-rtdb.firebaseio.com/events.json')
    //         .then(res => res.json())
    //         .then(data => console.log(data));

    // const data = await fetch('https://next-test-2155b-default-rtdb.firebaseio.com/events.json');
    // const events = await data.json();

    return {
        props: {

        }
    }
}

export default HomePage;