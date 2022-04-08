import { useReducer, useState } from "react";

import TopLine from "../components/TopLine";
import DlHeader from "../components/DlHeader";
import DlSection from "../components/DlSection ";
import DrHeader from "../components/DrHeader";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useNavigate } from "react-router-dom";
import DrSection from "./DrSection";

const Section = ({pageView}) => {


    return (
        <div className="Section">
            <TopLine />
            <div className="dMain">
                <div className="dM-l">
                    <DlSection text={"JinHyeong's Daily Life"}/>
                </div>
                <div className="dM-r">
                    <DrSection pageView={pageView}/>
                </div>
            </div>
        </div>
    );

}

export default Section;