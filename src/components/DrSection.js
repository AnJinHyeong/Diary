import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DiaryEditor from "./DiaryEditor";
import DiaryDate from "./DiaryDate";
import DiaryButton from "./DiaryButton";
import DiaryList from "./DiaryList";

import { DiaryStateContext } from "../App";
import DiaryView from "./DiaryView";


const DrSection = ({pageView}) => {

    const diaryList = useContext(DiaryStateContext);

    const [curDate, setCurDate] = useState(new Date());
    const [data, setData] = useState([]);
    const headText = `${curDate.getFullYear()}. ${curDate.getMonth() + 1}`;

    useEffect(() => {
        if(diaryList.length >= 0){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime();
    
            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
            
        }
    }, [diaryList, curDate]);

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
        <div>
            <div className="DrHeader">
                <div className="DH_left">
                    {
                        pageView === "list" ? 
                        <DiaryDate headText={headText} 
                        leftChild={<DiaryButton text={<i className="fas fa-angle-left"></i>} onClick={() => lastMonth()}/>}
                        rightChild={<DiaryButton text={<i className="fas fa-angle-right"></i>} onClick={() => nextMonth()}/>}
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
             <div className="DrSection">
                { 
                    pageView === "list" 
                    ? 
                    <DiaryList diaryList={data}/> : pageView === "diary" 
                    ?
                    <DiaryView /> : <DiaryEditor pageView={pageView} /> 
                }
            </div>
        </div>
    );

}

export default DrSection;