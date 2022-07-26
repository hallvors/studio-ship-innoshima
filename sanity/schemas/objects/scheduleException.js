import {MdTimer} from "react-icons/md";

export default {
  name: 'scheduleException',
  icon: MdTimer,
  title: 'Schedule exception',
  type: 'object',
  fields: [
    {
        name: 'title',
        type: 'string',
        title: '題名',
      },

    {
      title: 'Start',
      name: 'start',
      type: 'date',
    },
    {
        name: 'end',
        type: 'date',
        title: 'End'
    },
    {
      name: 'all',
      type: 'boolean',
      title: 'Applies to all lessons',
    },
    {
      name: 'activities',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{
          type: 'activity',
        }]
      }],
      title: 'Applies to specific activity',
    }
  ],
  preview: {
    select: {
        title: 'title',
        start: 'start',
        end: 'end',
    },
    prepare: selection => {
        return {
            title: selection.title,
            subtitle: selection.start + ' - ' + selection.end,
        }
    }
  }
}
