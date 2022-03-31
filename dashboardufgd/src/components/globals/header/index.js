//STYLES
import './styles/header.css';

function Header() {
    return (
        <header className='header'>
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