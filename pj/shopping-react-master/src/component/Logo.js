import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
    return <div className={styles.Logo}> 
    <Link to="/"><img src="img/sample_logo.png" alt="LOGO" /></Link>
    </div>
}