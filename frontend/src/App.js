import React from 'react';
import Button from 'react-bootstrap/Button';

const App = () => {
    return(
        <div>{process.env.REACT_API}
        <Button variant="primary">Primary</Button>{' '}
        </div>
    )
}
//Implememntar esto en los componentes, es el tipo de datos que se recibira del snipet
/*App.propTypes = {
    img: propTypes.string
}*/
export default App;