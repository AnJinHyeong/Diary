import { useContext } from "react";
import { DiaryStateContext } from "../App";
import DiaryLikeItem from "./DiaryLikeItem";

const DlSection = ({diaryList}) => {

    const userNickName = sessionStorage.getItem('userNick');
    
    const getProcessedDiaryList = () => {
        const sortedList = diaryList.sort((a,b) => parseInt(a.date) - parseInt(b.date));
        return sortedList;
    };

    return (
        <div>
            <div className="DlHeader">
                {
                    userNickName !== null ?
                    <h2>{userNickName + `'s DIARY`}</h2> : null
                }
            </div>
            <div className="DlSection">
                <ul>
                    {
                        getProcessedDiaryList().map((it) => it.likeDay === 1 ? (
                            <DiaryLikeItem key={it.id} id={it.id} date={it.date} content={it.content}/> 
                        ) : null)
                    }
                </ul>
            </div>
        </div>
        
    );

}

export default DlSection;