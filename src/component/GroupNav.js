import styles from "./GroupNav.module.css"
import LoginList from "./LoginList"
import TopMenuList from "./TopMenuList"

export default function GroupNav(props){
    return <div className={styles.GroupNav}>
        <TopMenuList />
        <LoginList loginID={props.loginID}/>
    </div>
}