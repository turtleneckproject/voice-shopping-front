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


export default function LoginList(){
    return(
        <ul className="login_list" style={ulStyle}>
            <Link to="/join"><li className="login_item" style = {liStyle}>회원가입</li></Link>
            <li className="login_item" style = {liStyle}>로그인</li>
        </ul>
    ); 
}