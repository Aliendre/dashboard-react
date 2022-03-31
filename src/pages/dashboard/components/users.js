import React, { useState } from "react";
import { motion } from "framer-motion";

function Users(props) {

    //STATES
    const [keyword, setKeyword] = useState('');
    
    //BUSCAR USUÁRIO
    function searchingFor(keyword) {
        return function(item) {              
            return item.username.toLowerCase().includes(keyword.toLowerCase()) || item.email.toLowerCase().includes(keyword.toLowerCase()) || !keyword;
        }
    }

    

    return (
        <motion.div 
        initial={{y:-40, opacity:0.2}}
        animate={{y:0, opacity:1}}
        transition={{delay: 0.1, duration: 0.2}}
        className="container-users">
            <h3>Usuários</h3>
            <div className="filter">
                <input type="search" aria-label="Buscar usuário" value={keyword} onChange={(e)=>setKeyword(e.currentTarget.value)} placeholder="Buscar usuário" /> 
            </div>
            <ul className="list-users">
                {props.users.filter(searchingFor(keyword)).map(({id, username, email, phone})=> {
                    return (
                        <li key={id}>
                            <div className="thumb">
                                <span>{username[0]}</span>
                            </div>
                            <div className="info-user">
                                <div className="header">
                                    <p>{username}</p>
                                    <span>{email}</span>
                                </div>
                                <div className="actions">
                                    <p aria-label="telefone para contato" title="telefone para contato">{phone.split(" ")[0]}</p>
                                    <div className="options">
                                        <button aria-label="postagens do usuário" className="option" onClick={()=>{props.setTypeQuery('m');props.setModalPost(true);props.setPostId(id)}} title="postagens do usuário">
                                            <i className="fi fi-rr-document"></i>
                                        </button>
                                        {/* <button aria-label="comentários do usuário" className="option" title="comentários do usuário">
                                            <i className="fi fi-rr-comments"></i>
                                        </button> */}
                                        <button aria-label="informações do usuário" className="option highlighted" onClick={()=>{props.setModalUser(true);props.setUserId(id)}} title="Informações sobre o usuário">
                                            {/* <i className="fi fi-rr-info"></i> */}
                                            <span>sobre</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
                
            </ul>
        </motion.div>
    )
}

export default Users;