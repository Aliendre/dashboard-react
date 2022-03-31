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

function Comments() {

    //STATE
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState('');
    //BOOLEANS
    const [modalUser, setModalUser] = useState(false);
    const [modalPost, setModalPost] = useState(false);
    //PARAMS
    const [postId, setPostId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [typeQuery, setTypeQuery] = useState('s');


    useEffect(() => {
        api.get("/comments")
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

    //BUSCAR USUÁRIO
    function searchingFor(keyword) {
        return function(item) {              
            return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.username.toLowerCase().includes(keyword.toLowerCase()) || item.email.toLowerCase().includes(keyword.toLowerCase()) || !keyword;
        }
    }

    return (
        <section id="page">
            <Sidebar />
            <div className="main-content">
                <Header pageName="Comentários" />
                
                <div id="area-page">
                    <motion.div 
                    initial={{y:80, opacity:0.2}}
                    animate={{y:0, opacity:1}}
                    transition={{duration: 0.5}}
                    exit={{y: 20}}
                    className="container">
                        <h3>Comentários</h3>
                        
                        <div className="filter">
                            <input type="search" aria-label="Buscar comentários" value={keyword} onChange={(e)=>setKeyword(e.currentTarget.value)} placeholder="Buscar comentários" /> 
                        </div>

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

export default Comments;