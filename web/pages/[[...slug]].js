import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import client from "../client";
import Layout from "../components/Layout";
import RenderSections from "../components/RenderSections";
import { getDataPromisesForRoute } from "../utils/queries";

import { slugParamToPath } from "../utils/urls";

/**
 * Fetches data for our pages.
 *
 * The [[...slug]] name for this file is intentional - it means Next will run this getServerSideProps
 * for every page requested - /, /about, /contact, etc..
 * From the received params.slug, we're able to query Sanity for the route coresponding to the currently requested path.
 */
export const getServerSideProps = async ({ params }) => {
  console.log({params})
  const slug = slugParamToPath(params?.slug);
  console.log({derived: slug})
  const slugParts = slug.split(/\//g);
  // TODO: support a type/ID mode for teacher, event, activity?
  let site = await client.fetch(
    groq`*[_id == "global-config"][0]{
      ...,
      "homepage": homepage->{_id, title, slug},
      "globalNavItems": globalNavItems{_type, "contents":contents[]->{title, slug, _key}},
      "logo": logo{..., "dimensions":asset->metadata.dimensions}
    }`
  );
  // site has title, description, footer, header, homepage (ref), keywords

  const promises = getDataPromisesForRoute(slug, site);

  const routeData = await Promise.all(
    promises
  );


  if (!(routeData.length && routeData[0])) {
    return {
      notFound: true,
    };
  }

  function indexBy(ar, prop) {
    return ar.reduce((accumulated, current) => {
      accumulated[current[prop]] = current;
      return accumulated;
    }, {});
  }

  return {
    props:
      {
        site,
        mainContent: routeData[0],
        supportingData: routeData.slice(1),
        slugParts,
      },
  };
};

const builder = imageUrlBuilder(client);

const LandingPage = ({
  mainContent,
  site,
  supportingData,
  slugParts,
}) => {
  if (!(mainContent)) {
    console.log('wot, no content?', {mainContent})
    return null;
  }

  let title, content, slug;
  if (mainContent._type === 'page') {
    title = mainContent.title;
    content = mainContent.content;
    slug = mainContent.slug;
  } else if (['person', 'activity'].includes(mainContent._type)) {
    title = mainContent.name;
    content = mainContent;
    slug = slugParts.join('/');
  }

  // a bit of a hack here, sorry about this
  if (content) {
    for (let i = 0; i < content.length; i++) {
      if (content[i] && content[i]._type === "timetablePlaceholder" && supportingData.length && supportingData[0]._type === 'schedule') {
        content[i] = supportingData[0];
      }
    }
  }

  const openGraphImages = site.openGraphImage
    ? [
        {
          url: builder.image(site.openGraphImage).width(800).height(600).url(),
          width: 800,
          height: 600,
          alt: title,
        },
        {
          // Facebook recommended size
          url: builder.image(site.openGraphImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          // Square 1:1
          url: builder.image(site.openGraphImage).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt: title,
        },
      ]
    : [];
  return (
    <Layout site={site}>
      <NextSeo
        title={title}
        titleTemplate={`%s - ${site.title}`}
        description={`${site.description}`}
        canonical={site.url && `${site.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={false}
      />
      <div className={"two-column-page"}>
        {content && (
          <RenderSections
            sections={[site.globalNavItems].concat(content)}
            site={site}
          />
        )}
      </div>
    </Layout>
  );
};

LandingPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.shape({ current: PropTypes.string }),
    content: PropTypes.any,
  }),
  site: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    openGraphImage: PropTypes.any,
    header: PropTypes.array, // portable text
  }),
};

export default LandingPage;
