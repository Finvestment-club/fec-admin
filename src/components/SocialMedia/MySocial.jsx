import axios from "axios";
import { useContext, useEffect, useState } from "react";
import createToast from "../../utils/toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import Images from "./image";

const MySocial = () => {
    const [social, setSocial] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const { isAuthorized, user } = useContext(Context);
    const [ImageUrl, setImageUrl] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await axios.get(
                    "https://fec-backend-28yr.onrender.com/api/v3/socialmedia/my-social",
                    { withCredentials: true }
                );
                setSocial(data.Social);
            } catch (error) {
                createToast(
                    error.response?.data?.message || "Failed to fetch articles",
                    "error"
                );
                setSocial([]);
            }
        };
        fetchArticles();
    }, []);

    const handleEnableEdit = (_socialId) => {
        setEditingMode(_socialId);
    };

    const handleDisableEdit = () => {
        setEditingMode(null);
    };

    const handleUpdateArticle = async (_socialId, updatedData) => {
        try {
            await axios.put(
                `https://fec-backend-28yr.onrender.com/api/v3/socialmedia/social-update/${_socialId}`,
                updatedData,
                { withCredentials: true }
            );
            createToast("Article updated successfully", "success");
            setEditingMode(null);
        } catch (error) {
            createToast(
                error.response?.data?.message || "Failed to update article",
                "error"
            );
        }
    };

    const handleDeleteArticle = async (_socialId) => {
        try {
            await axios.delete(
                `https://fec-backend-28yr.onrender.com/api/v3/socialmedia/social-delete/${_socialId}`,
                { withCredentials: true }
            );
            createToast("Article deleted successfully", "success");
            // Filter out the deleted article from the state
            setSocial((prevArticles) =>
                prevArticles.filter((social) => social._id !== _socialId)
            );
        } catch (error) {
            createToast(
                error.response?.data?.message || "Failed to delete article",
                "error"
            );
        }
    };

    const handleInputChange = (_socialId, field, value) => {
        setSocial((prevArticles) =>
            prevArticles.map((social) =>
                social._id === _socialId
                    ? { ...social, [field]: value }
                    : social
            )
        );
    };
    const openModal = (imageUrl) => {
        setImageUrl(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="myJobs page">
            <div className="container">
                <h1>You Posted this social media Post</h1>
                {social.length > 0 ? (
                    <div className="banner">
                        {social.map((social) => (
                            <div className="card" key={social._id}>
                                <div className="content">
                                    <div className="short_fields">
                                        <div>
                                            <span>Title:</span>
                                            <input
                                                type="text"
                                                disabled={
                                                    editingMode !== social._id
                                                }
                                                value={social.title}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        social._id,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="long_field">
                                        <span>Links:</span>
                                        <textarea
                                            disabled={
                                                editingMode !== social._id
                                            }
                                            value={social.links}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    social._id,
                                                    "links",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="long_field">
                                        <span>Name:</span>
                                        <textarea
                                            disabled={
                                                editingMode !== social._id
                                            }
                                            value={social.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    social._id,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="long_field">
                                        <span>images:</span>

                                        <textarea
                                            disabled={
                                                editingMode !== social._id
                                            }
                                            value={social.images}
                                            openModal={openModal}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    social._id,
                                                    "images",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="edit_btn_wrapper">
                                        {editingMode === social._id ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleUpdateArticle(
                                                            social._id,
                                                            {
                                                                title: social.title,
                                                                links: social.links,
                                                                name: social.name,
                                                                images: social.images,
                                                            }
                                                        )
                                                    }
                                                    className="check_btn"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={handleDisableEdit}
                                                    className="cross_btn"
                                                >
                                                    <RxCross2 />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleEnableEdit(social._id)
                                                }
                                                className="edit_btn"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeleteArticle(social._id)
                                        }
                                        className="delete_btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>
                        You've not posted any articles or may be you deleted all
                        of your articles!
                    </p>
                )}
                {modalOpen && (
                    <ResumeModal
                        imageUrl={resumeImageUrl}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default MySocial;
