import { MdDescription } from '@sanity/icons'

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MdDescription,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: '題名',
    },
    {
      name: 'content',
      type: 'pagecontents',
      title: '内容',
      description: 'Add blocks of content for the page.',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'リンク',
      validation: Rule => Rule.required(),
      options: {
        source: (doc) => doc.title,
      }
    }
  ],
}
