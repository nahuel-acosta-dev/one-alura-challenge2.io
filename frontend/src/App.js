import React from 'react';
import Container from 'react-bootstrap/Container';
import HelperRouters from './routes/HelperRoutes';
import Header from './components/header/Header';

const App = () => {
    //const show = false;
    return(
        <>
            <Header />
            <main>
                <Container className="main__container" fluid>
                    {
                    <HelperRouters />
                    /*show ?
                        //<Home />
                        
                        <SaveScreen />
                        :
                        <GameStarts />*/
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