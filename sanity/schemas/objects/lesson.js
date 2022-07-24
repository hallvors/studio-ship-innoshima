import {MdAccessTime} from "react-icons/md";

const WEEKDAYS = [
    {
        title: '月曜日',
        value: 'monday',
    },
    {
        title: '火曜日',
        value: 'tuesday',
    },
    {
        title: '水曜日',
        value: 'wednesday',
    },
    {
        title: '木曜日',
        value: 'thursday',
    },
    {
        title: '金曜日',
        value: 'friday',
    },
    {
        title: '土曜日',
        value: 'saturday',
    },
    {
        title: '日曜日',
        value: 'sunday',
    },
];

export default {
  name: 'lesson',
  icon: MdAccessTime,
  title: 'Lesson',
  type: 'object',
  fields: [
    {
      title: 'Weekday',
      name: 'weekday',
      type: 'string',
      options: {
        list: WEEKDAYS,
      },
    },
    {
        name: 'time',
        type: 'string',
        title: 'Time'
    },
    {
        name: 'teacher',
        type: 'reference',
        to: [
            {type: 'person'}
        ],
        title: '先生'
    },
    {
        name: 'activity',
        title: '',
        type: 'reference',
        to: [
            {type: 'activity'}
        ]
    }
  ],
  preview: {
    select: {
      day: 'weekday',
      time: 'time',
      activity: 'activity.name'
    },
    prepare: (selection) => {
        const day = WEEKDAYS.find(day => day.value === selection.day);
        return {
            title: selection.activity,
            subtitle: `${day ? day.title : ''} ${selection.time}`
        }
    },
  }
}
