import { Link } from "react-router-dom";

const Login = () => {

    return (
        <div className="Login">
            <div className="inner_box">
                <div className="inner_title">
                    <h2>DAILY DIARY</h2>
                </div>
                <div className="inner_section">
                    <div className="is_box">
                        <div className="input_box">
                            <label className="input_label">
                                <input type="text" placeholder="ID"/>
                            </label>
                            <label className="input_label">
                                <input type="password" placeholder="PASSWORD"/>
                            </label>
                            <button className="input_btn">Log in</button>
                        </div>
                    </div>
                </div>
                <div className="other_line">
                    <div className="other_left"></div>
                    <div className="other_center">other</div>
                    <div className="other_right"></div>
                </div>
                <div className="inner_bottom">
                    <ul>
                        <li>구글</li>
                        <li>페이스북</li>
                    </ul>
                </div>
            </div>
            <div className="inner_box2">
                <div className="inner_title2">
                    <h2 className="inner_txt">계정이 없으신가요? <Link to={"/join"}><span>Join us</span></Link></h2>
                </div>
            </div>
        </div>
    );

}

export default Login;