import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

//API
import api from "../../../api";

function Comments(props) {

    //STATES
    const [keyword, setKeyword] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.get(`/comments?postId=${props.postId}`)
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
    }, [])

    //BUSCAR COMENTÁRIO
    function searchingFor(keyword) {
        return function(item) {              
            return item.body.toLowerCase().includes(keyword.toLowerCase()) || item.name.toLowerCase().includes(keyword.toLowerCase()) || !keyword;
        }
    }
    

    return (
        <div className="content-modal block">
            <h3>Comentários</h3>
            <div className="filter">
                <input type="search" aria-label="Buscar comentário" value={keyword} onChange={(e)=>setKeyword(e.currentTarget.value)} placeholder="Buscar comentário" /> 
            </div>
            
            <ul className="list-comments">
                {comments.filter(searchingFor(keyword)).map(({id, name, email, body})=> {
                    return (
                        <li key={id}>
                            <div className="thumb">
                                <span>{name[0]}</span>
                            </div>
                            <div className="info-user">
                                <div className="header">
                                    <p>{name}</p>
                                    <span>{email}</span>
                                </div>
                                <div className="text">
                                    <p>{body}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
                
            </ul>

        </div>
    )
}

export default Comments;