//STYLES
import './styles/header.css';

function Header(props) {
    return (
        <header className='header'>
            <h2 className='pageName'>{props.pageName}</h2>
            <div className='username'>
                <span>Diego Aliendre</span>
                <div className='img-user'>
                    <i class="fi fi-rr-user"></i>
                </div>
            </div>
        </header>
    )
}

export default Header;