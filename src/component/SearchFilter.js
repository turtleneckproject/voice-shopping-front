import "./SearchFilter.css";

export default function SearchFilter(){
    return (
        <div className="search_filter">
            <div className="search_filter_btn">
                <a href="index.html" className="txt_btn">
                    검색 필터
                    <img src="img/dropdown.png" alt="더보기" />
                </a>
            </div>
            <div className="search_filter_item">오뚜기</div> 
            <div className="search_filter_item">무염</div>
            <div className="search_filter_item">무료배송</div>
            <div className="search_filter_item">5,000원~10,000원</div>
        </div>
    );
}