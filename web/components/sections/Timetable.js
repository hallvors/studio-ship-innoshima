import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Timetable.module.css";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  parseISO,
  format,
  isPast,
  isAfter,
  isBefore,
  isSameDay,
  getWeek,
  isLastDayOfMonth,
  addDays,
} from "date-fns";
import { enGB, ja } from "date-fns/locale";

function optionallyPadTime(str) {
  if (/^\d:/.test(str)) {
    return "0" + str;
  }
  return str;
}

export default function Timetable(props) {
  const { lessons, exceptions } = props;
  let now = new Date();
  const useLinks = Boolean(
    props.placeholderSettings && props.placeholderSettings.useLinks
  );
  console.log(JSON.stringify({ lessons, exceptions }, null, 2));

  const lessonsByDay = {};
  for (let i = 0; i < lessons.length; i++) {
    if (!lessonsByDay[lessons[i].weekday]) {
      lessonsByDay[lessons[i].weekday] = [];
    }
    lessonsByDay[lessons[i].weekday].push(lessons[i]);
  }

  Object.keys(lessonsByDay).forEach((day) => {
    lessonsByDay[day].sort((a, b) => {
      return optionallyPadTime(a.time) > optionallyPadTime(b.time) ? 1 : -1;
    });
  });

  if (
    props.placeholderSettings &&
    props.placeholderSettings.type === "simple"
  ) {
    return simplifiedTable(lessonsByDay, useLinks);
  }

  if (isLastDayOfMonth(now)) {
    // we may want to skip to next month if there's nothing left to show
    // in the current..
    console.log("last day of month!");
    const weekday = format(now, "cccc", { locale: enGB }).toLowerCase();
    if (!lessonsByDay[weekday]) {
      now = addDays(now, 1);
    }
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
          let exception = relevantExceptions.find((exception) =>
            exception.activities.find(
              (activity) => activity._ref === lesson.activity._id
            )
          );

          if (exception) {
            return (
              <div className={styles["lesson"]} key={lesson._key}>
                {exception.title}
              </div>
            );
          }
          return (
            <div className={styles["lesson"]} key={lesson._key}>
              {lesson.time}
              {lesson.activity &&
                (useLinks ? (
                  <Link href={`/レッスン/${lesson.activity.name}`}>
                    <a>
                      <b>{lesson.activity.name}</b>
                    </a>
                  </Link>
                ) : (
                  <b>{lesson.activity.name}</b>
                ))}{" "}
              <br />
              {lesson.teacher && (
                <span>
                  {useLinks ? (
                    <Link href={`/先生/${lesson.teacher}`}>
                      <a>{lesson.teacher}</a>
                    </Link>
                  ) : (
                    lesson.teacher
                  )}
                </span>
              )}
            </div>
          );
        });
      }
    }

    const isWeekInThePast =
      getWeek(date) < getWeek(now) ||
      (date.getDay() === 0 && getWeek(date) === getWeek(now));

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
      <Calendar
        locale="ja-jp"
        defaultActiveStartDate={now}
        formatDay={formatDay}
        className={styles["react-calendar"]}
        tileClassName={styles["react-calendar__tile"]}
        prev2Label={null}
        next2Label={null}
      />
    </div>
  );
}

function simplifiedTable(lessonsByDay, useLinks) {
  const days = [
    { en: "monday", ja: "月" },

    { en: "tuesday", ja: "火" },
    { en: "wednesday", ja: "水" },
    { en: "thursday", ja: "木" },
    { en: "friday", ja: "金" },
    { en: "saturday", ja: "土" },
    { en: "sunday", ja: "日" },
  ];
  return (
    <table className={styles["simplifiedCalendar"]}>
      <caption>ひと目でわかるタイムテーブル</caption>
      <tr>
        {days.map((day) => (lessonsByDay[day.en] ? <th>{day.ja}</th> : null))}
      </tr>
      <tr>
        {days.map((day) => {
          if (!lessonsByDay[day.en]) {
            return null;
          }
          return (
            <td>
              {lessonsByDay[day.en].map((lesson) => (
                <div className={styles["simpleEntry"]}>
                  <span className={styles["time"]}>{lesson.time}</span>{" "}
                  <span className={styles["lesson"]}>
                    {lesson.activity &&
                      (useLinks ? (
                        <Link href={`/レッスン/${lesson.activity.name}`}>
                          <a>
                            <b>{lesson.activity.name}</b>
                          </a>
                        </Link>
                      ) : (
                        <b>{lesson.activity.name}</b>
                      ))}{" "}
                    <span className={styles["teacher"]}>
                      {lesson.teacher && (
                        <span>
                          {useLinks ? (
                            <Link href={`/先生/${lesson.teacher}`}>
                              <a>{lesson.teacher}</a>
                            </Link>
                          ) : (
                            lesson.teacher
                          )}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              ))}
            </td>
          );
        })}
      </tr>
    </table>
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
