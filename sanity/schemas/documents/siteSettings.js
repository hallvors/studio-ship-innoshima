import { MdSettings } from "react-icons/md";

export default {
  icon: MdSettings,
  name: 'siteSettings',
  type: 'document',
  title: 'サイトの設定',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'サイト題名'
    },
    {
      name: 'description',
      type: 'text',
      title: '説明',
      description: 'Describe your site for search engines and social media.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'キワード',
      description: 'Add keywords that describes your site.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'homepage',
      title: 'ホームページ',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      name: 'header',
      type: 'complexPortableText',
      title: 'Site header'
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Site logo image',
      description: 'This image appears on top of every page linking back to home page',
    },
    {
      name: 'footer',
      type: 'complexPortableText',
      title: 'Site footer text'
    },
    {
      name: 'footerNavItems',
      type: 'links',
      title: 'Site footer links',
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Sharing image',
      description: 'This image is shown on Facebook and other social meda sites when links are shared',
    }
  ]
}
