import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

//COMPONENTS
import Sidebar from "../../components/globals/sidebar";
import Header from "../../components/globals/header";
import Modal from "../../components/Modal";

//STYLES
import './styles/page.css';

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
    }, []);

    //BUSCAR USUÁRIO
    function searchingFor(keyword) {
        return function(item) {              
            return item.title.toLowerCase().includes(keyword.toLowerCase()) || item.body.toLowerCase().includes(keyword.toLowerCase()) || !keyword;
        }
    }

    return (
        <section id="page">
            <Sidebar />
            <div className="main-content">
                <Header pageName="Usuários" />
                
                <div id="area-page">
                    <motion.div 
                    initial={{y:80, opacity:0.2}}
                    animate={{y:0, opacity:1}}
                    transition={{duration: 0.5}}
                    exit={{y: 20}}
                    className="container">
                        <h3>Postagens</h3>
                        
                        <div className="filter">
                            <input type="search" aria-label="Buscar usuário" value={keyword} onChange={(e)=>setKeyword(e.currentTarget.value)} placeholder="Buscar usuário" /> 
                        </div>

                        <div className="header">
                            <div className="item name">
                                <h4>Nome</h4>
                            </div>
                            <div className="item username">
                                <h4>Usuário</h4>
                            </div>
                            <div className="item email">
                                <h4>Email</h4>
                            </div>
                            <div className="item contact">
                                <h4>Contato</h4>
                            </div>
                            <div className="item about">
                                
                            </div>
                        </div>

                        <ul className="list-users">
                            {posts.filter(searchingFor(keyword)).map((item, index)=> {
                                return (
                                    <li key={index}>
                                        <div className="item name">
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="item username">
                                            <span>{item.username}</span>
                                        </div>
                                        <div className="item email">
                                            <span>{item.email}</span>
                                        </div>
                                        <div className="item contact">
                                            <span>{item.phone}</span>
                                        </div>
                                        <div className="item about">
                                            <button className="option" onClick={()=>{setTypeQuery('m');setModalPost(true);setPostId(item.id)}}><i class="fi fi-rr-document"></i></button>
                                            <button className="option highlighted" onClick={()=>{setModalUser(true);setUserId(item.id)}} ><span>Sobre</span></button>
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
        </section>
    )
}

export default Posts;