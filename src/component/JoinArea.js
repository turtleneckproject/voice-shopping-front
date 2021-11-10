import React, { useEffect, useState } from 'react';
import './JoinArea.css';

const JoinArea = (props) => {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const handleId = ({target: {value}}) => {
        setId(value);
    }
    const handlePwd = ({target: {value}}) => {
        setPwd(value);
    }

    useEffect(()=>{
        props.joinFormInput({
            id: id,
            pwd: pwd
        })
    }, [id, pwd])

    return (
        <div className="join_area">
            <div className="join_title">
                <p className="jointxt">회원가입</p>
            </div>
            <div className="form_item name">
                <div className="form_title">
                    <strong className="infotxt">이름</strong>
                </div>
                <div className="form_group">
                    <input className="input_name" />
                </div>
            </div>
            <div className="form_item id">
                <div className="form_title">
                    <strong className="infotxt">아이디</strong>
                </div>
                <div className="form_group">
                    <input 
                        name="input_id"
                        value={id}
                        onChange={handleId}
                    />
                </div>
            </div>
            <div className="form_item pw">
                <div className="form_title">
                    <strong className="infotxt">비밀번호</strong>
                </div>
                <div className="form_group">
                    <input 
                        type="password" 
                        name="input_pw" 
                        value={pwd}
                        onChange={handlePwd}
                    />
                </div>
            </div>
            <div className="form_item pw">
                <div className="form_title">
                    <strong className="infotxt">비밀번호 확인</strong>
                </div>
                <div className="form_group">
                    <input type="password" className="input_pw" />
                </div>
            </div>
            <div className="form_item hp">
                <div className="form_title">
                    <strong className="infotxt">휴대전화 번호</strong>
                </div>
                <div className="hp_form_group">
                    <div className="form_group hp1">
                        <input type="tel" className="input_hp1" />
                    </div>
                    <p className="hyphen">-</p>
                    <div className="form_group hp2">
                        <input type="tel" className="input_hp2" />
                    </div>
                    <p className="hyphen">-</p>
                    <div className="form_group hp3">
                        <input type="tel" className="input_hp3" />
                    </div>
                </div>
            </div>
            <div className="form_item address">
                <div className="form_title">
                    <strong className="infotxt">배송지 주소</strong>
                </div>
                <div className="form_group">
                    <input className="input_address" />
                </div>
            </div>
            <div className="form_item card">
                <div className="form_title">
                    <strong className="infotxt">카드 번호</strong>
                </div>
                <div className="form_group">
                    <input className="input_card" />
                </div>
            </div>
            <div className="join_btn_area">
                <button className="join_btn" onClick={() => props.readyInput(true)}>가입하기</button>
            </div>
        </div>
    );
}

export default JoinArea;