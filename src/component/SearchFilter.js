import "./SearchFilter.css";
import dropdown from "../img/dropdown.png";

export default function SearchFilter(){
    return (
        <div className="search_filter">
            <div className="search_filter_btn">
                <a href="index.html" className="txt_btn">
                    검색 필터
                    <img src={dropdown} alt="더보기" />
                </a>
            </div>
            <div className="search_filter_item_enabled">정확도순</div> 
            <div className="search_filter_item_disabled">날짜순</div>
            <div className="search_filter_item_disabled">가격오름차순</div>
            <div className="search_filter_item_disabled">가격내림차순</div>
        </div>
    );
}