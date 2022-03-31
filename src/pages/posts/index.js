import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

//COMPONENTS
import Sidebar from "../../components/globals/sidebar";
import Header from "../../components/globals/header";
import Modal from "../../components/Modal";

//STYLES
import './styles/page.css';
import './styles/responsive-page.css';

//API
import api from "../../api";

function Posts() {

    //STATE
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([])
    const [keyword, setKeyword] = useState('');
    //BOOLEANS
    const [modalUser, setModalUser] = useState(false);
    const [modalPost, setModalPost] = useState(false);
    const [modalComments, setModalComments] = useState(false);
    //PARAMS
    const [postId, setPostId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [typeQuery, setTypeQuery] = useState('s');


    useEffect(() => {
        api.get("/posts")
        .then((response) => {
            setPosts(response.data);
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
        api.get("/users")
        .then((response) => {
            setUsers(response.data);
        })
        .catch((err) => {
            console.error("falha ao obter lista de usuários: " + err);
            toast.error('falha ao obter lista de usuários', {
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

    //BUSCAR USUÁRIO
    function searchingFor(keyword) {
        return function(item) {              
            return item.title.toLowerCase().includes(keyword.toLowerCase()) || item.body.toLowerCase().includes(keyword.toLowerCase()) || !keyword;
        }
    }

    function getUser(keyword) {
        return function(item) { 
            if (item.id === keyword) {
                return item
            }             
        }
    }

    return (
        <section id="page">
            <Sidebar />
            <div className="main-content">
                <Header pageName="Postagens" />
                
                <div id="area-page">
                    <motion.div 
                    initial={{y:80, opacity:0.2}}
                    animate={{y:0, opacity:1}}
                    transition={{duration: 0.5}}
                    exit={{y: 20}}
                    className="container posts">
                        <h3>Postagens</h3>
                        
                        <div className="filter">
                            <input type="search" aria-label="Buscar postagem" value={keyword} onChange={(e)=>setKeyword(e.currentTarget.value)} placeholder="Buscar postagem" /> 
                        </div>

                        <div className="header posts">
                            <div className="item title">
                                <h4>Titulo</h4>
                            </div>
                            <div className="item post">
                                <h4>Postagem</h4>
                            </div>
                            <div className="item author">
                                <h4>Autor</h4>
                            </div>
                            <div className="item about">
                                
                            </div>
                        </div>

                        <ul className="list-users">
                            {posts.filter(searchingFor(keyword)).map((item, index)=> {
                                return (
                                    <li key={index}>
                                        <div className="item title">
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="item post">
                                            <span>{item.body}</span>
                                        </div>
                                        <div className="item author">
                                        {users.filter(getUser(item.userId)).map(({username})=>{
                                            return <p>{username}</p>
                                        })}
                                        </div>
                                        <div className="item about">
                                            {/* <button className="option" onClick={()=>{setTypeQuery('m');setModalPost(true);setPostId(item.id)}}><i class="fi fi-rr-document"></i></button> */}
                                            <button className="option highlighted" onClick={()=>{setModalComments(true);setPostId(item.id)}} ><span>Comentários</span></button>
                                        </div>
                                    </li>
                                )
                            })}
                            
                        </ul>

                    </motion.div>
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
                open={modalPost} 
                trigger={setModalPost}
                type="posts"
                size="medium"
                postId={postId}
                typeQuery={typeQuery}
            />
            <Modal 
                open={modalComments} 
                trigger={setModalComments}
                type="comments"
                size="medium"
                postId={postId}
                typeQuery={'s'}
            />
        </section>
    )
}

export default Posts;