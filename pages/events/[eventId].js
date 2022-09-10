import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getFeaturedEvents, getEventById } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import ErrorAlert from '../../components/events/error-alert';
import Button from '../../components/ui/button/button';
import Comments from '../../components/inputs/comments';

export default function EventDetailPage(props) {

    const { event } = props;
    const router = useRouter();

    if(router.isFallback) {
        return (
            <div className='center'>
                <p style={{textAlign: 'center'}}>Loading ...</p>
            </div>
        );
    }

    if(props.hasError) {
        return (
            <div className='center'>
                <ErrorAlert>
                        <p>such event not found</p>
                </ErrorAlert>
                <Button link="/events">Show All Events</Button>
            </div>
        );
    }

    return(
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date} 
                address={event.location}
                image={event.image}
                imageAlt={event.title} />
            <EventContent>
                {event.description}
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    );
}


export async function getStaticPaths() {

    const featuredEvents = await getFeaturedEvents();
    const featuredEventsId = featuredEvents.map(event => event.id);
    const paths = featuredEventsId.map(id => ({ params: { eventId : id } }));
    
    return {
        paths: paths,
        fallback: true
    }
}


export async function getStaticProps(context) {
    console.log('rendered again in HOME page');

    const { params } = context;
    const eventId = params.eventId;
    const event = await getEventById(eventId);

    if(!event) {
        return {
            props: {
                hasError: true
            }
        };
    }

    return {
        props: {
            event: event
        },
        revalidate: 10
    }
}