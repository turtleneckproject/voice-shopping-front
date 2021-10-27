import "./Breadcrumbs.css";
import home from "../img/home_icon.png";
import arrow from "../img/arrow.png";

export default function Breadcrumbs(){
    return(
        <div className = "breadcrumbs">
            <ul className="breadcrumbs_box">
                <li className="breadcrumbs_item">
                    <img src={home} alt="home" />
                    <a href="index.html">홈</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src={arrow} alt="arrow" />
                    <a href="index.html">cat1</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src={arrow} alt="arrow" />
                    <a href="index.html">cat2</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src={arrow} alt="arrow" />
                    <a href="index.html">cat3</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src={arrow} alt="arrow" />
                    <a href="index.html">cat4</a>
                </li>
            </ul>
        </div>
        
    );
}