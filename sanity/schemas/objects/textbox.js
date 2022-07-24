export default {
    type: 'object',
    title: 'Text',
    name: 'textbox',
    fields: [{ name: 'content', title: 'Edit text', type: 'complexPortableText' }],
    preview: {
        select: {portableText: 'content'},
        prepare: value => {
            const block = (value.portableText || []).find(block => block._type === 'block')
            return {
                title: block
                  ? block.children
                    .filter(child => child._type === 'span')
                    .map(span => span.text)
                    .join('')
                  : '[なし]'
              }
        }
    }
};