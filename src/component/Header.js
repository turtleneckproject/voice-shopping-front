import styles from "./Header.module.css";
import Inner from "./Inner";
import GroupNav from "./GroupNav";

export default function Header() {
    return (
        <div className={styles.Header}>
            <Inner />
            <GroupNav />
        </div>
    );
}