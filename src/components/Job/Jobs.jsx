import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [article, setArticle] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v2/artical/artical-get", {
          withCredentials: true,
        })
        .then((res) => {
          setArticle(res.data);
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
      <h1>ALL AVAILABLE ARTICLES</h1>
      <div className="banner">
        {article.map((element) => {
          return (
            <div className="card" key={element._id}>
              <p>{element.title}</p>
              <p>{element.description}</p>
              <Link to={`/job/${element._id}`}>Article Details</Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default Jobs;