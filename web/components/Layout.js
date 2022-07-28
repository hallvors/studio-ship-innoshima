import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { LogoJsonLd } from "next-seo";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

function Layout(props) {
  const { site, nextEvent, children } = props;

  if (!site) {
    console.error("Missing site config");
    return <div>Missing config</div>;
  }

  const { keywords, header, footer, logo } = site;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
        <meta name="keywords" content={keywords.join(", ")} />
      </Head>
      <div className={styles.maingrid}>
        <Header content={header} nextEvent={nextEvent} logo={logo} />
        {children}
        <Footer text={footer} />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  site: PropTypes.shape({
    title: PropTypes.string,
    header: PropTypes.arrayOf(PropTypes.object),
    footerNavItems: PropTypes.arrayOf(PropTypes.object),
    footer: PropTypes.arrayOf(PropTypes.object),
    keywords: PropTypes.arrayOf(PropTypes.string),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }),
};

export default Layout;
