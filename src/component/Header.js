import styles from "./Header.module.css";
import Inner from "./Inner";
import GroupNav from "./GroupNav";
import { useState } from "react";
import Modal from "./Modal";

const Header = (props) => {

    // const [isPopupOpen, setIsPopupOpen] = useState(false);

    // const openPopup = () => {
    //     setIsPopupOpen(true);
    // }
    // const closePopup = () => {
    //     setIsPopupOpen(false);
    // }

    return (
        <div className={styles.Header}>
            <Inner 
                nowPage={props.nowPage} 
                voiceInput={props.voiceInput} 
                isSpeakDone={props.isSpeakDone} 
                nextActionInput={props.nextActionInput} 
                searchOptInput={props.searchOptInput} 
                joinFieldValueInput={props.joinFieldValueInput}
                loginFieldValueInput={props.loginFieldValueInput}
                />
            <GroupNav />
            {/* <button type="button" onClick={openPopup}>test</button>
            {isPopupOpen && 
                <Modal 
                visible={isPopupOpen}
                closable={true}
                maskClosable={true}
                onClose={closePopup}>Hello</Modal>
            } */}
        </div>
    );
}

export default Header;