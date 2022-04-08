import { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

import EmotionItem from "../components/EmotionItem";

import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ pageView }) => {
    
    const navigator = useNavigate();
    const contentRef = useRef();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");
    const [likeDay, setLikeDay] = useState(0);

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    },[]);

    const likeBtn = () => {
        if(likeDay === 0) setLikeDay(1);
        else setLikeDay(0);
    }
    

    const { onCreate } = useContext(DiaryDispatchContext);
    const diarySubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        onCreate(date,content,emotion,likeDay);
        navigator('/', {replace:true});
    }

    return (
        <div className="DiaryEditor">
            <div className="DE_header">
                { pageView === "new" ? <h2>NEW DIARY</h2> : <h2>EDIT DIARY</h2> }
                {
                    likeDay === 0 ? 
                    <i className="fa-regular fa-heart unlikeDay_btn like_btn" onClick={likeBtn}></i> : 
                    <i className="fa-solid fa-heart likeDay_btn like_btn" onClick={likeBtn}></i> 
                }
            </div>
            <div className="DE_section">
                <label>Today Date</label>
                <div className="DE_inner_date">
                    <input type={"date"} value={date} onChange={(e) => {setDate(e.target.value)}}/>
                </div>
            </div>
            <div className="DE_section">
                <label>Today Emotion</label>
                <div className="DE_inner_emotion">
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="DE_section">
                <label>Today Life</label>
                <div className="DE_inner_life">
                    <textarea ref={contentRef} placeholder={"How was your day?"}  value={content} onChange={(e) =>{setContent(e.target.value)}}>{content}</textarea>
                </div>
            </div>
            <div className="DE_section">
                <div className="DE_inner_btn">
                    <button onClick={diarySubmit}>Write</button>   
                </div>
            </div>
        </div>
    );

}

export default DiaryEditor;