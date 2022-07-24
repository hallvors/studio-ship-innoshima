export default {
    name: 'slideshow',
    title: 'Slideshow',
    type: 'object',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: '題名',
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{type: 'figure'}]
        }
    ]
  }
