import React from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Figure from "../Figure";
import styles from "./Slideshow.module.css";
const properties = {
  arrows: false,
};

const Slideshow = (props) => {
  if (!(props.images && props.images.length)) {
    return null;
  }
  return (
    <div className="slide-container">
        <h1 className={styles["header"]}>{props.title}</h1>
      <Zoom {...properties}>
        {props.images.map((image) => {
          return (
            <div className={styles["slide"]} key={image.asset._ref}>
              <Figure {...image} />
            </div>
          );
        })}
      </Zoom>
    </div>
  );
};

export default Slideshow;
