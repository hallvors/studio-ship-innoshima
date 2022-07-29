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
    }
   }`;

  const imageProjection = groq`{
    ..., "image": image{..., "dimensions":asset->metadata.dimensions}
  }`;

export function getDataPromisesForRoute(slug, siteSettings) {
    const promises = [];
    const slugParts = (slug || "").split(/\//g);
    if (slug === "/") {
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
        // We may need supporting data
        if (slugParts[0] === 'タイムテーブル') {
          promises.push(client.fetch(groq`*[_id == 'global-schedule'][0] {
          _type,
          exceptions,
          "lessons": lessons[] {
            weekday, time,
            "activity": activity->name,
            "teacher": teacher->name,
          }
        }`))

        }
      } else {
        // if we have a multi-level slug, say
        // [ 'レッスン', 'バレエー' ]
        const types = {
            'レッスン': 'activity',
            '先生': 'person'
        }
        if (types[slugParts[0]]) {
            promises.push(
                client.fetch(groq`*[_type == $type]${imageProjection}`),
                {type: types[slugParts[0]]}
            )
        }
      }
    return promises;
}
