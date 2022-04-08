const DiaryView = ({likeDay, date}) => {

    const strDate = new Date().toLocaleDateString().slice(0,10);

    return (
        <div className="DiaryView">
            <div className="DV_inner">
                <div className="DV_inner_img">
                    {/* <img src={process.env.PUBLIC_URL + `assets/img/basic.jpg`} /> */}
                    <img src={process.env.PUBLIC_URL + `assets/img/basic.jpg`} />
                </div>
                <div className="DV_inner_info">
                    {likeDay === 0 ? <i className="fa-regular fa-heart unlikeDay_btn"></i> : <i className="fa-solid fa-heart likeDay_btn"></i> }
                    <div className="diary_date">{strDate}</div>
                </div>
            </div>
            <div className="DV_inner">
                <div className="DV_inner_content">
                    <p>내용</p>
                </div>
            </div>
        </div>
        
    );

}

export default DiaryView;