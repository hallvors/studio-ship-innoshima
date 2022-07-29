import PropTypes from "prop-types";
import Figure from "./Figure";
import styles from "./RichTextWithOptionalPhoto.module.css";
import SimpleBlockContent from "./SimpleBlockContent";

export default function RichTextWithOptionalPhoto(props) {
  return (
    <div className={styles.container}>
      {props.title && <h3>{props.title}</h3>}
      <div className={[styles.description, props.image ? styles.hasImg : styles.noImg].join(' ')}>
      {props.description && <SimpleBlockContent content={props.description} />}
      </div>
      {props.image && (
        <div className={styles.imgparent}>
          <Figure {...props.image} />
        </div>
      )}
    </div>
  );
}

RichTextWithOptionalPhoto.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  description: PropTypes.arrayOf(PropTypes.object),
};
