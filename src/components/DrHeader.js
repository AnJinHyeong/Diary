import React, { useState } from "react";
import { Link } from "react-router-dom";
import DiaryDate from "./DiaryDate";
import DiaryButton from "./DiaryButton";

const DrHeader = ({ pageView }) => {

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}.${curDate.getMonth() + 1}`;

    const nextMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    }

    const lastMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    }

    return (
        <div className="DrHeader">
            <div className="DH_left">
                {
                    pageView === "list" ? 
                    <DiaryDate headText={headText} 
                    leftChild={<DiaryButton text={"<"} onClick={() => lastMonth()}/>}
                    rightChild={<DiaryButton text={">"} onClick={() => nextMonth()}/>}
                    /> 
                    : null
                }
            </div>
            <div className="DH_right">
                {
                    pageView !== "list" ?  
                    <div className="info_box">
                        <Link to={"/"}><i className="fas fa-times add_btn"></i></Link>
                    </div>
                    :
                    <div className="info_box">
                        
                        <Link to={"/new"}><i className="fa-solid fa-plus add_btn"></i></Link>
                    </div> 
                }
                {
                    pageView === "list" ? 
                    <div className="info_box">
                        <i className="fa-solid fa-bars info_btn"></i>
                    </div> 
                    : null
                }
            </div>
        </div>
    );

}

export default DrHeader;