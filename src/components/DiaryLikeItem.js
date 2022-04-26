import { useNavigate } from "react-router-dom";
import { getStringDate } from "../utils/date";

const DiaryLikeItem = ({id, date, content}) => {

    const navigate = useNavigate();

    const goDiary = () => {
        navigate(`/diary/${id}`)
    }

    return (
        <>
            <li onClick={() => goDiary()}><span>{getStringDate(new Date(date))}</span> <p>{content}</p></li>
        </>
    );

}

export default DiaryLikeItem;