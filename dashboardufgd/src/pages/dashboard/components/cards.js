import { Fragment } from "react";

function Cards(props) {
    let cards = [
        {icon: 'fi fi-rr-document', amount: 100, description: 'Postagens'},
        {icon: 'fi fi-rr-comments', amount: 500, description: 'Comentários'},
        {icon: 'fi fi-rr-users-alt', amount: props.amountUsers, description: 'Usuários'},
    ];
    return (
        <Fragment>
            {cards.map(({icon, amount, description}, index)=>{
                return (
                    <div className="card" key={index}>
                        <div className="icon">
                            <i className={icon}></i>
                        </div>
                        <div className="data">
                            <p>{amount}</p>
                            <span>{description}</span>
                        </div>
                    </div>
                )
            })} 
        </Fragment>
    )
}

export default Cards;