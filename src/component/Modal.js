import React from 'react'
import './Modal.css'
import mic from "../img/voice_mic.png";

function Modal(props) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose(e)
    }
  }

  const close = (e) => {
    if (props.onClose) {
      props.onClose(e)
    }
  }

  const styleClasses = ["modal_overlay", props.show === 'entering'? "modal_overlay_open" : props.show === 'exiting' ? 'modal_overlay_close':null];
  return (
    <div>
      <div className={styleClasses.join(' ')} />
      <div className="modal_wrapper"
        onClick={props.maskClosable ? onMaskClick : null}
        // tabIndex="-1"
        // visible={visible}
      >
        <div tabIndex="0" className="modal_inner">
          {/* {closable && <button className="modal-close" onClick={close} >close</button>} */}
          <div className="output_voice"><img src={mic} alt="" />{props.msg}</div>
          <div className="input_voice">" {props.voice} "</div>
        </div>
      </div>
    </div>
  )
}

export default Modal