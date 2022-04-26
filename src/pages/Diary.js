import { useParams } from "react-router-dom";
import Section from "../components/Section";

const Diary = () => {

    return (
        <div className="Diary">
            <Section pageView={"diary"}/>
        </div>
    );

}

export default Diary;