import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/Diary.css';
import './css/Info.css'

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Edit from './pages/Edit';
import New from './pages/New';
import { useReducer, useRef } from 'react';
import Diary from './pages/Diary';

const reducer = (state, action) => {

  let newState = [];
  switch(action.type){
    case 'INIT':{
      return state.date;
    }
    case 'CREATE' :{
      // const newItem = {
      //   ...action.data
      // };
      // newState = [newItem, ...state];

      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' :{
      newState = state.map((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default :
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id : 1,
    emotion : 1,
    content : "오늘의일기 1번  오늘의일기 오늘의일기오늘의일기오늘의일기오늘의일기 ㅍ 오늘의일기 오늘의일기 오늘의일기 오늘의일기 오늘의일기 오늘의일기 오늘의일기",
    date : 1649239006617,
    likeday : 1,
  },
  {
    id : 2,
    emotion : 2,
    content : "오늘의일기 2번 daslkdnaskjdnj 아닞 니짜 이건 아니지 않냐교 너무 어렵잖아 나 좀 살 려줘",
    date : 1649239006618,
    likeday : 0,
  },
  {
    id : 3,
    emotion : 3,
    content : "오늘의일기 3번",
    date : 1649239006619,
    likeday : 1,
  },
  {
    id : 4,
    emotion : 4,
    content : "오늘의일기 4번",
    date : 1649239006620,
    likeday : 0,
  },
  {
    id : 5,
    emotion : 5,
    content : "오늘의일기 5번",
    date : 1649239006621,
    likeday : 0,
  },
  {
    id : 6,
    emotion : 1,
    content : "오늘의일기 6번",
    date : 1649239006622,
    likeday : 0,
  },
  {
    id : 7,
    emotion : 2,
    content : "오늘의일기 7번",
    date : 1649239006623,
    likeday : 0,
  },
  {
    id : 8,
    emotion : 5,
    content : "오늘의일기 8번",
    date : 1649239006624,
    likeday : 0,
  },
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content, emotion, likeday) => {
    dispatch({
      type : "CREATE", 
      data : {
        id : dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion,
        likeday
      },
    });
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type : "REMOVE", targetId});
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion, likeday) => {
    dispatch({
      type : "EDIT",
      data : { 
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
        likeday
      }
    });
  }

  return (
    
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
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
  );
}

export default App;
