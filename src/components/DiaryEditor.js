import { useCallback, useState } from "react";

import EmotionItem from "../components/EmotionItem";

import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ pageView }) => {
    

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
        // console.log(emotion);        
    },[]);

    
    const diaryAdd = () => {
        
    }


    return (
        <div className="DiaryEditor">
            <div className="DE_header">
                { pageView === "new" ? <h2>NEW DIARY</h2> : <h2>EDIT DIARY</h2> }
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
                    <textarea placeholder={"How was your day?"} onChange={(e) =>{setContent(e.target.value)} }>{content}</textarea>
                </div>
            </div>
            <div className="DE_section">
                <div className="DE_inner_btn">
                    <button onClick={diaryAdd}>Write</button>   
                </div>
            </div>
        </div>
    );

}

export default DiaryEditor;