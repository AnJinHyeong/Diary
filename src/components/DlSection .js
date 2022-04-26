import { useContext } from "react";
import { DiaryStateContext } from "../App";
import DiaryLikeItem from "./DiaryLikeItem";

const DlSection = ({text}) => {

    const diaryList = useContext(DiaryStateContext);

    return (
        <div>
            <div className="DlHeader">
                <h2>{text}</h2>
            </div>
            <div className="DlSection">
                <ul>
                    { 
                        diaryList.map((it) => it.likeDay === 1 ? <DiaryLikeItem key={it.id} id={it.id} date={it.date} content={it.content}/> : null) 
                    }
                </ul>
            </div>
        </div>
        
    );

}

export default DlSection;