import "./SearchBar.css";
import VoiceMic from "./VoiceMic";

export default function SearchBar(){
    return <form className="SearchBar">
        <VoiceMic />
        <input placeholder="음성인식 텍스트 예시" />
    </form>

}