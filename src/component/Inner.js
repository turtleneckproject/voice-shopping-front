import styles from "./Inner.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Inner(){
    return <nav className={styles.Inner}>
        <Logo />
        <SearchBar />
    </nav>
}