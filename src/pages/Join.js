import { Link } from "react-router-dom";

const Join = () => {

    return (
        <div className="Join">
            <div className="inner_box">
                <div className="inner_title">
                    <h2>DAILY DIARY</h2>
                </div>
                <div className="inner_section">
                    <div className="is_box">
                        {/* <h3>회원가입 후 나의 일상을 작성해보세요.</h3> */}
                        <div className="input_box">
                            <label className="input_label">
                                <input type="text" placeholder="Name"/>
                            </label>
                            <label className="input_label">
                                <input type="text" placeholder="NickName"/>
                            </label>
                            <label className="input_label">
                                <input type="text" placeholder="ID"/>
                            </label>
                            <label className="input_label">
                                <input type="password" placeholder="Password"/>
                            </label>
                            <label className="input_label">
                                <input type="password" placeholder="Re-Password"/>
                            </label>
                            <button className="input_btn">Join</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inner_box2">
                <div className="inner_title2">
                    <h2 className="inner_txt">계정이 있으신가요? <Link to={"/login"}><span>Login</span></Link></h2>
                </div>
            </div>
        </div>
    );

}

export default Join;