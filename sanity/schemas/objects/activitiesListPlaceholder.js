export default {
    type: 'object',
    title: '内容の紹介',
    name: 'activitiesListPlaceholder',
    fields: [{ name: 'show', title: 'Enabled', type: 'boolean' }],
    preview: {
        select: {show: 'show'},
        prepare: value => {
            return {
                title: value.show ? '[内容の紹介はここに表示されます]' : '[内容の紹介の表示が無効]'
              }
        }
    }
};