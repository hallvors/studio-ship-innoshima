import { MdDescription } from '@sanity/icons'

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MdDescription,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
    },
  ],
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
      description: 'Add blocks of content for the page. If more than one block, first goes in left column',
    },
    {
      name: 'description',
      type: 'text',
      title: '説明',
      description: 'Describe contents of this page for search engines and social media',
      fieldset: 'metadata',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'リンク',
      validation: Rule => Rule.required(),
      options: {
        source: 'title'
      }
    }
  ],
}
