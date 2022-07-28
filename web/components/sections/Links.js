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
  return (
    <ul className={styles["linklist"]}>
      {contents.map((link) => {
        const isHome = link.slug.current === site.homepage.slug.current;
        const isActive =
          slugParamToPath(router.query.slug) === link.slug.current || (router.asPath === '/' && isHome);
        if (isActive && isHome) {
          return null;
        }
        return (
          <li
            key={link.slug.current}
            className={[styles.item, isActive ? styles.active : ""].join(" ")}
          >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
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
