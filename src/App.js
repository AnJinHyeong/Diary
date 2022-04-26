import React from 'react';
import { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/Diary.css';
import './css/Info.css'

import { dummyData } from './data/Data';
import { userDummyData } from './data/UserData';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Edit from './pages/Edit';
import New from './pages/New';

import Diary from './pages/Diary';

const reducer = (state, action) => {

  let newState = [];

  switch(action.type){
    case 'INIT' : {
      return state.date;
    }
    case 'CREATE' : {
      // const newItem = {
      //   ...action.data
      // };
      // newState = [newItem, ...state];
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    case 'ONLIKE' : {
      newState = state.map((it) => it.id === action.data.id ? {...it, ...action.data} : it );
      break;
    }
    case 'OFFLIKE' :{
      newState = state.map((it) => it.id === action.data.id ? {...it, ...action.data} : it);
      break;
    }
    default :
      return state;
  }
  return newState;
}

const userReducer = (state, action) => {

  let newState = [];

  switch(action.type){
    case 'INIT' : {
      return state.date;
    }
    case 'JOIN' : {
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

  const [data, dispatch] = useReducer(reducer, dummyData);
  const [userData, userDispatch] = useReducer(userReducer, userDummyData);
  const dataId = useRef(0);
  const userSeq = useRef(3);

  //CREATE
  const onCreate = (date, content, emotion, likeDay) => {
    dispatch({
      type : "CREATE", 
      data : {
        id : dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion,
        likeDay
      },
    });
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type : "REMOVE", targetId});
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion, likeDay) => {
    dispatch({
      type : "EDIT",
      data : { 
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
        likeDay
      }
    });
  }
  //ONLIKE
  const onLike = (targetId) => {
    dispatch({
      type : "ONLIKE",
      data : {
        id : Number(targetId),
        likeDay : 1
      }
    });
  }
  //OFFLIKE
  const offLike = (targetId) => {
    dispatch({
      type : "OFFLIKE",
      data : {
        id : Number(targetId),
        likeDay : 0
      }
    });
  }
  //JOIN
  const userJoin = (uName, uNick, uId, uPw) => {
    userDispatch({
      type : 'JOIN',
      data : {
        seq : userSeq.current,
        uName : uName,
        uNick : uNick,
        uId : uId,
        uPw : uPw
      }
    });
    userSeq.current += 1;
  }

  return (
    
    <UserDispatchContext.Provider value={userData}>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit, onLike, offLike, userJoin}}>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/join" element={<Join />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/new" element={<New />}/>
                <Route path='/diary/:id' element={<Diary />}/>
                <Route path="/edit/:id" element={<Edit />}/>
              </Routes>
            </div>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export default App;
