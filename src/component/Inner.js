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
            searchOptInput={props.searchOptInput} //없어도 될 듯
            setLoad={props.setLoad}
            joinFieldValueInput={props.joinFieldValueInput}
            loginFieldValueInput={props.loginFieldValueInput}
            cartFieldValueInput={props.cartFieldValueInput}
            payFieldValueInput={props.payFieldValueInput}
            searchFlag={props.searchFlag}
        />
    </nav>
}

export default Inner;