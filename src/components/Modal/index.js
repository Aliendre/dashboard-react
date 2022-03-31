import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Comments from './components/comments';
import Posts from './components/posts';

//STYLES
import User from './components/user';
import './styles/modal.css';

function Modal(props) {

    let modal = useRef(null);

    const styleModal = {
        hiddenModal: {
            opacity: 0,
            // scale: 0.5,
            y: '-20%'
        },
        visibleModal: {
            opacity: 1,
            // scale: 1,
            y: 0
        }
    }

    const handleClickOutside = (event) => {
        if (modal.current && !modal.current.contains(event.target)) {
            props.trigger(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }); 

    return (
        <AnimatePresence>
            {(props.open) && (
                <motion.section 
                initial={{opacity:0}}
                animate={{opacity:1}}
                id="area-modal">


                    <motion.div
                    ref={modal}
                    variants={styleModal}
                    initial="hiddenModal"
                    animate="visibleModal"
                    transition={{
                        type:'spring',
                        stiffness: 120,
                        delay: .2
                    }}
                    className={`container-modal ${props.size}`}>
                        <button className='close-modal' onClick={()=>props.trigger(false)}><i class="fi fi-rr-cross"></i></button>
                        
                        {props.type==='user' && (
                            <User userId={props.userId} />
                        )}
                        {props.type==='comments' && (
                            <Comments postId={props.postId} />
                        )}
                        {props.type==='posts' && (
                            <Posts postId={props.postId} />
                        )}
                        

                    </motion.div>


                </motion.section>
            )}
            
        </AnimatePresence>
        
    )
}

export default Modal;