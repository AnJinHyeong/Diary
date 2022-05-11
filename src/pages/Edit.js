import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import Section from "../components/Section";

const Edit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();
    const user = sessionStorage.getItem('userId');

    useEffect(() => {
      const titleElement = document.getElementsByTagName('title')[0];
      titleElement.innerHTML = `DAILY DIARY - ${id} diary edit`
    },[]);

    useEffect(() => {

        if(user === null){
            alert('로그인 후 이용이 가능합니다.');
            navigate('/', {replace: true});
        }
    
        if(diaryList.length >= 1){
          const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

          if(targetDiary){
            setOriginData(targetDiary);
          } else {
            alert("없는 일기 입니다.");
            navigate('/home', {replace : true});
          }
        }
    
    }, [id, diaryList]);
    
    return (
        <div className="Edit">
            {originData && <Section pageView={"edit"} isEdit={true} originData={originData} />}
        </div>
    );

}

export default Edit;