import React from "react";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id,date,content,emotion,likeday}) => {


    const strDate = new Date(parseInt(date)).toLocaleDateString().slice(0,10);
    // const strDate = new Date(Number(date)).toLocaleDateString().slice(0,10);

    const navigate = useNavigate();
    
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };

    return (
        <div className="DiaryItem">
            <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")} onClick={goDetail}>
                <img src={process.env.PUBLIC_URL + `assets/emotion/emotion${emotion}.png`} />
            </div>
            <div className="info_wrapper" onClick={goDetail}>
                <div className="diary_date">{strDate}</div>
                <div className="diary_content">{content.length >= 25 ? content.slice(0,25)+'...' : content}</div>
            </div>
            <div className="btn_wrapper">
                {likeday === 0 ? <i className="fa-regular fa-heart unlike_btn"></i> : <i className="fa-solid fa-heart likeday_btn"></i> }
            </div>
        </div>
    );

}

export default DiaryItem;