import React from "react";
import { useNavigate } from "react-router-dom";
import { getStringDate } from "../utils/date";

const DiaryLikeItem = React.memo(({id, date, content}) => {

    const navigate = useNavigate();

    const goDiary = () => {
        navigate(`/diary/${id}`)
    }

    return (
        <>
            <li onClick={() => goDiary()}>
                <span className="span1"><i className="fa-solid fa-heart likeDay_btn"/></span>
                <span className="span2">{getStringDate(new Date(date))}</span> 
                <p>{content}</p>
            </li>
        </>
    );

});

export default DiaryLikeItem;