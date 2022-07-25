import React from "react";
import PropTypes from "prop-types";
import styles from "./Links.module.css";
import Link from "next/link";
import { withRouter } from "next/router";
import { getPathFromSlug, slugParamToPath } from "../../utils/urls";

function Links(props) {
  const { contents, router, site } = props;
  if (!(contents && contents.length)) {
    return null;
  }
  console.log(site.homepage);
  return (
    <ul className={styles["linklist"]}>
      {contents.map((link) => {
        const isActive =
          slugParamToPath(router.query.slug) === link.slug.current;
        const isHome = link.slug.current === site.homepage.slug.current;
        if (isActive && isHome) {
          return null;
        }
        return (
          <li
            key={link.slug.current}
            className={[styles.item, isActive ? styles.active : ""].join(" ")}
          >
            <Link href={isHome ? "/" : getPathFromSlug(link.slug.current)}>
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
  site: PropTypes.object,
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

export default withRouter(Links);
