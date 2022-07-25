import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Figure from '../Figure';
import styles from './Slideshow.module.css';
const properties = {
    prevArrow: <button className={styles['button']}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" /></svg></button>,
    nextArrow: <button className={styles['button']}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z" /></svg></button>
}

const Slideshow = (props) => {
    if (!(props.images && props.images.length)) {
        return null
    }
    return (
        <div className="slide-container">
            <Zoom {...properties}>
                {
                    props.images.map((image) => {
                        return <div className={styles['slide']} key={image.asset._ref}>
                            <Figure {...image} />
                        </div>
                    })
                }
            </Zoom>
        </div>
    );
};

export default Slideshow;