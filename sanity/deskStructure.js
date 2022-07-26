import S from '@sanity/desk-tool/structure-builder'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) => !['activity', 'page', 'person', 'schedule', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Studio SHIP')
    .items([
      S.documentListItem().id('global-config').schemaType('siteSettings').title('サイトの設定'),
      S.documentTypeListItem('person').title('講師の紹介'),
      S.documentTypeListItem('activity').title('内容の紹介'),
      S.documentListItem().id('global-schedule').schemaType('schedule').title('タイムテーブル'),
      S.documentTypeListItem('page').title('ページ'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
