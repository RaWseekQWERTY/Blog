import React, { useState, useEffect } from "react";

import BlogListService from "../../services/BlogListService";
import Post from "../../components/post/Post";
import Loading from "../../components/loading/Loading";

import "./Article.css";

const Article = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (url) => {
        try {
            const response = await BlogListService(url);
            if (response) {
                setData(response);
                setLoading(false);
            } else {
                console.log("No response");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = (e) => {
        if (e.target.id === "next") {
            fetchData(data.next);
        } else {
            fetchData(data.previous);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="article-head">Articles</h1>
                    <div className="article">
                        {data.results ? (
                            data.results.map((post, index) => {
                                return (
                                    <Post
                                        post={post}
                                        key={post.id}
                                        id={post.id}
                                    />
                                );
                            })
                        ) : (
                            <p>No article</p>
                        )}
                    </div>

                    <div className="next">
                        <button onClick={handleClick} id="previous">
                            Previous
                        </button>
                        <button onClick={handleClick} id="next" s>
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default Article;
