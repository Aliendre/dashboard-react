import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

//API
import api from "../../api";

//STYLE
import './styles/dashboard.css'
import './styles/responsive-dashboard.css'

//COMPONENTS
import Ranking from "./components/ranking";
import Users from "./components/users";
import Posts from "./components/posts";
import Modal from "../../components/Modal";
import Header from "../../components/globals/header";
import Sidebar from "../../components/globals/sidebar";
import Cards from "./components/cards";

function Dashboard() {

    //STATES
    //DATA
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [persistPosts, setpersistPosts] = useState([]);
    //PARAMS
    const [filterId, setFilterId] = useState(null);
    const [typeFilter, setTypeFilter] = useState('p');
    const [typeQuery, setTypeQuery] = useState('s');
    const [postId, setPostId] = useState(null);
    const [userId, setUserId] = useState(null);
    //BOOLEANS
    const [modalUser, setModalUser] = useState(false);
    const [modalComments, setModalComments] = useState(false);
    const [modalPost, setModalPost] = useState(false)
    //FILTER
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        api.get("/users")
        .then((response) => {
            setUsers(response.data);
        })
        .catch((err) => {
            console.error("falha ao obter lista de usuários: " + err);
            toast.error('falha ao obter lista de postagens', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }, []);

    useEffect(() => {
        if (typeFilter==='p') {
            api.get(filterId>0 ? `/posts?userId=${filterId}` : '/posts')
                .then((response) => {
                    setPosts(response.data);
                    if (persistPosts.length === 0) {
                        setpersistPosts(response.data)
                    }
                })
                .catch((err) => {
                    console.error("falha ao obter lista de postagens: " + err);
                    toast.error('falha ao obter lista de postagens', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            });
        } else {
            api.get('/comments')
                .then((response) => {
                    setComments(response.data);
                })
                .catch((err) => {
                    console.error("falha ao obter lista de comentários: " + err);
                    toast.error('falha ao obter lista de comentários', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            });
        }

    }, [filterId, typeFilter]);


    return (
        <section id="page">
            <Sidebar />
            <div className="main-content">
                <Header pageName="Dashboard" />
                <div id="area-containers">
                    <div className="bigger-block">
                        <div className="cards-data">
                            <Cards amountUsers={users.length} amountPosts={posts.length} amountComments={comments.length===0?500:comments.length} />
                        </div>

                        <Posts 
                            posts={typeFilter==='p'?posts:comments} 
                            users={users} 
                            filterId={filterId}
                            setFilterId={setFilterId} 
                            keyword={keyword} 
                            setKeyword={setKeyword} 
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            setModalComments={setModalComments}
                            setModalPost={setModalPost}
                            setPostId={setPostId}
                            setTypeQuery={setTypeQuery}
                        />

                    </div>
                    <div className="smaller-block">
                        <Users users={users} setModalUser={setModalUser} setUserId={setUserId} setModalPost={setModalPost} setPostId={setPostId} setTypeQuery={setTypeQuery} />
                        <Ranking users={users} posts={persistPosts} setModalUser={setModalUser} setUserId={setUserId} />
                    </div>
                </div>
            </div>

            <Modal 
                open={modalUser} 
                trigger={setModalUser}
                type="user"
                size="medium"
                userId={userId}
            />
            <Modal 
                open={modalComments} 
                trigger={setModalComments}
                type="comments"
                size="medium"
                postId={postId}
                typeQuery={'s'}
            />
            <Modal 
                open={modalPost} 
                trigger={setModalPost}
                type="posts"
                size="medium"
                postId={postId}
                typeQuery={typeQuery}
            />

            <ToastContainer theme="colored" />
        </section>
    )
}

export default Dashboard;