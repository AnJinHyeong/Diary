import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section";

const Home = () => {

    const navigate = useNavigate();
    const user = sessionStorage.getItem('userId');

    useEffect(() => {

        if(user === null){
            alert('로그인 후 이용이 가능합니다.');
            navigate('/', {replace: true});
        }

        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `DAILY DIARY`
    },[]);


    return (
        <div className="Home">
            <Section pageView={"list"} />
        </div>

    );

}

export default Home;