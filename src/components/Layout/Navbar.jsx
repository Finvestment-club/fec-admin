import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import createToast from "../../utils/toast";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/user/logout",
                {
                    withCredentials: true,
                }
            );
            createToast(response.data.message, "success");
            setIsAuthorized(false);
            navigateTo("/login");
        } catch (error) {
            createToast(error.response.data.message, "error"),
                setIsAuthorized(true);
        }
    };

    return (
        <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
            <div className="container">
                <div className="logo">
                    <img src="./images/logo.png" alt="logos" />
                </div>
                <ul className={!show ? "menu" : "show-menu menu"}>
                    {/* <li>
                        <Link to={"/"} onClick={() => setShow(false)}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to={"/job/getall"} onClick={() => setShow(false)}>
                            ALL Article
                        </Link>
                    </li>
                    <li>
                        <Link to={"/job/post"} onClick={() => setShow(false)}>
                            POST NEW Article
                        </Link>
                    </li>
                    <li>
                        <Link to={"/job/me"} onClick={() => setShow(false)}>
                            VIEW YOUR Article
                        </Link>
                    </li> */}
                    <div className="aaaa">


                    <li className="dropbtn">
                        article
                        <div class="dropdown-content">
                        <li><Link to={"/job/getall"} onClick={() => setShow(false)}>
                            ALL Article
                        </Link></li>
                            <li >
                            <Link to={"/job/post"} onClick={() => setShow(false)}>
                            POST NEW Article
                        </Link>
                            </li>
                            <li>
                            <Link to={"/job/me"} onClick={() => setShow(false)}>
                            VIEW YOUR Article
                        </Link>
                            </li>
                        </div>
                    </li>
                    </div>
                    <div className="dddd">

                    <li className="dropbtn-2">
                        Social Media post
                        <div class="dropdown-content-2">
                        <li><Link to={"/Social/getall"} onClick={() => setShow(false)}>
                            ALL Social Media post
                        </Link></li>
                            <li >
                            <Link to={"/Social/post"} onClick={() => setShow(false)}>
                            POST NEW Social Media post
                        </Link>
                            </li>
                            <li>
                            <Link to={"/Social/me"} onClick={() => setShow(false)}>
                            VIEW YOUR Social Media post
                        </Link>
                            </li>
                        </div>
                    </li>
                    </div>
                    <div className="nnnn">


                    <li className="dropbtn-3">
                        News
                        <div class="dropdown-content-3">
                        <li><Link to={"/News/getall"} onClick={() => setShow(false)}>
                            ALL News
                        </Link></li>
                            <li >
                            <Link to={"/News/post"} onClick={() => setShow(false)}>
                            POST NEW News
                        </Link>
                            </li>
                            <li>
                            <Link to={"/News/me"} onClick={() => setShow(false)}>
                            VIEW YOUR News
                        </Link>
                            </li>
                        </div>
                    </li>
                    </div>

                    <button onClick={handleLogout}>LOGOUT</button>
                </ul>
                <div className="hamburger">
                    <GiHamburgerMenu onClick={() => setShow(!show)} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
