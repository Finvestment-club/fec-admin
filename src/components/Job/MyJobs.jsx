import axios from "axios";
import { useContext, useEffect, useState } from "react";
import createToast from "../../utils/toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
    const [articles, setArticles] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();
    
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/v2/artical/articleMy",
                    { withCredentials: true }
                );
                setArticles(data.article);
            } catch (error) {
                createToast(error.response?.data?.message || "Failed to fetch articles", "error");
                setArticles([]);
            }
        };
        fetchArticles();
    }, []);

    const handleEnableEdit = (_articleId) => {
        setEditingMode(_articleId);
    };

    const handleDisableEdit = () => {
        setEditingMode(null);
    };

    const handleUpdateArticle = async (_articleId, updatedData) => {
        try {
            await axios.put(
                `http://localhost:5000/api/v2/artical/artical-update/${_articleId}`,
                updatedData,
                { withCredentials: true }
            );
            createToast("Article updated successfully", "success");
            setEditingMode(null);
        } catch (error) {
            createToast(error.response?.data?.message || "Failed to update article", "error");
        }
    };

    const handleDeleteArticle = async (_articleId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/v2/artical/artical-delete/${_articleId}`,
                { withCredentials: true }
            );
            createToast("Article deleted successfully", "success");
            // Filter out the deleted article from the state
            setArticles(prevArticles =>
                prevArticles.filter(article => article._id !== _articleId)
            );
        } catch (error) {
            createToast(error.response?.data?.message || "Failed to delete article", "error");
        }
    };
    

    const handleInputChange = (_articleId, field, value) => {
        setArticles(prevArticles =>
            prevArticles.map(article =>
                article._id === _articleId ? { ...article, [field]: value } : article
            )
        );
    };

    return (
        <div className="myJobs page">
            <div className="container">
                <h1>Your Posted Articles</h1>
                {articles.length > 0 ? (
                    <div className="banner">
                        {articles.map(article => (
                            <div className="card" key={article._id}>
                                <div className="content">
                                    <div className="short_fields">
                                        <div>
                                            <span>Title:</span>
                                            <input
                                                type="text"
                                                disabled={editingMode !== article._id}
                                                value={article.title}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        article._id,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="long_field">
                                        <div>
                                            <span>Description:</span>{" "}
                                            <textarea
                                                rows={5}
                                                value={article.description}
                                                disabled={editingMode !== article._id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        article._id,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="long_field">
                                        <div>
                                            <span>Content:</span>{" "}
                                            <textarea
                                                rows={5}
                                                value={article.content}
                                                disabled={editingMode !== article._id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        article._id,
                                                        "content",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    <div className="edit_btn_wrapper">
                                        {editingMode === article._id ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleUpdateArticle(article._id, {
                                                            title: article.title,
                                                            description: article.description
                                                        })
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
                                                onClick={() => handleEnableEdit(article._id)}
                                                className="edit_btn"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteArticle(article._id)}
                                        className="delete_btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You've not posted any articles or may be you deleted all of your articles!</p>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
