import "./SearchFilter.css";
import dropdown from "../img/dropdown.png";

const SearchFilter = (props) => {
    const styleClasses1 = ["search_filter_bubble", props.option === '정확도순'? "search_filter_bubble_enabled" : "search_filter_bubble_disabled"];
    const styleClasses2 = ["search_filter_bubble", props.option === '날짜순'? "search_filter_bubble_enabled" : "search_filter_bubble_disabled"];
    const styleClasses3 = ["search_filter_bubble", props.option === '가격오름차순'? "search_filter_bubble_enabled" : "search_filter_bubble_disabled"];
    const styleClasses4 = ["search_filter_bubble", props.option === '가격내림차순'? "search_filter_bubble_enabled" : "search_filter_bubble_disabled"];
    return (
        <div className="search_filter">
            <div className="search_filter_btn">
                <a href="index.html" className="txt_btn">
                    검색 필터
                    <img src={dropdown} alt="더보기" />
                </a>
            </div>
            <div className={styleClasses1.join(' ')}>정확도순</div> 
            <div className={styleClasses2.join(' ')}>날짜순</div>
            <div className={styleClasses3.join(' ')}>가격오름차순</div>
            <div className={styleClasses4.join(' ')}>가격내림차순</div>
        </div>
    );
}

export default SearchFilter;