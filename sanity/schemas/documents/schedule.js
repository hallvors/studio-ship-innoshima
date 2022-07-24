import {MdCalendarToday} from "react-icons/md";

export default {
  name: 'schedule',
  icon: MdCalendarToday,
  type: 'document',
  title: 'Schedule',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'lessons',
      type: 'array',
      title: 'レッスン',
      of: [{type: 'lesson'}],
    },
    {
      name: 'exceptions',
      type: 'array',
      title: 'Schedule exceptions',
      of: [{type: 'scheduleException'}],
    }
  ],
  preview: {
    prepare: value => ({title: 'タイムテーブル'})
  }
}
