import { useState } from 'react';
import DiaryItem from './DiaryItem';

// const ControlMenu = ({value,onChange,optionList}) => {
//     return (
//         <div></div>
//     );
// }

const DiaryList = ( { diaryList } ) => {

    // const [sortType, setSortType] = useState('lastest');

    return (
        <div className="DiaryList">
            {diaryList.map((it) => (
                <DiaryItem key={it.id} id={it.id} content={it.content} emotion={it.emotion} date={it.date} likeday={it.likeday}/>
            ))}
        </div>
    );

}

DiaryList.defaultProps = {
    diaryList : [],
}

export default DiaryList;