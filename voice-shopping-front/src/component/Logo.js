import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../img/sample_logo.png"

export default function Logo() {
    return <div className={styles.Logo}> 
    <Link to="/"><img src={logo} alt="LOGO" /></Link>
    </div>
}