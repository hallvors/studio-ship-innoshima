import React from 'react'
import PropTypes from 'prop-types'
import {PortableText} from '@portabletext/react'
import Figure from './Figure'

function SimpleBlockContent(props) {
  const {content} = props

  if (!content) {
    console.error('Missing text to render', props)
    return null
  }

  return (
    <PortableText
      value={content}
      components={{
        types: {
          figure: Figure,
        },
      }}
    />
  )
}

SimpleBlockContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
}

export default SimpleBlockContent
