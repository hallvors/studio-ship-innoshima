import { MdAccessibilityNew } from "react-icons/md";

export default {
  name: 'person',
  type: 'document',
  title: '先生',
  icon: MdAccessibilityNew,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: '名前'
    },
    {
      name: 'image',
      title: '写真',
      type: 'figure'
    },
    {
      name: 'bio',
      title: 'バイオ',
      type: 'simplePortableText'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
