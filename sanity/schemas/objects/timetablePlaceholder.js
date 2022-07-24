export default {
    type: 'object',
    title: 'タイムテーブル',
    name: 'timetablePlaceholder',
    fields: [{ name: 'show', title: 'Enabled', type: 'boolean' }],
    preview: {
        select: {show: 'show'},
        prepare: value => {
            return {
                title: value.show ? '[タイムテーブルはここに表示されます]' : '[タイムテーブルの表示が無効]'
              }
        }
    }
};