import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DiaryEditor from "./DiaryEditor";
import DiaryDate from "./DiaryDate";
import DiaryButton from "./DiaryButton";
import DiaryList from "./DiaryList";

import { DiaryStateContext } from "../App";
import DiaryDetail from "./DiaryDetail";
import { DiaryDispatchContext } from "../App";


const DrSection = ({pageView, isEdit, originData}) => {

    const diaryList = useContext(DiaryStateContext);
    const { onRemove } = useContext(DiaryDispatchContext);

    const navigate = useNavigate();
    const {id} = useParams();
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

    const handleRemove = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(Number(id));
            navigate('/' , {replace : true});
        }
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
                        : 
                        null
                    }
                </div>
                <div className="DH_right">
                    {
                        pageView !== "list" ?  
                        <div className="info_box">
                            { pageView === "diary" ? <Link to={`/edit/${id}`}><i className="fa-solid fa-file-pen edit_btn" /></Link> : null }
                            { pageView === "diary" ? <i className="fa-regular fa-trash-can delete_btn" onClick={() => {handleRemove()}}/> : null }
                            { 
                                pageView === "diary" ? 
                                <i className="fas fa-times close_btn" onClick={() => navigate(`/`)}></i> 
                                :
                                <i className="fas fa-times close_btn" onClick={() => navigate(-1)}></i> 
                            }
                        </div>
                        :
                        <div className="info_box">
                            <Link to={"/new"}><i className="fas fa-pen add_btn"></i></Link>
                        </div> 
                    }
                </div>
            </div>
             <div className={ pageView === "list" ? 'DrSectionList' : 'DrSection'}>
                { 
                    pageView === "list" 
                    ? 
                    <DiaryList diaryList={data}/> : pageView === "diary" 
                    ?
                    <DiaryDetail diaryList={data}/> : <DiaryEditor pageView={pageView} isEdit={isEdit} originData={originData} /> 
                }
            </div>
        </div>
    );

}

export default DrSection;