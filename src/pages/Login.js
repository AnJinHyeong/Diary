import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../App";

const Login = () => {

    const userList = useContext(UserDispatchContext);

    const navigator = useNavigate();
    const idRef = useRef();
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");
    
    const loginSubmit = () => {

        const userCheck = userList.filter((it) => it.uId === loginId);
        
        if(userCheck.length > 0){
            if(userCheck[0].uId === loginId && userCheck[0].uPw === loginPw){
                sessionStorage.getItem('userId',loginId);
                sessionStorage.getItem('userId');
                navigator('/', {replace:true});
            }
        }
        else {
            alert("아이디와 비밀번호를 확인해주세요.");
            setLoginId("");
            setLoginPw("");
        }
    }

    return (
        <div className="Login">
            <div className="inner_box">
                <div className="inner_title">
                    <h2>DAILY DIARY</h2>
                </div>
                <div className="inner_section">
                    <div className="is_box">
                        <div className="input_box">
                            <label className="input_label">
                                <input type="text" placeholder="ID" ref={idRef} onChange={(e) => setLoginId(e.target.value)} value={loginId} />
                            </label>
                            <label className="input_label">
                                <input type="password" placeholder="PASSWORD" onChange={(e) => setLoginPw(e.target.value)} value={loginPw} />
                            </label>
                            <button className="input_btn" onClick={loginSubmit}>Log in</button>
                        </div>
                    </div>
                </div>
                <div className="other_line">
                    <div className="other_left"></div>
                    <div className="other_center">other</div>
                    <div className="other_right"></div>
                </div>
                <div className="inner_bottom">
                    <ul>
                        <li>구글</li>
                        <li>페이스북</li>
                    </ul>
                </div>
            </div>
            <div className="inner_box2">
                <div className="inner_title2">
                    <h2 className="inner_txt">계정이 없으신가요? <Link to={"/join"}><span>Join us</span></Link></h2>
                </div>
            </div>
        </div>
    );

}

export default Login;