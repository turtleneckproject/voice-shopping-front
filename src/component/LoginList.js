import React from "react";
import { Link } from "react-router-dom";

const ulStyle = {
    display: "flex",
    padding: "0",
    listStyle: "none"
}

const liStyle = {
    width: "72px",
    height: "20px",
    fontFamily: "NotoSansKR-Regular",
    fontSize: "14px",
    textAlign: "center",
    color: "#b5b5b5"
}

const customer_liStyle = {
    width: "200px",
    height: "20px",
    fontFamily: "NotoSansKR-Light",
    fontSize: "14px",
    textAlign: "right",
    color: "#a8a8a8"
}

const LoginJoin = () => {
    return(
        <ul className="login_list" style={ulStyle}>
            <Link to="/join"><li className="login_item" style = {liStyle}>회원가입</li></Link>
            <li className="login_item" style = {liStyle}>로그인</li>
        </ul>
    )
}

const WelcomeCustomer = (props) => {
    return(
        <ul className="login_list" style={ulStyle}>
            <li className="login_item" style = {customer_liStyle}>환영합니다, {props.id}님</li>
        </ul>
    )
}


export default function LoginList(props){
    const loginID = props.loginID;
    return(
        <React.Fragment>
            { loginID === null ? ( <LoginJoin /> ) : ( <WelcomeCustomer id={loginID} /> ) }
        </React.Fragment>
        
    );
}