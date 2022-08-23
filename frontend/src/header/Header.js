import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Vector from '../image/Vector.svg';
import Logo from '../image/logo.svg';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {useLogoutMutation} from '../features/auth/logoutApiSlice';
import { logOut } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../features/auth/authSlice';
import {Link, useNavigate} from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Notification from '../notifications/Notification';
import Loading from '../components/loading/Loading';

const Header = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout, { isLoading }] = useLogoutMutation();
    const [errMsg, setErrMsg] = useState('');
    const [changeLogo, setChangeLogo] = useState(false);
    


    const logoutApi = async () => {
        try{
            const logoutUser = await logout({'user': user.id}).unwrap();
            console.log(logoutUser);
            dispatch(logOut());
            navigate('/');
        }catch(err){
            if(!err.response){
                setErrMsg("No server Response");
            }
            else if (err.response?.status){
                setErrMsg("Falling servers logout");;
                console.log(err.response?.status)
            }
            errRef.current.focus();
        }
    }

    const redirect = () => navigate('/app/profile');
    

    return(
        <>
        <header>
            <Navbar expand="sm">
                <Container fluid>
                    <Navbar.Brand className="header__logo d-flex navbar-center">
                    <Link className="navbar-sm-logo" to={
                        token ? 
                        ("/app/home")
                            :
                        ("/")
                    }>
                        <img
                            src={changeLogo ? Vector : Logo}//Al pasar el mouse debe cambiar de logo
                            width="50"
                            className="d-inline-block align-top"
                            alt="alura logo"
                        />      
                    </Link>
                    </Navbar.Brand>
                    <Nav className="header-title me-sm-4">
                            <Link className="navbar-links__mod" to={
                                token ? 
                                ("/app/home")
                                :
                                ("/")
                            }>sixLives</Link>
                    </Nav>
                        <Nav className="me-4"
                        style={{ maxHeight: '50px' }}
                        >
                            {token && user &&
                                <Notification />
                            }
                        </Nav>
                        <Nav className="me-auto"
                        style={{ maxHeight: '50px' }}>
                            {token && user &&
                            <>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={<i className="bi bi-sort-down nav-icon"></i>}
                                    menuVariant="dark"
                                    className="nav-dropdown"
                                    >
                                    <NavDropdown.Item>
                                        <Button variant="link" className="navbar-links" onClick={redirect}>
                                            <i className="bi bi-person"></i> Profile
                                        </Button>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>{
                                    isLoading ? (<Loading/>)
                                        :
                                    (token && (
                                    <>
                                        
                                        <Button variant="link" onClick={logoutApi} className="navbar-links">
                                            <i className="bi bi-power"></i> Logout
                                        </Button>
                                    </>
                                    )
                                    )
                                }</NavDropdown.Item>
                                </NavDropdown>
                            </>}
                            
                        </Nav>
                        <Nav className="navbar-center">
                        {
                                isLoading ? (<Loading/>)
                                    :
                                (!token ?
                                (<div className="navbar-login">
                                    <Link className="navbar-login btn btn-outline-info" to="/auth/login">
                                        Iniciar Sesion
                                    </Link>
                                </div>)
                                :
                                (
                                    <Navbar.Text  className="profile">
                                        Signed in as: {user && token && user.username.toUpperCase()}
                                    </Navbar.Text>
                                    //en vez de poner solo el nombre podria ponerse la foto del perfil    
                                )
                                )
                            }
                        </Nav>
                </Container>
            </Navbar>
        </header>
        </>
    )
}

export default Header;