export default {
    name: 'pagecontents',
    title: 'ページの内容',
    type: 'array',
    of: [
        {type: 'textbox'},
        { type: 'slideshow' },
        { type: 'figure' },
        { type: 'links' },
        { type: 'timetablePlaceholder' },
        { type: 'teachersListPlaceholder' },
        { type: 'activitiesListPlaceholder' },
    ]
}
