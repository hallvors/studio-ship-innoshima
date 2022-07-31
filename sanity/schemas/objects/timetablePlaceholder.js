export default {
    type: 'object',
    title: 'タイムテーブル',
    name: 'timetablePlaceholder',
    fields: [
        { name: 'show', title: 'Enabled', type: 'boolean' },
        { name: 'type', type: 'string', title: 'Calendar type', options: {
            list: [
                {value: 'full', title: 'Full calendar'},
                {value: 'simple', title: 'Simplified calendar'},
            ]
        }},
        {
            name: 'useLinks',
            type: 'boolean',
            title: 'Link to teachers and lessons',
        }
    ],
    preview: {
        select: {show: 'show'},
        prepare: value => {
            return {
                title: value.show ? '[タイムテーブルはここに表示されます]' : '[タイムテーブルの表示が無効]'
              }
        }
    }
};