//STYLES
import User from './components/user';
import './styles/modal.css';

function Modal() {
    return (
        <section id="area-modal">
            
            <div className='container-modal small'>
                <User />
            </div>
        </section>
    )
}

export default Modal;