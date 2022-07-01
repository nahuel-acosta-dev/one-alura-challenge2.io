import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import HelperRouters from './routes/HelperRoutes';
import Header from './header/Header';
import {useDispatch} from "react-redux";
import { setCredentials } from './features/auth/authSlice';

const App = () => {
    /*const dispatch = useDispatch();
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? 
    JSON.parse(localStorage.getItem("authTokens")) : null);

    useEffect(() =>  {
        const dataUser = () => {
            if (authTokens != null){
                dispatch(setCredentials({ ...authTokens}))
            }
        }
        dataUser();
    }, []);*/

    return(<>
                <Header />
                <main>
                    <Container className="main__container" fluid>
                        {
                        <HelperRouters />
                        }
                    </Container>
                </main>
            </>
    )
}
//Implememntar esto en los componentes, es el tipo de datos que se recibira del snipet
/*App.propTypes = {
    img: propTypes.string
}*/
export default App;