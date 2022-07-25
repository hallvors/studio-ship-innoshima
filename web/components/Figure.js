import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./Figure.module.css";
import client from "../client";
import { relativeHeight } from "../utils/urls";

const builder = imageUrlBuilder(client);
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

function Figure(image) {
  if (!(image && image.asset)) {
    return null;
  }
  console.log(image);

  return (
    <figure className={styles.content}>
      <Image
        src={builder
          .image(Object.assign({}, image))
          .width(DEFAULT_WIDTH)
          .height(DEFAULT_HEIGHT)
          .url()}
        className={styles.image}
        alt={image.alt}
        width={DEFAULT_WIDTH}
        height={DEFAULT_HEIGHT}
      />
      {image.caption && (
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <p>{image.caption}</p>
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  );
}

Figure.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    caption: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
};
export default Figure;
