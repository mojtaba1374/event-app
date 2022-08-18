import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button/button';
import ErrorAlert from '../../components/events/error-alert';

import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage() {

    const router = useRouter();
    const slugArr = router.query.slug;

    if(!slugArr) {
        return <p className='center'>loading ...</p>
    }

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
        return (
            <div className='center'>
                <ErrorAlert>
                    <p>Invalid Filter, please adjust your filter values!</p>
                </ErrorAlert>
                <Button link="/events">Show All Events</Button>
            </div>
        );
    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });

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

    const date = new Date(filteredYear, filteredMonth - 1);

    return(
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

export default FilteredEventsPage;
