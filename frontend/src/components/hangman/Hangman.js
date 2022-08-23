import React, {useState, useEffect} from 'react';
import HangedZero from '../../image/HangedZero.png';
import HangedOne from '../../image/HangedOne.png';
import HangedTwo from '../../image/HangedTwo.png';
import HangedThree from '../../image/HangedThree.png';
import HangedFour from '../../image/HangedFour.png';
import HangedFive from '../../image/HangedFive.png';
import Hanged from '../../image/Hanged.png';
import PropTypes from 'prop-types';

const Hangman = ({failures}) =>{
    const [Img, setImg] = useState();

    const numberFailures = () =>{
        switch(failures.length){
            case 1:
                setImg(HangedOne);
                break;
            case 2:
                setImg(HangedTwo);
                break;
            case 3:
                setImg(HangedThree);
                break;
            case 4:
                setImg(HangedFour);
                break;
            case 5:
                setImg(HangedFive);
                break;
            case 6:
                setImg(Hanged);
                break;
            default:
                setImg(HangedZero);
        }
    }

    useEffect(() => numberFailures(), [failures])

    return(
        <div className="gameStarts__hangman">
            <img src={Img} alt="image hangman" rel="noreferrer"/>
        </div>
    )
}
Hangman.propTypes = {
    failures: PropTypes.array,
}

export default Hangman;