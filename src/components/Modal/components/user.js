import React, { useState, useEffect } from "react";

//API
import api from "../../../api";

function User(props) {

    //STATES
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        api.get(`/users/${props.userId}`)
        .then((response) => {
            setUserInfo([response.data]);
        })
        .catch((err) => {
            console.error("falha ao obter dados do usuário: " + err);
    });
    }, [])

    return (
        <div className="content-modal">
            {userInfo.length > 0 && (
                <>
                <div className="personal">
                    <div className="section">
                        <div className="img-user"><span>{(userInfo[0].name)[0]}</span></div>
                        <h4>{userInfo[0].name}</h4>
                    </div>
                    
                    <div className="info-section">
                        <div className="block">
                            <h5>Username</h5>
                            <p>{userInfo[0].username}</p>
                        </div>
                        <div className="block">
                            <h5>Telefone</h5>
                            <p>{userInfo[0].phone}</p>
                        </div>
                        <div className="block">
                            <h5>Email</h5>
                            <p>{userInfo[0].email}</p>
                        </div>
                        <div className="block">
                            <h5>Site</h5>
                            <p>{userInfo[0].website}</p>
                        </div>
                    </div>
                </div>
                <div className="address">
                    <div className="info-section">
                        <div className="block">
                            <h5>Empresa</h5>
                            <p>{userInfo[0].company.name}</p>
                        </div>
                        <div className="block">
                            <h5>Slogan</h5>
                            <p>{userInfo[0].company.catchPhrase}</p>
                        </div>
                        <div className="block">
                            <h5>Descrição</h5>
                            <p>{userInfo[0].company.bs}</p>
                        </div>
                        <div className="block">
                            <h5>Rua</h5>
                            <p>{userInfo[0].address.street}</p>
                        </div>
                        <div className="block">
                            <h5>Bairro</h5>
                            <p>{userInfo[0].address.suite}</p>
                        </div>
                        <div className="block">
                            <h5>Cidade</h5>
                            <p>{userInfo[0].address.city}</p>
                        </div>
                        <div className="block">
                            <h5>Zip / Cep</h5>
                            <p>{userInfo[0].address.zipcode}</p>
                        </div>
                    </div>
                </div>
                </>
            )}
            

            
        </div>
    )
}

export default User;