import { NavLink } from 'react-router-dom';

//STYLES
import './styles/sidebar.css';

//ASSETS
import logoReact from '../../../assets/img/svg/logo-react.svg';


function Sidebar() {
    //UTILS
    let navLinks = [
        {route: '/', icon: 'fi fi-rr-apps', name: 'Dashboard'},
        {route: '/usuarios', icon: 'fi fi-rr-users-alt', name: 'Usuários'},
        {route: '/postagens', icon: 'fi fi-rr-document', name: 'Postagens'},
        {route: '/comentarios', icon: 'fi fi-rr-comments', name: 'Comentários'}
    ]
    return (
        <nav className='sidebar'>
            <div className='logo'>
                <img src={logoReact} alt="logo"/>
            </div>
            <div className='nav-links'>
                {navLinks.map(({route, icon, name}, index)=>{
                    return (
                        <NavLink exact to={route} className={(navData) => navData.isActive ? "active" : "" } key={index}>
                            <i className={icon}></i>
                            <span>{name}</span>
                        </NavLink>
                    )
                })}      
            </div>
            <div className='app-version'>
                <span>Versão 1.0.0</span>
            </div>
        </nav>
    )
}

export default Sidebar;