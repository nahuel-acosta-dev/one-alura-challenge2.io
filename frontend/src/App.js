import React from 'react';
import Container from 'react-bootstrap/Container';
import HelperRouters from './routes/HelperRoutes';
import Header from './components/header/Header';
import {Provider} from "react-redux";

const App = () => {
    //const show = false;
    return(
        <Provider>
            <Header />
            <main>
                <Container className="main__container" fluid>
                    {
                    <HelperRouters />
                    }
                </Container>
            </main>
        </Provider>
    )
}
//Implememntar esto en los componentes, es el tipo de datos que se recibira del snipet
/*App.propTypes = {
    img: propTypes.string
}*/
export default App;