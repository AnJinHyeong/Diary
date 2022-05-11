import TopLine from "../components/TopLine";
import DlSection from "../components/DlSection ";
import DrSection from "./DrSection";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Section = ({pageView, isEdit, originData}) => {

    const diaryList = useContext(DiaryStateContext);

    return (
        <div className="Section">
            <TopLine />
            <div className="dMain">
                <div className="dM-l">
                    {diaryList && <DlSection diaryList={diaryList}/>}
                </div>
                <div className="dM-r">
                    {diaryList && <DrSection pageView={pageView} isEdit={isEdit} originData={originData} diaryList={diaryList} />}
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default Section;