import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import HelperRouters from './routes/HelperRoutes';
import {Helmet} from "react-helmet";
import Header from './header/Header';
import Footer from './components/footer/Footer';

const App = () => {
    const filledArray = [...Array(30)].map(() => {
        return { val: "particle"}
      });

    return(<>
                <div className="application">
                    <Helmet>
                        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
                    </Helmet>
                </div>
                <Header />
                <main>
                    <Container className="main__container" fluid>
                    <div id="particle-container">
                        {
                            filledArray.map((element, i) => <div key={i} className={element.val}></div>)
                        }
                    </div>
                        {
                        <HelperRouters />
                        }
                    </Container>
                </main>
                <Footer />
            </>
    )
}
//Implememntar esto en los componentes, es el tipo de datos que se recibira del snipet
/*App.propTypes = {
    img: propTypes.string
}*/
export default App;