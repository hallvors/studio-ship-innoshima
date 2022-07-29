import Person from "./sections/Person";
import Activity from "./sections/Activity";
import styles from "GeneralList.module.css";

export default function GeneralList(props) {
  if (props && props.length) {
    return (
      <div className={styles.list}>
        {props.map((item) => (
          <div className={styles.card}>
            {item._type === "person" ? <Person {...item} /> : <Activity />}
          </div>
        ))}
      </div>
    );
  }
  return null;
}
