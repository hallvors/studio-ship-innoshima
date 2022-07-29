export default {
    type: 'object',
    title: '講師の紹介',
    name: 'teachersListPlaceholder',
    fields: [{ name: 'show', title: 'Enabled', type: 'boolean' }],
    preview: {
        select: {show: 'show'},
        prepare: value => {
            return {
                title: value.show ? '[講師の紹介はここに表示されます]' : '[講師の紹介の表示が無効]'
              }
        }
    }
};