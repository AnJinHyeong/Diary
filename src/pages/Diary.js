import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from "../components/Section";

const Diary = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const user = sessionStorage.getItem('userId');

    useEffect(() => {
        if(user === null){
            alert('로그인 후 이용이 가능합니다.');
            navigate('/', {replace: true});
        }

        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `DAILY DIARY - ${id} diary`
    },[])

    return (
        <div className="Diary">
            <Section pageView={"diary"}/>
        </div>
    );

}

export default Diary;