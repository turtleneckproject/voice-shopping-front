import styles from "./Header.module.css";
import Inner from "./Inner";
import GroupNav from "./GroupNav";

const Header = (props) => {
    return (
        <div className={styles.Header}>
            <Inner voiceInput={props.voiceInput}/>
            <GroupNav />
        </div>
    );
}

export default Header;