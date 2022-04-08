const DiaryButton = ({onClick, text}) => {

    return (
        <button onClick={onClick} className="DiaryButton">{text}</button>
    );

}

export default DiaryButton;