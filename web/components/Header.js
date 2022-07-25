import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import SimpleBlockContent from "./SimpleBlockContent";
import imageUrlBuilder from "@sanity/image-url";
import client from "../client";
import styles from "./Header.module.css";
import { relativeHeight } from "../utils/urls";

const builder = imageUrlBuilder(client);

function Header(props) {
  const { content, nextEvent, logo } = props;
  return (
    <>
      <div className={styles["header"]}>
        {logo && (
          <div className={styles["logo"]}>
            <Link href="/">
              <a>
                <Image
                  src={builder
                    .image(logo.asset)
                    .auto("format")
                    .width(150)
                    .url()}
                  alt="Studio SHIP logo"
                  width={150}
                  height={logo.dimensions ? relativeHeight(logo.dimensions.width, 150, logo.dimensions.height) : null}
                />
              </a>
            </Link>
          </div>
        )}
        <SimpleBlockContent content={content} />

        {nextEvent && (
          <div className={styles["top-banner"]}>
            <b>{nextEvent.title}</b>, {nextEvent.start}
          </div>
        )}
      </div>
    </>
  );
}

Header.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
};

export default Header;
