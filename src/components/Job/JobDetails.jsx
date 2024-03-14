import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [artical, setArtical] = useState(null);
  const navigateTo = useNavigate();
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    const fetchArtical = async () => {
      try {
        const response = await axios.get(`https://fec-backend-28yr.onrender.com/api/v2/artical/${id}`, {
          withCredentials: true,
        });
        setArtical(response.data.Artical);
      } catch (error) {
        console.error("Error fetching artical:", error);
        navigateTo("/notfound");
      }
    };

    fetchArtical();
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Article Details</h3>
        <div className="banner">
          {artical && (
            <>
              <p>Name: <span>{artical.name}</span></p>
              <p>Title: <span>{artical.title}</span></p>
              <p>Description: <span>{artical.description}</span></p>
              <p>Content: <span>{artical.content}</span></p>
              <p>Article Posted by: <span>{artical.postedBy}</span></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
