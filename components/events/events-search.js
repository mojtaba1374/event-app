import { useState } from 'react';

import classes from './events-search.module.css';
import Button from '../ui/button/button';

function EventsSerach(props) {
    
    const [year, setYear] = useState('2021');
    const [month, setMonth] = useState('1');

    function submitHandler(event) {
        event.preventDefault();
        props.onSearch(year, month);
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" value={year} onChange={event => setYear(event.target.value)}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="Month">Month</label>
                    <select id="Month" value={month} onChange={event => setMonth(event.target.value)}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">Augest</option>
                        <option value="9">September</option>
                        <option value="10">Octobr</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    )
}

export default EventsSerach;