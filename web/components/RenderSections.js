import React, { Fragment } from "react";
import PropTypes from "prop-types";
import * as SectionComponents from "./sections";
import Figure from "./Figure";
import SimpleBlockContent from "./SimpleBlockContent";
import GeneralList from "./GeneralList";
import styles from "./RenderSections.module.css";

function resolveSections(section) {
  switch (section._type) {
    case "textbox":
      return SimpleBlockContent;
    case "figure":
      return Figure;
    case "slideshow":
      return SectionComponents.Slideshow;
    case "links":
      return SectionComponents.Links;
    case "person":
      return SectionComponents.Person;
    case "activity":
      return SectionComponents.Activity;
    case "timetablePlaceholder":
    case "schedule":
      return SectionComponents.Timetable;
    default:
      // assumed to be a list of teachers or activities
      return GeneralList;
  }

  console.error("Cant find section", section); // eslint-disable-line no-console
  return null;
}

function RenderSections(props) {
  const { sections, site } = props;

  if (!sections) {
    console.error("Missing section");
    return <div>Missing sections</div>;
  }

  return (
    <Fragment>
      {sections.map((section, idx) => {
        const SectionComponent = resolveSections(section);
        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>;
        }
        return (
          <section
            key={section._key || idx}
            className={`section-${idx} ${styles[`section-${section._type}`]}`}
          >
            <SectionComponent {...section} site={site} />
          </section>
        );
      })}
    </Fragment>
  );
}

RenderSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    })
  ),
};

export default RenderSections;
