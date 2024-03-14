import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const SocialDetails = () => {
  const { id } = useParams();
  const [social, setSocial] = useState(null);
  const navigateTo = useNavigate();
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    const fetchArtical = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v3/socialmedia/${id}`, {
          withCredentials: true,
        });
        setSocial(response.data.Social);
      } catch (error) {
        console.error("Error fetching social:", error);
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
        <h3>social Post Details</h3>
        <div className="banner">
          {social && (
            <>
              <p>Name: <span>{social.name}</span></p>
              <p>Title: <span>{social.title}</span></p>
              <p>Links <span>{social.links}</span></p>
              <p>Sociam media post Posted by: <span>{social.postedBy}</span></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialDetails;
