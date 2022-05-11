import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import { firestore } from "../firebase";

const Join = () => {

    const { userJoin } = useContext(DiaryDispatchContext);

    const [joinName, setJoinName] = useState("");
    const [joinNick, setJoinNick] = useState("");
    const [joinId, setJoinId] = useState("");
    const [joinPw, setJoinPw] = useState("");
    
    const pwRef = useRef();
    const idRef = useRef();
    const nameRef = useRef();
    const nickRef = useRef();
    const navigate = useNavigate();

    const regexName = /^[가-힣]{1,}$/;
    const regexNick = /^[가-힣a-zA-Z0-9]{4,10}$/;
    const regexId = /^[a-zA-Z0-9]{8,16}$/;
    const regexPw = /^[a-zA-Z0-9!@#$]{8,16}$/;


    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'DAILY DIARY';
    },[]);

    //Name Check
    const nameCheck = () => {

        const nameP = document.getElementById('name_bottom');
        if(regexName.test(joinName)){
            nameP.style.display = "none";
        }
        else{
            nameP.style.display = "";
        }
    }

    //NickName Check
    const nickCheck = () => {
        
        const nickP = document.getElementById('nick_bottom');
        if(regexNick.test(joinNick)){
            nickP.style.display = "none";   
        }
        else{
            nickP.style.display = "";
        }
    }

    //ID Check
    const idCheck = () => {
        
        const idP = document.getElementById('id_bottom');
        if(regexId.test(joinId)){
            idP.style.display = "none";
        }
        else{
            idP.style.display = "";
        }
    }

    //PW Check
    const pwCheck = () => {
        
        const pwP = document.getElementById('pw_bottom');
        if(regexPw.test(joinPw)){
            pwP.style.display = "none"; 
        }
        else{
            pwP.style.display = "";
        }
    }

    const joinSubmit = () => {
        if(!regexName.test(joinName)){
            alert("이름을 확인해주세요");
            setJoinName("");
            nameRef.current.focus(); 
        }
        else if(!regexNick.test(joinNick)){
            alert("닉네임을 확인해주세요");
            setJoinNick("");
            nickRef.current.focus(); 
        }
        else if(!regexId.test(joinId)){
            alert("아이디를 확인해주세요");
            setJoinId("");
            idRef.current.focus(); 
        }
        else if(!regexPw.test(joinPw)){
            alert("비밀번호를 확인해주세요.");
            setJoinPw("");
            pwRef.current.focus();  
        }
        else{
            const users = firestore.collection("user");
            const userList = [];
            users.get().then((snapshot) => {
                
                if (snapshot) {
                    snapshot.forEach((doc) => {
                        let docs = doc.data();
                        userList.push(docs);
                    });
                    
                    if(userList.filter((it) => it.userId === joinId).length > 0){
                        alert("해당 아이디는 사용중입니다.");
                        idRef.current.focus();
        
                    } else {
                        userJoin(joinName, joinNick, joinId, joinPw);
                        navigate('/', {replace: true})
                    }
                } 
            });
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
                        <div className="input_box" >
                            <label className="input_label">
                                <input type="text" placeholder="Name" ref={nameRef} onChange={(e) => setJoinName(e.target.value)} value={joinName} onBlur={nameCheck}/>
                                <p id="name_bottom" style={{display : 'none'}}>1글자 이상의 한글만 사용 가능합니다.</p>
                            </label>
                            <label className="input_label">
                                <input type="text" placeholder="NickName" ref={nickRef} onChange={(e) => setJoinNick(e.target.value)} value={joinNick} onBlur={nickCheck}/>
                                <p id="nick_bottom" style={{display : 'none'}}>4~10자의 한글,영어,숫자만 사용 가능합니다.</p>
                            </label>
                            <label className="input_label">
                                <input type="text" placeholder="ID" ref={idRef} onChange={(e) => setJoinId(e.target.value)} value={joinId} onBlur={idCheck}/>
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
                    <h2 className="inner_txt">계정이 있으신가요?<span onClick={() => navigate('/')}>Login</span></h2>
                </div>
            </div>
        </div>
    );

}

export default Join;