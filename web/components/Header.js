import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import SimpleBlockContent from './SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import styles from './Header.module.css'

const builder = imageUrlBuilder(client)

function Header(props) {
    const { content, nextEvent, logo } = props

    return (
        <>
            <div className={styles["header"]}>
                {logo && <div className={styles['logo']}>
                    <Link href="/"><a><img
                        src={builder.image(logo.asset).auto('format').width(200).url()}
                        alt="Studio SHIP logo"
                    /></a></Link>

                </div>}
                <SimpleBlockContent content={content} />

                {nextEvent && <div className={styles["top-banner"]}>
                    <b>{nextEvent.title}</b>, {nextEvent.start}
                    </div>}
            </div>
        </>
    )
}

Header.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
}

export default Header
