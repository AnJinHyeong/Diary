import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

const Footer = () => {

    const {userSession, reset} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const loginBtn = () => {
        sessionStorage.clear();
        reset();
        userSession();
        navigate('/', {replace: true});
    }

    return (
        <div className="Footer" onClick={loginBtn}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/file/exit.png`} />
        </div>
    );
    
}

export default Footer;