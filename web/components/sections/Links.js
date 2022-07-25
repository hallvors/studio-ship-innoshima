import React from "react";
import PropTypes from "prop-types";
import styles from "./Links.module.css";
import Link from "next/link";
import { getPathFromSlug } from "../../utils/urls";

export default function Links(props) {
  const { contents } = props;
  if (!(contents && contents.length)) {
    return null;
  }
  return (
    <ul className={styles["linklist"]}>
      {contents.map((link) => {
        return (
          <li key={link.slug.current} className={styles.item}>
            <Link href={getPathFromSlug(link.slug.current)}>
              <a>{link.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

Links.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.shape(
        { current: PropTypes.string.isRequired }.isRequired
      ),
      title: PropTypes.string.isRequired,
    })
  ),
};
