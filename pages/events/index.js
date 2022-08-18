import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSerach from '../../components/events/events-search';

function AllEventsPage() {

    const router = useRouter();

    let events = getAllEvents();

    function findEventsHandler(year, month) {
        router.push(`/events/${year}/${month}`);
    }

    return (
        <Fragment>
            <EventsSerach onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
}

export default AllEventsPage;