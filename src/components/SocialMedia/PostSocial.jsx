import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import createToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostSocial = () => {
    const [title, setTitle] = useState("");

    const [name, setName] = useState("");
    const [links, setLinks] = useState("");
    const [images, setImages] = useState("");

    const { isAuthorized, user } = useContext(Context);
    // const handleJobPost = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const postData = {
    //             title: title,
    //             images: images,
    //             name: name,
    //             links: links,
    //             postedBy: user.id,
    //         };

    //         await axios
    //             .post(
    //                 "https://fec-backend-28yr.onrender.com/api/v3/socialmedia/social-post",
    //                 postData,
    //                 {
    //                     withCredentials: true,
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             )
    //             .then((res) => {
    //                 createToast(res.data.message, "success");
    //                 createToast("Job Posted Successfully", "success");

    //                 navigateTo("/job/getall");
    //             })
    //             .catch((err) => {
    //                 createToast(err.response.data.message, "error");
    //             });
    //     } catch (err) {
    //         console.error("Error posting job:", err);
    //         createToast("An error occurred while posting the job", "error");
    //     }
    // };

    const handleJobPost = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                throw new Error("User not authenticated");
            }
    
            const formData = new FormData();
            formData.append("title", title);
            formData.append("name", name);
            formData.append("links", links);
            formData.append("postedBy", user.id);
            formData.append("images", images); // Append file
    
            const response = await axios.post(
                "https://fec-backend-28yr.onrender.com/api/v3/socialmedia/social-post",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data", // Set content type for file upload
                    },
                }
            );
    
            createToast(response.data.message, "success");
            createToast("Job Posted Successfully", "success");
            navigateTo("/job/getall");
        } catch (error) {
            console.error("Error posting job:", error);
            createToast(error.response?.data?.message || "An error occurred while posting the job", "error");
        }
    };
    
    const navigateTo = useNavigate();
    if (!isAuthorized) {
        navigateTo("/");
    }

    return (
        <>
            <div className="job_post page">
                <div className="container">
                    <h3>New social Media Post</h3>
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
                            id="links"
                            placeholder="links"
                            value={links}
                            onChange={(e) => setLinks(e.target.value)}
                        />
                        <div>
                            <label
                            >
                                Select Image
                            </label>
                            <input
    type="file"
    id="images"
    accept=".jpg, .png"
    onChange={(e) => setImages(e.target.files[0])}
/>
                        </div>

                        <button type="submit">Create post</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostSocial;
