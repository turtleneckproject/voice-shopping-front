import GroupNav from "./GroupNav";
import styles from "./TopMenuBar.module.css";

export default function TopMenuBar(){
    return(
        <div className={styles.TopMenuBar}>
            <GroupNav />
        </div>
    );
}