import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Socialmedia = () => {
  const [social, setSocial] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v3/socialmedia/social-get", {
          withCredentials: true,
        })
        .then((res) => {
          setSocial(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
    <div className="container">
      <h1>ALL AVAILABLE Apost</h1>
      <div className="banner">
        {social.map((element) => {
          return (
            <div className="card" key={element._id}>
              <p>{element.title}</p>
              <p>{element.links}</p>
              <Link to={`/Socialmedia/${element._id}`}>Social Details</Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default Socialmedia;