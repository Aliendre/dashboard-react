import React, { useState, useEffect, useRef } from "react";
import Autosizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { motion } from "framer-motion";

function Posts(props) {

    //REF
    const listRef = useRef(null);
    const listSelect = useRef(null);

    //STATES
    const [openSelect, setOpenSelect] = useState(false);

    const handleClickOutside = (event) => {
        if (listSelect.current && !listSelect.current.contains(event.target)) {
            setOpenSelect(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }); 

    useEffect(() => {   
        if (props.keyword=='') {
            props.setFilterId(null)
        }
    }, [props.keyword])
    

    function getUser(keyword) {
        return function(item) { 
            if (item.id === keyword) {
                return item
            }             
        }
    }

  
    function post({style, index}) {
        return (
            <li style={style} >
                <div className="thumb">
                    {props.typeFilter==='p'
                        ? <span>{(props.posts[index].title)[0]}</span>
                        : <span>{(props.posts[index].name)[0]}</span>
                    }
                </div>
                <div className="post">
                    {props.typeFilter==='p'
                        ? <h5>{props.posts[index].title}</h5>
                        : <h5>{props.posts[index].name}</h5>
                    }
                    <p>{props.posts[index].body}</p>
                </div>
                <div className="author">
                    {props.users.filter(getUser(props.posts[index].userId)).map(({username})=>{
                        return <p>{username}</p>
                    })}
                </div>
                <div className="actions">
                    {props.typeFilter==='p'
                    ?
                        <button aria-label="ver comentários" className="option highlighted" onClick={()=>{props.setModalComments(true);props.setPostId(props.posts[index].id)}} title="ver comentários">
                            <span>Ver comentários</span>
                        </button>
                    :
                        <button aria-label="ver comentários" className="option highlighted" onClick={()=>{props.setTypeQuery('s');props.setModalPost(true);props.setPostId(props.posts[index].id)}} title="ver comentários">
                            <span>Ver postagem</span>
                        </button>
                    }
                </div>
            </li>
        )
    }

    return (
        <motion.div 
        initial={{y:40, opacity:0.2}}
        animate={{y:0, opacity:1}}
        transition={{delay: 0.1, duration: 0.2}}
        className="container-posts">
            <h3>Postagens / Comentários</h3>
            <div className="filter">
                <div className="type-filter">
                    <div className="icon">
                        <i className="fi fi-rr-filter"></i>
                    </div>
                    <div className="types">
                        <button aria-label="filtrar por postagens" title="filtrar por postagens" className={`option ${props.typeFilter==='p'?'active':''}`} onClick={()=>props.setTypeFilter('p')}>     
                            <span>Postagens</span>
                        </button>
                        <button aria-label="filtrar por comentários" title="filtrar por comentários" className={`option ${props.typeFilter==='c'?'active':''}`} onClick={()=>{props.setTypeFilter('c');props.setKeyword('')}}>
                            <span>Comentários</span>
                        </button>
                    </div>
                </div>
                <div className="filter-input">
                    <input type="search" aria-label="Filtrar por usuário" disabled={props.typeFilter==='c'&&true} value={props.keyword} onChange={(e)=>props.setKeyword(e.currentTarget.value)} onClick={()=>setOpenSelect(true)} placeholder="Filtrar por usuário" /> 
                    {openSelect&& (
                        <div className="container-select" ref={listSelect}>
                            {props.users.map(({id, username})=>{
                                return <button 
                                            key={id} 
                                            className="option" 
                                            onClick={()=>{props.setFilterId(id);props.setKeyword(username);setOpenSelect(false)}}
                                        >
                                            <span>{username}</span>
                                        </button>
                            })}
                        </div>
                    )}
                    
                </div>
                
            </div>
            <div className="display-filter">
                {(props.typeFilter==='p')&&(props.filterId)===null &&(
                    <p>Mostrando todas as postagens</p>
                )}
                {(props.typeFilter==='c')&&(props.filterId)===null &&(
                    <p>Mostrando todos os comentários</p>
                )}
                {(props.typeFilter==='p'&&props.filterId>0) && (
                    <p>Mostrando postagens feitas por <span>{props.keyword}</span></p>
                )}
                {(props.typeFilter==='c'&&props.keyword!=='') && (
                    <p>Mostrando comentátios feitos por <span>{props.keyword}</span></p>
                )}    
            </div>
            <div className="list-header">
                <div className="item void">
                    {/* <h4></h4> */}
                </div>
                <div className="item post">
                    {props.typeFilter==='p'
                        ? <h4>Postagem</h4>
                        : <h4>Comentários</h4>
                    }
                </div>
                <div className="item author">
                    {props.typeFilter==='p' && (
                        <h4>Autor</h4>
                    )}
                </div>
                <div className="item actions">
                    {/* <h4></h4> */}
                </div>
            </div>
            <ul className="list-posts">
                <Autosizer>
                    {({height, width})=> (
                        <FixedSizeList
                            ref={listRef}
                            className={'content-list'}
                            height={height}
                            width={width}
                            itemSize={130}
                            itemCount={(props.posts).length}        
                        >
                            {post}
                        </FixedSizeList>
                    )}
                </Autosizer>
            </ul>
        </motion.div>
    )
}

export default Posts;