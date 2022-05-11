import React, { useState } from 'react';
import DiaryItem from './DiaryItem';

const DiaryList = ( { diaryList } ) => {

    const getProcessedDiaryList = () => {
        const sortedList = diaryList.sort((a,b) => parseInt(a.date) - parseInt(b.date));
        return sortedList;
    };

    return (
        <div className="DiaryList">
            {
                diaryList.length === 0 
                ? 
                <div className='diary-zero'>오늘 하루를 기록해 보세요..🌼</div>
                :    
                getProcessedDiaryList().map((it) => (
                    <DiaryItem key={it.id} id={it.id} content={it.content} emotion={it.emotion} date={it.date} likeDay={it.likeDay}/> 
                ))
            }
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList : [],
}

export default React.memo(DiaryList);