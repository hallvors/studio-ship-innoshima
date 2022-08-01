import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.css";
import SimpleBlockContent from "./SimpleBlockContent";

function Footer(props) {
  const { text } = props;
  const [font, setFont] = useState(null);
  const [fontReady, setFontReady] = useState(false);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.text}>
          <SimpleBlockContent content={text} />
        </div>
      </div>
      <input
        value={font}
        onChange={(evt) => setFont(evt.target.value)}
        onFocus={() => setFontReady(false)}
        onBlur={(evt) => setFontReady(Boolean(font))}
        placeholder="type font name here to test font"
      />
      {font && fontReady && (
        <div>
          <link
            href={`https://fonts.googleapis.com/css2?family=${font}&display=swap`}
            rel="stylesheet"
          />
          <style>
            body {"{"}
            font-family: {font};{"}"}
          </style>
        </div>
      )}
    </>
  );
}

Footer.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
