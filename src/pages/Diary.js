import { useParams } from "react-router-dom";
import Section from "../components/Section";

const Diary = () => {

    const {id} = useParams();
    console.log(id);
    
    return (
        <div className="Diary">
            <Section pageView={"diary"}/>
        </div>
    );

}

export default Diary;