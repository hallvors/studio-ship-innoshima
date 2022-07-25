import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./Footer.module.css";
import SimpleBlockContent from "./SimpleBlockContent";

function Footer(props) {
  const { text } = props;
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <SimpleBlockContent content={text} />
      </div>
    </div>
  );
}

Footer.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
