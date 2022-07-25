import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Timetable.module.css";
import Link from "next/link";
import Calendar from "react-calendar";
import { parseISO, format, isPast, isAfter, isBefore } from "date-fns";
import { enGB, ja } from "date-fns/locale";
import RichTextWithOptionalPhoto from "../RichTextWithOptionalPhoto";

export default function Timetable(props) {
  const { lessons, exceptions, teachers, activities } = props;
  console.log(JSON.stringify({ lessons, exceptions, teachers, activities }, null, 2));
  const now = new Date();
  now.setDate(15); // mid-month avoids TZ-related off-by-one errors
  const isoMonth = now.toISOString().split(/-/g).slice(0, 2).join("-");

  const lessonsByDay = {};
  for (let i = 0; i < lessons.length; i++) {
    if (!lessonsByDay[lessons[i].weekday]) {
      lessonsByDay[lessons[i].weekday] = [];
    }
    lessonsByDay[lessons[i].weekday].push(lessons[i]);
  }

  function formatDay(locale, date) {
    let cellContents = null;

    // if exception covers this day, render only exception data
    if (exceptions) {
      for (let i = 0; i < exceptions.length; i++) {
        if (
          isAfter(date, parseISO(exceptions[i].start)) &&
          isBefore(date, parseISO(exceptions[i].end))
        ) {
          cellContents = (
            <div className={styles["exception"]} key={date.getTime()}>
              <span>{exceptions[i].title}</span>
            </div>
          );
        }
      }
    }

    if (!cellContents) {
      const weekday = format(date, "cccc", { locale: enGB }).toLowerCase();
      if (lessonsByDay[weekday]) {
        cellContents = lessonsByDay[weekday].map((lesson) => (
          <div className={styles["lesson"]} key={lesson._key}>
            {lesson.activity && <b>{activities[lesson.activity._ref].name}</b>} - {lesson.time}
            <br />
            {lesson.teacher && <span>{teachers[lesson.teacher._ref].name}</span>}
          </div>
        ));
      }
    }

    return (
      <div
        className={[
          styles["datecell"],
          isPast(date) ? styles["past"] : "",
        ].join(" ")}
      >
        <div className={styles["date"]}>{date.getDate()}</div>
        <div className={styles["dateDetails"]}>{cellContents}</div>
      </div>
    );
  }

  return (
    <div>
    <h2>タイムテーブル</h2>
    <Calendar
      defaultActiveStartDate={new Date(`${isoMonth}-15`)}
      formatDay={formatDay}
    />
    <h2>レッスンの種類</h2>
    <div className={styles["contentgrid"]}>
        {
            Object.keys(activities).map(id => <div key={id}>
                <RichTextWithOptionalPhoto
                    title={activities[id].name}
                    image={activities[id].image}
                    description={activities[id].description}
                />
            </div>)
        }
    </div>
    <h2>先生</h2>
    <div className={styles["contentgrid"]}>
        {
            Object.keys(teachers).map(id => <div key={id}>
                <RichTextWithOptionalPhoto
                    title={teachers[id].name}
                    image={teachers[id].image}
                    description={teachers[id].bio}
                />
            </div>)
        }
    </div>
    </div>
  );
}

Timetable.propTypes = {
  lessons: PropTypes.arrayOf({
    activity: PropTypes.shape({ _ref: PropTypes.string }),
    teacher: PropTypes.shape({ _ref: PropTypes.string }),
    time: PropTypes.string,
    weekday: PropTypes.string,
  }),
  exceptions: PropTypes.arrayOf(),
};
