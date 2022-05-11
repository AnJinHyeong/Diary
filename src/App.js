import React, { useCallback, useEffect, useState } from 'react';
import { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/Diary.css';
import './css/Info.css'

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

import { firestore } from './firebase';


//다이어리 관리
const reducer = (state, action) => {

  let newState = [];

  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      firestore.collection("diary").doc(`diary-${action.data.userId}-${action.data.id}`).set({
        id : action.data.id,
        date : action.data.date,
        content : action.data.content,
        emotion : action.data.emotion,
        likeDay : action.data.likeDay,
        userId : action.data.userId
      });
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      firestore.collection("diary").doc(`diary-${action.data.userId}-${action.data.id}`).delete();

      newState = state.filter((it) => it.id !== action.data.id);
      break;
    }
    case 'EDIT' : {
      firestore.collection("diary").doc(`diary-${action.data.userId}-${action.data.id}`).set({
        id : action.data.id,
        date : action.data.date,
        content : action.data.content,
        emotion : action.data.emotion,
        likeDay : action.data.likeDay,
        userId : action.data.userId
      });
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    case 'ONLIKE' : {
      firestore.collection("diary").doc(`diary-${action.data.userId}-${action.data.id}`).set({
        id : action.data.id,
        date : action.data.date,
        content : action.data.content,
        emotion : action.data.emotion,
        likeDay : action.data.likeDay,
        userId : action.data.userId
      });

      newState = state.map((it) => it.id === action.data.id ? {...it, ...action.data} : it );
      break;
    }
    case 'OFFLIKE' :{
      firestore.collection("diary").doc(`diary-${action.data.userId}-${action.data.id}`).set({
        id : action.data.id,
        date : action.data.date,
        content : action.data.content,
        emotion : action.data.emotion,
        likeDay : action.data.likeDay,
        userId : action.data.userId
      });

      newState = state.map((it) => it.id === action.data.id ? {...it, ...action.data} : it);
      break;
    }
    case 'RESET' :{
      return newState = [];
    }
    default :
      return state;
  }

  return newState;
}

//회원 관리
const userReducer = (state, action) => {

  let newState = [];

  switch(action.type){
    case 'JOIN' : {
      firestore.collection("user").add({
        userSeq : action.data.userSeq,
        userId : action.data.userId,
        userPw : action.data.userPw,
        userNick : action.data.userNick,
        userName : action.data.userName,
      });
      newState = [action.data, ...state];
      break;
    }
    default :
      return state;
  }

  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export const UserDispatchContext = React.createContext();

function App() {

  const [userCheck, setUserCheck] = useState("");
  const [data, dispatch] = useReducer(reducer, []);
  const [userData, userDispatch] = useReducer(userReducer, []);
  const dataId = useRef(0);
  const userSeq = useRef(0);


  const userSession = () => {
    
    const sessionUser = sessionStorage.getItem('userId');
    if(sessionUser !== null){
      setUserCheck(sessionStorage.getItem('userId'));
    }
    else{
      setUserCheck("");
    }

  }



  async function diaryListDB(){
    let diaryList = [];
    const userId = sessionStorage.getItem('userId');
    const diarys = firestore.collection("diary").where("userId", "==", userId);

    await diarys.get().then(async (snapshot) => {

      if (snapshot) {
        snapshot.forEach((doc) => {
            let docs = doc.data();
            diaryList.push(docs);
        });

        if(diaryList.length > 0){
          diaryList.sort((a,b) => parseInt(b.id) - parseInt(a.id));
          dataId.current = diaryList[0].id + 1;
        }
        dispatch({type : "INIT", data : diaryList});
      }

    });

  }

  useEffect(() => {
      diaryListDB();
  },[]);

  useEffect(() => {
    if(userCheck.length > 0){
      diaryListDB();
    }
  },[userCheck]);


  //CREATE
  const onCreate = (date, content, emotion, likeDay, userId) => {
    dispatch({
      type : "CREATE", 
      data : {
        id : dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion,
        likeDay,
        userId
      },
    });
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (id, userId) => {
    dispatch({
      type : "REMOVE", 
      data : {
        id : id,
        userId : userId
      }
    });
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion, likeDay, userId) => {
    dispatch({
      type : "EDIT",
      data : { 
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
        likeDay,
        userId
      }
    });
  }
  //ONLIKE
  const onLike = (id,date,content,emotion, userId) => {
    dispatch({
      type : "ONLIKE",
      data : {
        id : Number(id),
        date : date,
        content : content,
        emotion : emotion,
        userId : userId,
        likeDay : 1
      }
    });
  }
  //OFFLIKE
  const offLike = (id,date,content,emotion, userId) => {
    dispatch({
      type : "OFFLIKE",
      data : {
        id : Number(id),
        date : date,
        content : content,
        emotion : emotion,
        userId : userId,
        likeDay : 0
      }
    });
  }
  //RESET
  const reset = () => {
    dispatch({type : "RESET"});
  }
  //JOIN
  const userJoin = (userName, userNick, userId, userPw) => {
    userDispatch({
      type : 'JOIN',
      data : {
        userSeq : userSeq.current,
        userName : userName,
        userNick : userNick,
        userId : userId,
        userPw : userPw
      }
    });
    userSeq.current += 1;
  }

  return (
    
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{reset ,userSession, onCreate, onRemove, onEdit, onLike, offLike, userJoin}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/join" element={<Join />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/new" element={<New />}/>
              <Route path='/diary/:id' element={<Diary />}/>
              <Route path="/edit/:id" element={<Edit />}/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>

  );
}

export default App;
