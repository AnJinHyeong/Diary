import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import { firestore, auth, loginGoogle, loginFacebook } from "../firebase";

const Login = () => {


    const {userSession} = useContext(DiaryDispatchContext);
    const navigator = useNavigate();
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");

    const googleLoginBtn = () => {
        
        loginGoogle().then((result) => {
            sessionStorage.setItem('userId', result._tokenResponse.email.split('@')[0] + '[G]');
            sessionStorage.setItem('userNick', result._tokenResponse.email.split('@')[0] + '[G]');
            userSession();
            navigator('/home', {replace:true});
        });

    };

    const facebookLoginBtn = () => {
        
        loginFacebook().then((result) => {
            // console.log(result);
            sessionStorage.setItem('userId', result.user.email.split('@')[0] + '[F]');
            sessionStorage.setItem('userNick', result.user.email.split('@')[0] + '[F]');
            userSession();
            navigator('/home', {replace:true});
        });

    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'DAILY DIARY';
    },[]);

    const loginSubmit = () => {

        const users = firestore.collection("user");
        const userList = [];
        users.get().then((snapshot) => {
            
            if (snapshot) {
                snapshot.forEach((doc) => {
                    let docs = doc.data();
                    userList.push(docs);
                });

                const userCheck = userList.filter((it) => it.userId === loginId);

                if(userCheck.length > 0){
                    if(userCheck[0].userId === loginId && userCheck[0].userPw === loginPw){
                        sessionStorage.setItem('userId', userCheck[0].userId);
                        sessionStorage.setItem('userNick', userCheck[0].userNick);
                        userSession();
                        navigator('/home', {replace:true});
                    }
                    else{
                        alert("아이디와 비밀번호를 확인해주세요.");
                        setLoginId("");
                        setLoginPw("");
                    }
                }
                else {
                    alert("아이디와 비밀번호를 확인해주세요.");
                    setLoginId("");
                    setLoginPw("");
                }
            } 
        });
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
                                <input type="text" placeholder="ID" onChange={(e) => setLoginId(e.target.value)} value={loginId} />
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
                        <li><img src={process.env.PUBLIC_URL + 'assets/img/logo/google.jpeg'} className="other_logo" onClick={googleLoginBtn}/></li>
                        <li><img src={process.env.PUBLIC_URL + 'assets/img/logo/facebook.webp'} className="other_logo" onClick={facebookLoginBtn} /></li>
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