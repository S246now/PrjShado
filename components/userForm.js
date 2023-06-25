import { useRef, useState } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import axios from 'axios';
import classes from '../styles/extra.module.css'

function AddUser() {

    const [selectedOption, setSelectedOption] = useState('');    
    const [carreerVisible, setCarreerVisible] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [linkVisible, setLinkVisible] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setCarreerVisible(event.target.value === 'SI');
    };

    const ageInputRef = useRef();
    const carreerInputRef = useRef();

    function sendData(event) {
        event.preventDefault();
        const ageSelected = ageInputRef.current.value;
        const carreerSelected = carreerInputRef.current?.value || '';
        const reqBody = { edad: ageSelected, estudiante: selectedOption, carrera: carreerSelected }; //javascript object
        setSubmitButtonDisabled(true);
        setLinkVisible(true);
        
        fetch('/api/saveUser', { 
            method: 'POST', //send the POST HTTP REQUEST
            body: JSON.stringify(reqBody), //lo envío como JSON
            headers: { 
              'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .finally(() => {
                setSubmitButtonDisabled(true);
                setLinkVisible(true);
            });

        const body = JSON.stringify(reqBody);
        const response = axios.post('/api/login', body) //POST token al backend 
        console.log(response)
    }

    return (
        <div className={classes.container}>
            <div>
            <form onSubmit={sendData}>
                <div>
                    <label htmlFor='edadinput'>¿Qué edad tienes? </label>
                    <input type="text" name="Age" id='edadInput' ref={ageInputRef} placeholder="Ingresa tu edad" required autoFocus />
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
                        <input type="text" name="Carreer" ref={carreerInputRef} placeholder="Ingresa tu carrera" required />
                    </div>
                }

                <br />
                <input type="submit" name="Send" onClick={sendData} disabled={submitButtonDisabled}></input>
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