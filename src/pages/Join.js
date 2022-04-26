import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

const Join = () => {

    const { userJoin } = useContext(DiaryDispatchContext);

    const [joinName, setJoinName] = useState("");
    const [joinNick, setJoinNick] = useState("");
    const [joinId, setJoinId] = useState("");
    const [joinPw, setJoinPw] = useState("");

    const pwRef = useRef();
    const navigate = useNavigate();

    const nameCheck = () => {

        const regexName = /^[가-힣]{1,}$/;
        const nameP = document.getElementById('name_bottom');
        if(regexName.test(joinName)){
            console.log("확인");
            nameP.style.display = "none";   
        }
        else{
            console.log("확인 실패");
            nameP.style.display = "";
        }
    }

    const nickCheck = () => {
        
		const regexNick = /^[가-힣a-zA-Z0-9]{4,10}$/;
        const nickP = document.getElementById('nick_bottom');
        if(regexNick.test(joinNick)){
            console.log("확인");
            nickP.style.display = "none";   
        }
        else{
            console.log("확인 실패");
            nickP.style.display = "";
        }
    }

    const idCheck = () => {
        
		const regexId = /^[a-zA-Z0-9]{8,16}$/;
        const idP = document.getElementById('id_bottom');
        if(regexId.test(joinId)){
            console.log("확인");
            idP.style.display = "none";   
        }
        else{
            console.log("확인 실패");
            idP.style.display = "";
        }
    }


    const pwCheck = () => {
        
		const regexPw = /^[a-zA-Z0-9!@#$]{8,16}$/;
        const pwP = document.getElementById('pw_bottom');
        if(regexPw.test(joinPw)){
            console.log("확인");
            pwP.style.display = "none";   
        }
        else{
            console.log("확인 실패");
            pwP.style.display = "";
        }
    }

    const joinSubmit = () => {
        
        if(joinPw.length < 6){
            alert("비밀번호는 6자 이상으로 작성해주세요.");
            setJoinPw("");
            pwRef.current.focus();  
        }
        else{
            userJoin(joinName, joinNick, joinId, joinPw);
            navigate('/login', {replace: true})
        }

    }

    return (
        <div className="Join">
            <div className="inner_box">
                <div className="inner_title">
                    <h2>DAILY DIARY</h2>
                </div>
                <div className="inner_section">
                    <div className="is_box">
                        {/* <h3>회원가입 후 나의 일상을 작성해보세요.</h3> */}
                        <div className="input_box">
                            <label className="input_label">
                                <input type="text" placeholder="Name" onChange={(e) => setJoinName(e.target.value)} value={joinName} onBlur={nameCheck}/>
                                <p id="name_bottom" style={{display : 'none'}}>1글자 이상의 한글만 사용 가능합니다.</p>
                            </label>
                            <label className="input_label">
                                <input type="text" placeholder="NickName" onChange={(e) => setJoinNick(e.target.value)} value={joinNick} onBlur={nickCheck}/>
                                <p id="nick_bottom" style={{display : 'none'}}>4~10자의 한글,영어,숫자만 사용 가능합니다.</p>
                            </label>
                            <label className="input_label">
                                <input type="text" placeholder="ID" onChange={(e) => setJoinId(e.target.value)} value={joinId} onBlur={idCheck}/>
                                <p id="id_bottom" style={{display : 'none'}}>8~16자의 영어,숫자만 사용 가능합니다.</p>
                            </label>
                            <label className="input_label">
                                <input type="password" placeholder="Password" ref={pwRef} onChange={(e) => setJoinPw(e.target.value)} value={joinPw} onBlur={pwCheck} />
                                <p id="pw_bottom" style={{display : 'none'}}>8~16자의 영어,숫자,특수기호(!,@,#,$)만 사용 가능합니다.</p>
                            </label>
                            <button className="input_btn" onClick={joinSubmit}>Join</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inner_box2">
                <div className="inner_title2">
                    <h2 className="inner_txt">계정이 있으신가요? <Link to={"/login"}><span>Login</span></Link></h2>
                </div>
            </div>
        </div>
    );

}

export default Join;