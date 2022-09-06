import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button/button';
import ErrorAlert from '../../components/events/error-alert';

import { getFilteredEvents } from '../../helpers/api-util';

export default function FilteredEventsPage(props) {

    if(props.hasError) {
        return (
            <div className='center'>
                <ErrorAlert>
                    <p>Invalid Filter, please adjust your filter values!</p>
                </ErrorAlert>
                <Button link="/events">Show All Events</Button>
            </div>
        );
    }

    const filteredEvents = props.events;

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <div className='center'>
                <ErrorAlert>
                    <p>No events found for the chosen date</p>
                </ErrorAlert>
                <Button link="/events">Show All Events</Button>
            </div>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return(
        <Fragment>
            <Head>
                <title>Filtered Events</title>
                <meta name="description" content={`All Events for ${props.date.month}/${props.date.year}`} />
            </Head>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}


export async function getServerSideProps(context) {

    const { params } = context;
    const slugArr = params.slug;

    const filteredYear = +slugArr[0];
    const filteredMonth = +slugArr[1];

    if(
        filteredYear > 2030 ||
        filteredYear < 2020 ||
        filteredMonth < 1 ||
        filteredMonth > 12 ||
        isNaN(filteredYear) ||
        isNaN(filteredMonth) 
    ) {
        return {
            props: { hasError: true }
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: filteredYear,
                month: filteredMonth
            }
        }
    };
}

