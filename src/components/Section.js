import TopLine from "../components/TopLine";
import DlSection from "../components/DlSection ";
import DrSection from "./DrSection";
import Footer from "./Footer";

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
            <Footer />
        </div>
    );

}

export default Section;