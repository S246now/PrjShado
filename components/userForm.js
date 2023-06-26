import { useRef, useState } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import classes from '../styles/extra.module.css'
import { useRouter } from 'next/router';

function AddUser() {

    const [selectedOption, setSelectedOption] = useState('');    
    const [carreerVisible, setCarreerVisible] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [linkVisible, setLinkVisible] = useState(false);
    const router = useRouter();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setCarreerVisible(event.target.value === 'SI');
    };

    const ageInputRef = useRef();
    const carreerInputRef = useRef();

    function sendDataAndContinue(event) {
        event.preventDefault();

        const ageSelected = ageInputRef.current.value;
        const carreerSelected = carreerInputRef.current?.value || '';

        const reqBody = { age: ageSelected, student: selectedOption, carreer: carreerSelected }; //javascript object

        /* setSubmitButtonDisabled(true);
        setLinkVisible(true); */

        // Pass userData as a prop when navigating to the QuestionPage
        const path = '/questions/factor1/question1';
        router.push({
            pathname: path,
            query: { userData: JSON.stringify(reqBody) }
        });
        console.log(reqBody);
    }

        /* const body = JSON.stringify(reqBody);
        const response = axios.post('/api/login', body) //POST token al backend 
        console.log(response) 
    }*/

        

    return (
        <div >
            <div >
            <form >
                <div>
                    <label htmlFor='edadinput'>¿Qué edad tienes? </label>
                    <input className={classes.input} type="text" name="Age" id='edadInput' ref={ageInputRef} placeholder="Ingresa tu edad" required autoFocus />
                </div>
                
                <br />
                <div>
                    <label>¿Eres Estudiante? </label>
                    <input type="radio" name="options" id='resSI' value='SI' onChange={handleOptionChange} />
                    <label htmlFor='resSI'>SI</label>
                    <input type="radio" name="options" id='resNO' value='NO' onChange={handleOptionChange} />
                    <label htmlFor='resNO' >NO</label>
                </div>
                
                <br />
                {/* if true then show: */}
                {carreerVisible &&
                    <div>
                        <label>¿En qué carrera estudias? </label>
                        <input className={classes.input} type="text" name="Carreer" ref={carreerInputRef} placeholder="Ingresa tu carrera" required />
                    </div>
                }

                <br />
                <input className={classes.btn} type="submit" name="Send" onClick={sendDataAndContinue} disabled={!selectedOption}></input>
            </form>
            <br/>
           {/*  {linkVisible && (
                <Link href='/questions/factor1/question1'>
                    <div className={submitButtonDisabled ? styles.disabledLink : ''}>Continuar</div>
                </Link>
            )} */}
            </div>
        </div>
    )
}

export default AddUser;