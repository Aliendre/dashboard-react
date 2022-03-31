import { Fragment } from "react";
import { motion } from 'framer-motion';

function Cards(props) {
    let cards = [
        {icon: 'fi fi-rr-document', amount: props.amountPosts, description: 'Postagens', delay: 0},
        {icon: 'fi fi-rr-comments', amount: props.amountComments, description: 'Comentários', delay: 0.1},
        {icon: 'fi fi-rr-users-alt', amount: props.amountUsers, description: 'Usuários', delay: 0.2},
    ];
    return (
        <Fragment>
            {cards.map(({icon, amount, description, delay}, index)=>{
                return (
                    <motion.div 
                    initial={{y:-40, opacity:0.2}}
                    animate={{y:0, opacity:1}}
                    transition={{delay: delay, duration: 0.2}}
                    className="card" key={index}>
                        <div className="icon">
                            <i className={icon}></i>
                        </div>
                        <div className="data">
                            <p>{amount}</p>
                            <span>{description}</span>
                        </div>
                    </motion.div>
                )
            })} 
        </Fragment>
    )
}

export default Cards;