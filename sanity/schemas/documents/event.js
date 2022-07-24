import {MdTimer} from "react-icons/md";

export default {
  name: 'event',
  icon: MdTimer,
  title: 'イベント',
  type: 'document',
  fields: [
    {
        name: 'title',
        type: 'string',
        title: '題名',
      },

    {
      title: 'Start',
      name: 'start',
      type: 'datetime',
    },
    {
        name: 'end',
        type: 'datetime',
        title: 'End'
    },
    {
        name: 'description',
        title: '説明',
        type: 'simplePortableText',
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
        type: 'reference',
        to: [
            {type: 'activity'}
        ]
    }
  ],
}
