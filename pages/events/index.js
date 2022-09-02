import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSerach from '../../components/events/events-search';

export default function AllEventsPage(props) {

    const { events } = props;
    const router = useRouter();

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


export async function getStaticProps(context) {

    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}
