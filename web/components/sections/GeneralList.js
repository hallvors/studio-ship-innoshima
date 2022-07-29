import Person from "./Person";
import Activity from "./Activity";
import styles from "./GeneralList.module.css";

export default function GeneralList(props) {
  const keys = Object.keys(props);
  if (keys && keys.length) {
    return (
      <div className={styles.list}>
        {keys.map((item) => (
          <div className={styles.card}>
            {props[item]._type === "person" ? (
              <Person {...props[item]} />
            ) : (
              <Activity {...props[item]} />
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
}
