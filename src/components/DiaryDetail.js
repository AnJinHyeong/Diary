import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { getStringDate } from "../utils/date";

import { emotionList } from "../utils/emotion";


const DiaryDetail = () => {

    const diaryList = useContext(DiaryStateContext);
    const { onLike, offLike } = useContext(DiaryDispatchContext);
    const {id} = useParams();

    const userId = sessionStorage.getItem('userId');
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

            if(targetDiary){
                setData(targetDiary);
            } else {
                alert("없는 일기 입니다.");
                navigate('/home' , {replace : true});
            }
        }

    }, [id, diaryList]);
    
    if(!data){
        return <div className="DiaryView">Loding...</div>
    } else {

        const emotionImg = emotionList.find((it) => it.emotion_id === data.emotion );

        return (
            <div className="DiaryView">
                <div className="DV_inner">
                    <div className="DV_inner_img">
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={emotionImg.emotion_img} />
                        </div>
                    </div>
                    <div className="DV_inner_info">
                        {
                            data.likeDay === 0 ? 
                            <i className="fa-regular fa-heart unlikeDay_btn" onClick={() => onLike(id,data.date,data.content,data.emotion,userId)} /> 
                            : 
                            <i className="fa-solid fa-heart likeDay_btn" onClick={() => offLike(id,data.date,data.content,data.emotion,userId)} />
                        }
                        <div className="diary_date">{getStringDate(new Date(data.date))}</div>
                    </div>
                </div>
                <div className="DV_inner">
                    <div className="DV_inner_content">
                        <pre>{data.content}</pre>
                    </div>
                </div>
            </div>
            
        );
    }

}

export default DiaryDetail;