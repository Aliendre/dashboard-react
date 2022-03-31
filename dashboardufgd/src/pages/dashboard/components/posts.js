import React, { useState, useEffect, useRef } from "react";
import Autosizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

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
    
  
    function post({style, index}) {
        return (
            <li style={style} >
                <div className="thumb">
                    <span>{(props.posts[index].title)[0]}</span>
                </div>
                <div className="post">
                    <h5>{props.posts[index].title}</h5>
                    <p>{props.posts[index].body}</p>
                </div>
                <div className="author">
                    <p>Diego Aliendre</p>
                </div>
                <div className="actions">
                    <button aria-label="ver comentários" className="option highlighted" title="ver comentários">
                        {/* <i className="fi fi-rr-info"></i> */}
                        <span>Ver comentários</span>
                    </button>
                </div>
            </li>
        )
    }

    return (
        <div className="container-posts">
            <h3>Postagens</h3>
            <div className="filter">
                <div className="type-filter">
                    <div className="icon">
                        <i className="fi fi-rr-filter"></i>
                    </div>
                    <div className="types">
                        <button aria-label="filtrar por postagens" title="filtrar por postagens" className={`option ${props.typeFilter==='p'?'active':''}`} onClick={()=>props.setTypeFilter('p')}>
                            <span>Postagens</span>
                        </button>
                        <button aria-label="filtrar por comentários" title="filtrar por comentários" className={`option ${props.typeFilter==='c'?'active':''}`} onClick={()=>props.setTypeFilter('c')}>
                            <span>Comentários</span>
                        </button>
                    </div>
                </div>
                <div className="filter-input">
                    <input type="search" aria-label="Filtrar por usuário" value={props.keyword} onChange={(e)=>props.setKeyword(e.currentTarget.value)} onClick={()=>setOpenSelect(true)} placeholder="Filtrar por usuário" /> 
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
                {(props.filterId)===null &&(
                    <p>Mostrando todas as postagens</p>
                )}
                {(props.typeFilter==='p'&&props.filterId>0) && (
                    <p>Mostrando postagens feitas por <span>{props.keyword}</span></p>
                )}
                {(props.typeFilter==='c'&&props.filterId>0) && (
                    <p>Mostrando postagens com comentátios de <span>{props.keyword}</span></p>
                )}
                
            </div>
            <div className="list-header">
                <div className="item void">
                    {/* <h4></h4> */}
                </div>
                <div className="item post">
                    <h4>Postagem</h4>
                </div>
                <div className="item author">
                    <h4>Autor</h4>
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
        </div>
    )
}

export default Posts;