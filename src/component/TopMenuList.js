// import { findByLabelText } from "@testing-library/dom";

const liStyle = {
    width: "72px",
    height: "26px",
    margin: "0 72px 0 0"
}

const hrefStyle ={
    fontFamily: "NotoSansKR-Regular",
    fontSize: "18px",
    textAlign: "center",
    color: "#b5b5b5"
}

const ulStyle = {
    display: "flex",
    width: "974px",
    margin: "17px 0 17px 110px",
    padding: "0",
    listStyle: "none",
    flexGrow: "1"
}

export default function TopMenuList(){
    return(
        <ul className="top_menu_list" style = {ulStyle}>
            <li className="nav_item" style={liStyle}><a href="index.html" style={hrefStyle}>메뉴1</a></li>
            <li className="nav_item" style={liStyle}><a href="index.html" style={hrefStyle}>메뉴2</a></li>
            <li className="nav_item" style={liStyle}><a href="index.html" style={hrefStyle}>메뉴3</a></li>
            <li className="nav_item" style={liStyle}><a href="index.html" style={hrefStyle}>메뉴4</a></li>
            <li className="nav_item" style={liStyle}><a href="index.html" style={hrefStyle}>메뉴5</a></li>
            <li className="nav_item" style={liStyle}><a href="index.html" style={hrefStyle}>메뉴6</a></li>
        </ul>
    );
}