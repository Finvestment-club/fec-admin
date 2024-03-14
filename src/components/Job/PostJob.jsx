import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import createToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    // const [Likes, setLikes] = useState("");
    // const [postedBy, setPostedBy] = useState("");

    const { isAuthorized, user } = useContext(Context);

    // const handleJobPost = async (e) => {
    //     e.preventDefault();
    //     await axios
    //         .post(
    //             "http://localhost:5000/api/v2/artical/artical-post",

    //             title,
    //             description,
    //             name,
    //             content,
    //             postedBy: user._id

    //             {
    //                 withCredentials: true,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             createToast(res.data.message, "success");
    //             createToast("Job Posted Successfully", "success");

    //             navigateTo("/job/getall");
    //         })
    //         .catch((err) => {
    //             createToast(err.response.data.message, "error");
    //         });
    // };
    const handleJobPost = async (e) => {
      e.preventDefault();
      try {
          const postData = {
              title: title,
              description: description,
              name: name,
              content: content,
              postedBy: user._id
          };
  
          await axios.post(
              "http://localhost:5000/api/v2/artical/artical-post",
              postData,
              {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          )
          .then((res) => {
              createToast(res.data.message, "success");
              createToast("Job Posted Successfully", "success");
  
              navigateTo("/job/getall");
          })
          .catch((err) => {
              createToast(err.response.data.message, "error");
          });
      } catch (err) {
          console.error("Error posting job:", err);
          createToast("An error occurred while posting the job", "error");
      }
  };
  
    const navigateTo = useNavigate();
  if (!isAuthorized ) {
    navigateTo("/");
  }

    return (
        <>
            <div className="job_post page">
                <div className="container">
                    <h3>POST NEW Artical</h3>
                    <form onSubmit={handleJobPost}>
                        <input
                            type="text"
                            placeholder="Title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        
                        <input
                            type="text"
                            placeholder="Name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        
                        <input
                            type="text"
                            id="content"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <textarea
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Job Description"
                        />
                        <button type="submit">Create Artical</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostJob;

