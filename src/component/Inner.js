import styles from "./Inner.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Inner = (props) => {
    return <nav className={styles.Inner}>
        <Logo />
        <SearchBar voiceInput={props.voiceInput} isSpeakDone={props.isSpeakDone} nextActionInput={props.nextActionInput} searchOptInput={props.searchOptInput}/>
    </nav>
}

export default Inner;