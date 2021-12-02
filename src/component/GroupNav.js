import styles from "./GroupNav.module.css"
import LoginList from "./LoginList"
import TopMenuList from "./TopMenuList"

export default function GroupNav(){
    return <div className={styles.GroupNav}>
        <TopMenuList />
        <LoginList />
    </div>
}