import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import client from "../client";
import Layout from "../components/Layout";
import RenderSections from "../components/RenderSections";
import RichTextWithOptionalPhoto from "../components/RichTextWithOptionalPhoto";

import { getSlugVariations, slugParamToPath } from "../utils/urls";

/**
 * Fetches data for our pages.
 *
 * The [[...slug]] name for this file is intentional - it means Next will run this getServerSideProps
 * for every page requested - /, /about, /contact, etc..
 * From the received params.slug, we're able to query Sanity for the route coresponding to the currently requested path.
 */
export const getServerSideProps = async ({ params }) => {
  const slug = slugParamToPath(params?.slug);
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

  const contentProjection = groq`"content": content[]{
    ...,
      _type == 'links' => {
        ...,
      "contents": contents[]->{title, slug, _key}
    },
    _type == 'figure' => {
      ..., "dimensions":asset->metadata.dimensions
    },
    _type == 'slideshow' => {
      ..., "images": images[]{..., "dimensions":asset->metadata.dimensions}
    }
   }`;

  const imageProjection = groq`{
    ..., "image": image{..., "dimensions":asset->metadata.dimensions}
  }`;

  const promises = [
    client.fetch(groq`
      *[_type == 'event' && defined(start) && start < now()] |
      order(start desc) [0] {_id, title, start}
    `),
    client.fetch(groq`*[_id == 'global-schedule'][0] {
      _type,
      exceptions,
      "lessons": lessons[] {
        weekday, time, activity, teacher
      }
    }`),
    client.fetch(groq`*[_type == 'person']${imageProjection}`),
    client.fetch(groq`*[_type == 'activity']${imageProjection}`),
  ];

  if (slug === "/") {
    promises.push(
      client.fetch(
        groq`*[_type == "page" && _id == $id][0]{..., ${contentProjection}}`,
        { id: site.homepage._id }
      )
    );
  } else if (slugParts.length === 1) {
    promises.push(
      client.fetch(
        // Get the route document with one of the possible slugs for the given requested path
        groq`*[_type == "page" && slug.current in $possibleSlugs][0]{..., ${contentProjection}}`,
        { possibleSlugs: getSlugVariations(slug) }
      )
    );
  } else {
    // if we have a multi-level slug, say
    // [ 'レッスン', 'バレエー' ]
    // ..we get the data here already
    promises.push(null);
  }

  const [nextEvent, schedule, teachers, activities, page] = await Promise.all(
    promises
  );
  let nonPageContent = null;

  if (!page && slugParts.length === 2) {
    switch (slugParts[0]) {
      case "レッスン":
        nonPageContent = activities.find(
          (activity) => activity.name === slugParts[1]
        );
        break;
      case "先生":
        nonPageContent = teachers.find(
          (teacher) => teacher.name === slugParts[1]
        );
        break;
    }
  }

  if (!page?._type === "page" && !nonPageContent) {
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
        page,
        nonPageContent,
        nextEvent,
        schedule,
        teachers: indexBy(teachers, "_id"),
        activities: indexBy(activities, "_id"),
      } || {},
  };
};

const builder = imageUrlBuilder(client);

const LandingPage = ({
  page,
  nonPageContent,
  site,
  nextEvent,
  schedule,
  teachers,
  activities,
}) => {
  if (!(page || nonPageContent)) {
    return null;
  }

  let title, content, slug;
  if (page) {
    title = page.title;
    content = page.content;
    slug = page.slug;
  } else {
    title = null;
    content = null;
    slug = null;
  }

  // a bit of a hack here, sorry about this
  if (content) {
    for (let i = 0; i < content.length; i++) {
      if (content[i] && content[i]._type === "timetablePlaceholder") {
        content[i] = schedule;
        content[i].teachers = teachers;
        content[i].activities = activities;
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
    <Layout site={site} nextEvent={nextEvent}>
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
        {nonPageContent && (
          <>
            <RenderSections sections={[site.globalNavItems]} site={site} />
            <RichTextWithOptionalPhoto
              title={nonPageContent.name}
              image={nonPageContent.image}
              description={nonPageContent.bio || nonPageContent.description}
            />
          </>
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
