import { MdStarPurple500 } from "react-icons/md";

export default {
  name: 'activity',
  type: 'document',
  title: '活動',
  icon: MdStarPurple500,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: '題名'
    },
    {
      name: 'image',
      title: '写真',
      type: 'figure'
    },
    {
      name: 'description',
      title: '説明',
      type: 'simplePortableText'
    },
    {
      name: 'order',
      type: 'number',
      title: 'Order in list views',
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
