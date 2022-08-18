import { Fragment } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import ErrorAlert from '../../components/events/error-alert';

function EventDetailPage() {

    const router = useRouter();
    const eventId= router.query.eventId;

    const event = getEventById(eventId);

    if(!event) {
        return (
            <ErrorAlert>
                <p style={{textAlign: 'center'}}>No event found</p>
            </ErrorAlert>
        );
    }

    return(
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date} 
                address={event.location}
                image={event.image}
                imageAlt={event.title} />
            <EventContent>
                {event.description}
            </EventContent>
        </Fragment>
    );
}

export default EventDetailPage;
