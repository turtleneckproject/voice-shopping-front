import React, { useEffect, useState } from 'react';
import './LoginArea.css';

const LoginArea = (props) => {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const handleId = ({target: {value}}) => {
        setId(value);
    }
    const handlePwd = ({target: {value}}) => {
        setPwd(value);
    }

    // useEffect(()=>{
    //     props.joinFormInput({
    //         id: id,
    //         pwd: pwd
    //     })
    // }, [id, pwd])

    return (
        <div className="login_area">
            <div className="login_title">
                <p className="logintxt">로그인</p>
            </div>
            <div className="login_box">
                <form className="form_box">
                    <div className="login_form"><input type="text" name="id" placeholder="아이디" /></div>
                    <div className="login_form"><input type="password" name="password" placeholder="비밀번호" /></div>
                </form>
                <button className="login_btn" onClick={() => props.readyInput(true)}>로그인</button>
            </div>
        </div>
    );
}

export default LoginArea;