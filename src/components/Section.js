import TopLine from "../components/TopLine";
import DlSection from "../components/DlSection ";
import DrSection from "./DrSection";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Section = ({pageView, isEdit, originData}) => {

    const sessionId = sessionStorage.getItem('userId'); // -> tang 반환
    console.log(sessionId);

    return (
        <div className="Section">
            <TopLine />
            <div className="dMain">
                <div className="dM-l">
                    <DlSection text={"JinHyeong's Daily Life"}/>
                </div>
                <div className="dM-r">
                    <DrSection pageView={pageView} isEdit={isEdit} originData={originData}/>
                </div>
            </div>
            <Link to={"/login"}><Footer /></Link>
        </div>
    );

}

export default Section;