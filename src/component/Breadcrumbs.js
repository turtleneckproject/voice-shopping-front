import "./Breadcrumbs.css";

export default function Breadcrumbs(){
    return(
        <div className = "breadcrumbs">
            <ul className="breadcrumbs_box">
                <li className="breadcrumbs_item">
                    <img src="img/home_icon.png" alt="home" />
                    <a href="index.html">홈</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src="img/arrow.png" alt="arrow" />
                    <a href="index.html">식품</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src="img/arrow.png" alt="arrow" />
                    <a href="index.html">가공식품</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src="img/arrow.png" alt="arrow" />
                    <a href="index.html">버터/치즈/크림</a>
                </li>
                <li className="breadcrumbs_item">
                    <img src="img/arrow.png" alt="arrow" />
                    <a href="index.html">버터</a>
                </li>
            </ul>
        </div>
        
    );
}