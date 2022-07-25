import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styles from './Timetable.module.css';
import Link from 'next/link'
import Calendar from 'react-calendar'
import { parseISO, format, isPast, isAfter, isBefore } from "date-fns";
import { en, ja } from 'date-fns/locale'

export default function Timetable(props) {
    const { lessons, exceptions } = props;
    console.log(JSON.stringify({ lessons, exceptions }, null, 2))
    const now = new Date();
    now.setDate(15); // mid-month avoids TZ-related off-by-one errors
    const isoMonth = now.toISOString().split(/-/g).slice(0, 2).join('-')

    const lessonsByDay = {};
    for (let i = 0; i < lessons.length; i++) {
        if (!lessonsByDay[lessons[i].weekday]) {
            lessonsByDay[lessons[i].weekday] = [];
        }
        lessonsByDay[lessons[i].weekday].push(lessons[i])
    }

    function formatDay(locale, date) {
        let cellContents = null;

        // if exception covers this day, render only exception data
        if (exceptions) {
            for (let i = 0; i < exceptions.length; i++) {
                if (isAfter(date, parseISO(exceptions[i].start)) && isBefore(date, parseISO(exceptions[i].end))) {
                    cellContents = <div className={styles['exception']}><span>{exceptions[i].title}</span></div>
                }
            }
        }

        if (!cellContents) {
            const weekday = format(date, 'cccc', { locale: en }).toLowerCase();
            if (lessonsByDay[weekday]) {
                cellContents = lessonsByDay[weekday].map(lesson => <div className={styles['lesson']}><b>{lesson.activity.name}</b> - {lesson.time}<br />{lesson.teacher.name}</div>)
            }
        }

        return <div className={[styles['datecell'], isPast(date) ? styles['past'] : ''].join(' ')}>
            <div className={styles['date']}>
                {date.getDate()}
            </div>
            <div className={styles['dateDetails']}>
                {cellContents}
            </div>
        </div>;
    }

    return <Calendar
        defaultActiveStartDate={new Date(`${isoMonth}-15`)}
        formatDay={formatDay}
    />

}

Timetable.propTypes = {
    lessons: PropTypes.arrayOf({
        activity: PropTypes.shape({ _ref: PropTypes.string }),
        teacher: PropTypes.shape({ _ref: PropTypes.string }),
        time: PropTypes.string,
        weekday: PropTypes.string,
    }),
    exceptions: PropTypes.arrayOf(),
}