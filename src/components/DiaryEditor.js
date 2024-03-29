import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

import EmotionItem from "../components/EmotionItem";

import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ pageView, isEdit, originData }) => {

    
    const navigate = useNavigate();
    const contentRef = useRef();

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");
    const [likeDay, setLikeDay] = useState(0);
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

    const { onCreate, onEdit } = useContext(DiaryDispatchContext);

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    },[]);

    const likeBtn = () => {
        if(likeDay === 0) setLikeDay(1);
        else setLikeDay(0);
    }

    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        // if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
        if(!isEdit){
            onCreate(date, content, emotion, likeDay, userId);
        } else {
            onEdit(originData.id, date, content, emotion, likeDay, userId);
        }
        // }
        navigate('/home', {replace : true});
    }

    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(originData.date)));
            setEmotion(originData.emotion);
            setContent(originData.content);
            setLikeDay(originData.likeDay);
        }

    }, [isEdit, originData]);


 
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
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
                    <button onClick={handleSubmit}>Write</button>   
                </div>
            </div>
        </div>
    );
    

}

export default DiaryEditor;