import React, { useState, useEffect } from "react";
import Header from "../../components/globals/header";
import Sidebar from "../../components/globals/sidebar";
import Cards from "./components/cards";

//API
import api from "../../api";

//STYLE
import './styles/dashboard.css'
import Users from "./components/users";
import Posts from "./components/posts";
import Modal from "../../components/Modal";

function Dashboard() {

    //STATES
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [filterId, setFilterId] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [typeFilter, setTypeFilter] = useState('p');


    useEffect(() => {
        api.get("/users")
        .then((response) => {
            setUsers(response.data);
        })
        .catch((err) => {
            console.error("falha ao obter lista de usuários: " + err);
        });
    }, []);

    useEffect(() => {
        if (typeFilter==='p') {
            api.get(filterId>0 ? `/posts?userId=${filterId}` : '/posts')
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((err) => {
                    console.error("falha ao obter lista de postagens: " + err);
            });
        } else {
            api.get(filterId>0 ? `/posts?userId=${filterId}` : '/posts')
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((err) => {
                    console.error("falha ao obter lista de postagens: " + err);
            });
        }

    }, [filterId]);


    return (
        <section id="page">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div id="area-containers">
                    <div className="bigger-block">
                        <div className="cards-data">
                            <Cards amountUsers={users.length} />
                        </div>

                        <Posts 
                            posts={posts} 
                            users={users} 
                            filterId={filterId}
                            setFilterId={setFilterId} 
                            keyword={keyword} 
                            setKeyword={setKeyword} 
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                        />

                    </div>
                    <div className="smaller-block">
                        <Users users={users} />
                    </div>
                </div>
            </div>

            <Modal></Modal>
        </section>
    )
}

export default Dashboard;