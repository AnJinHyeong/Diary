const DiaryDate = ({ leftChild, headText, rightChild}) => {

    return (
        <div className="DiaryDate">
            <div className="date_btn_left" >{leftChild}</div>
            <div className="date_text">{headText}</div>
            <div className="date_btn_right" >{rightChild}</div>
        </div>
    );

}

export default DiaryDate;