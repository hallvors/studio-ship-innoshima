import groq from "groq";
import client from "../client";
import { getSlugVariations } from "./urls";

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
    },
    _type == 'textbox' => {
        ...,
        content[]{
            ...,
            markDefs[]{
                ...,
                _type == "internalLink" => {
                  _type,
                  "slug": @.reference->slug
                }
              }
        }
    }
   }`;

const imageProjection = groq`{
    ..., "image": image{..., "dimensions":asset->metadata.dimensions}
  }`;

export function getDataPromisesForRoute(slug, siteSettings) {
  const promises = [];
  const slugParts = (slug || "").split(/\//g);
  if (slug === "/" || slug === "") {
    // Requesting /
    promises.push(
      client.fetch(
        groq`*[_type == "page" && _id == $id][0]{..., ${contentProjection}}`,
        { id: siteSettings.homepage._id }
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
    const types = {
      レッスン: "activity",
      先生: "person",
    };
    if (types[slugParts[0]]) {
      promises.push(
        client.fetch(
          groq`*[_type == $type && name == $name][0]${imageProjection}`,
          { type: types[slugParts[0]], name: slugParts[1] }
        )
      );
    }
  }
  return promises;
}

export async function getPlaceholderData(content) {
  const types = {
    activitiesListPlaceholder: "activity",
    teachersListPlaceholder: "person",
  };

  if (content) {
    for (let i = 0; i < content.length; i++) {
      if (content[i] && content[i].enabled === false) {
        content[i] = null;
        continue;
      }
      if (content[i] && content[i]._type === "timetablePlaceholder") {
        const timetable =
          await client.fetch(groq`*[_id == 'global-schedule'][0] {
                _type,
                exceptions,
                "lessons": lessons[] {
                  weekday, time,
                  "activity": activity->{_id, name},
                  "teacher": teacher->name,
                }
              }`);
        timetable.placeholderSettings = content[i];
        content[i] = timetable;
      } else if (
        content[i] &&
        (content[i]._type === "teachersListPlaceholder" ||
          content[i]._type === "activitiesListPlaceholder")
      ) {
        const list = await client.fetch(
          groq`*[_type == $type]| order(order, desc) |${imageProjection}`,
          { type: types[content[i]._type] }
        );
        content[i] = list;
      }
    }
  }
}
