import styles from "./Inner.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Inner = (props) => {
    return <nav className={styles.Inner}>
        <Logo />
        <SearchBar 
            nowPage={props.nowPage} 
            voiceInput={props.voiceInput} 
            isSpeakDone={props.isSpeakDone} 
            nextActionInput={props.nextActionInput} 
            searchOptInput={props.searchOptInput} 
            joinFieldValueInput={props.joinFieldValueInput}
            loginFieldValueInput={props.loginFieldValueInput}
        />
    </nav>
}

export default Inner;