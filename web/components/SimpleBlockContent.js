import React from "react";
import PropTypes from "prop-types";
import { PortableText } from "@portabletext/react";
import Figure from "./Figure";
import Link from "next/link";

function SimpleBlockContent(props) {
  const { content } = props;

  if (!content) {
    console.error("Missing text to render", props);
    return null;
  }

  return (
    <PortableText
      value={content}
      components={{
        types: {
          figure: Figure,
        },
        marks: {
          internalLink: (props) => {
            console.log(props);
            const { slug = {} } = props.value;
            const href = `/${slug.current}`;
            return (
              <Link href={href}>
                <a>{props.children}</a>
              </Link>
            );
          },
        },
      }}
    />
  );
}

SimpleBlockContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
};

export default SimpleBlockContent;
