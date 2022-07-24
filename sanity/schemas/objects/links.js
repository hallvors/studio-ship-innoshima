export default {
    name: 'links',
    title: 'Links',
    type: 'object',
    fields: [{
        name: 'contents',
        title: 'Links',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'page'}]}]
    }],
    preview: {
        select: {
            num: 'contents.length'
        },
        prepare: (selected) => ({title: `${selected.num} links`})
    }
  }
