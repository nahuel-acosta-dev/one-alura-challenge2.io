import React, {useState, useEffect} from 'react';
import HangedZero from '../../image/HangedZero.svg';
import HangedOne from '../../image/HangedOne.svg';
import HangedTwo from '../../image/HangedTwo.svg';
import HangedThree from '../../image/HangedThree.svg';
import HangedFour from '../../image/HangedFour.svg';
import HangedFive from '../../image/HangedFive.svg';
import Hanged from '../../image/Hanged.svg';
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
            <img src={Img} />
        </div>
    )
}
Hangman.propTypes = {
    failures: PropTypes.array,
}

export default Hangman;