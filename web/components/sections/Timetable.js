import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Timetable.module.css";
import Link from "next/link";
import Calendar from "react-calendar";
import {
  parseISO,
  format,
  isPast,
  isAfter,
  isBefore,
  isSameDay,
  getWeek,
} from "date-fns";
import { enGB, ja } from "date-fns/locale";

export default function Timetable(props) {
  const { lessons, exceptions } = props;
  const now = new Date();
  console.log(JSON.stringify({ lessons, exceptions }, null, 2));

  const lessonsByDay = {};
  for (let i = 0; i < lessons.length; i++) {
    if (!lessonsByDay[lessons[i].weekday]) {
      lessonsByDay[lessons[i].weekday] = [];
    }
    lessonsByDay[lessons[i].weekday].push(lessons[i]);
  }

  function formatDay(locale, date) {
    let cellContents = null;
    const relevantExceptions = [];

    // if exception covers this day, render only exception data
    if (exceptions) {
      for (let i = 0; i < exceptions.length; i++) {
        const start = parseISO(exceptions[i].start);
        const end = parseISO(exceptions[i].end);
        if (
          (isAfter(date, start) || isSameDay(date, start)) &&
          (isBefore(date, end) || isSameDay(date, end))
        ) {
          if (exceptions[i].all) {
            cellContents = (
              <div className={styles["exception"]} key={date.getTime()}>
                <span>{exceptions[i].title}</span>
              </div>
            );
          } else {
            relevantExceptions.push(exceptions[i]);
          }
        }
      }
    }

    if (!cellContents) {
      const weekday = format(date, "cccc", { locale: enGB }).toLowerCase();
      if (lessonsByDay[weekday]) {
        cellContents = lessonsByDay[weekday].map((lesson) => {
          if (
            relevantExceptions.find((exception) =>
              exception.activities.find(
                (activity) => activity._ref === lesson.activity._id
              )
            )
          ) {
            return null;
          }
          return (
            <div className={styles["lesson"]} key={lesson._key}>
              {lesson.time}
              {lesson.activity && (
                <Link href={`/レッスン/${lesson.activity.name}`}>
                  <a>
                    <b>{lesson.activity.name}</b>
                  </a>
                </Link>
              )}{" "}
              <br />
              {lesson.teacher && (
                <span>
                  <Link href={`/先生/${lesson.teacher}`}>
                    <a>{lesson.teacher}</a>
                  </Link>
                </span>
              )}
            </div>
          );
        });
      }
    }

    const isWeekInThePast = getWeek(date) < getWeek(now) || (date.getDay() === 0 &&  getWeek(date) === getWeek(now));

    return (
      <div
        className={[
          styles["datecell"],
          isPast(date) && !isSameDay(date, now) ? styles["past"] : "",
          isWeekInThePast ? styles["pastweek"] : "",
        ].join(" ")}
      >
        <div className={styles["date"]}>{date.getDate()}</div>
        {cellContents}
      </div>
    );
  }

  return (
    <div className={styles["timetable"]}>
      <h2>タイムテーブル</h2>
      <Calendar
        locale="ja-jp"
        defaultActiveStartDate={now}
        formatDay={formatDay}
        className={styles["react-calendar"]}
        tileClassName={styles["react-calendar__tile"]}
      />
    </div>
  );
}

Timetable.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string,
      teacher: PropTypes.string,
      time: PropTypes.string,
      weekday: PropTypes.string,
    })
  ),
  exceptions: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};
