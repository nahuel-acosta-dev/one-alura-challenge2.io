import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import HelperRouters from './routes/HelperRoutes';
import Header from './header/Header';

const App = () => {

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