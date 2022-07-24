import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styles from './Timetable.module.css';
import Link from 'next/link'
import Calendar from 'react-calendar'
import dateFns from "date-fns";

export default function Timetable(props) {
    const {lessons, exceptions} = props;
    const now = new Date();
    now.setDate(15); // mid-month avoids TZ-related off-by-one errors
    const isoMonth = now.toISOString().split(/-/g).slice(0, 2).join('-')
    const [month, setMonth] = useState( isoMonth )

    function formatDay(locale, date) {
        console.log(date)
        return <div className={styles['datecell']}>
            <div className={styles['date']}>
                {date}
            </div>
        </div>;
    }

    return <Calendar
        activeStartDate={new Date(`${month}-15`)}
        formatDay={formatDay}
    />

}

Timetable.propTypes = {
    lessons: PropTypes.arrayOf({
        activity: PropTypes.shape({_ref: PropTypes.string}),
        teacher: PropTypes.shape({_ref: PropTypes.string}),
        time: PropTypes.string,
        weekday: PropTypes.string,
    }),
    exceptions: PropTypes.arrayOf(),
}