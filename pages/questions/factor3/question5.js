import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from '../../../styles/extra.module.css';

function QuestionPage5() {
    const [selectedOption, setSelectedOption] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(60); // Tiempo restante en segundos
    const router = useRouter();
    //recupero datos de anterior página (userForm)
    const { userData } = router.query;

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value || "");
    };

    const timerRef = useRef(null);

    useEffect(() => {
        // Iniciar el temporizador al cargar la página
        timerRef.current = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            // Limpiar el intervalo al salir de la página
            clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (timeRemaining === 0) {
            // Redireccionar a /questions/question2 si han pasado 30 segundos
            const path = "/final";
            //router.push(path);
            //
            const user = JSON.parse(userData);
            const newUser = {
                age: user.age,
                student: user.student, 
                carreer: user.carreer,
                question1: user.question1,
                question2: user.question2,
                question3: user.question3,
                question4: user.question4,
                question5: user.question5,
                question6: user.question6,
                question7: user.question7,
                question8: user.question8,
                question9: user.question9,
                question10: user.question10,
                question11: user.question11,
                question12: user.question12,
                question13: user.question13,
                question14: user.question14,
                question15: selectedOption ?? '',
            };
            // Pass userData as a prop when navigating to the QuestionPage
            router.push({
                pathname: path,
                query: { userData: JSON.stringify(newUser) }
            });
            console.log(newUser);
        }
    }, [timeRemaining]);


    
    function sendDataAndContinue(event) {
        event.preventDefault();

        try {
            const user = JSON.parse(userData);
            // Continuar con la lógica después de analizar los datos exitosamente

            clearInterval(timerRef.current); // Cancelar el temporizador al hacer clic en el botón
            
            const newUser = {
                age: user.age,
                student: user.student,
                carreer: user.carreer,
                question1: user.question1,
                question2: user.question2,
                question3: user.question3,
                question4: user.question4,
                question5: user.question5,
                question6: user.question6,
                question7: user.question7,
                question8: user.question8,
                question9: user.question9,
                question10: user.question10,
                question11: user.question11,
                question12: user.question12,
                question13: user.question13,
                question14: user.question14,
                question15: selectedOption ?? '',
            };

            // Pass userData as a prop when navigating to the QuestionPage
            const path = '/final';
            router.push(`/final?userData=${JSON.stringify(newUser)}`);
                /* pathname: path,
                query: { userData: JSON.stringify(newUser) }
            }); */
            console.log(newUser);


        } catch (error) {
            console.error('Error al analizar los datos del usuario:', error);
            // Redireccionar a otra página en caso de error
            router.push('/error');
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };


    return (
        <div className={classes.container}>
            <div className={classes.containerHijo}>
                <h1>Factor 3 - Quinta Pregunta</h1>
                <h4>¡Pon a prueba tu concentración!</h4>
                <h4>Por favor, escucha la siguiente secuencia musical y marca la respuesta correcta</h4>
                <p>Tiempo restante: {formatTime(timeRemaining)}</p>
                <h2>Sonido Guía:</h2>
                <br />
                <div>
                    <audio
                        src="/audio/factor3-5.mp3"
                        type="audio/mp3"
                        controls
                    >
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
                <br />
                {/* Opciones */}
                <br />
                <div>
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="a"
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option1">
                        {/* Opción 1 */}
                        <audio src="/audio/factor3-5a.mp3" controls />
                    </label>
                </div>

                <br />
                <div>
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="b"
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option2">
                        <audio src="/audio/factor3-5b.mp3" controls />
                    </label>
                </div>

                <br />
                <div>
                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="c"
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option3">
                        <audio src="/audio/factor3-5c.mp3" controls />
                    </label>
                </div>

                <br />
                <div>
                    <input
                        type="radio"
                        id="option4"
                        name="options"
                        value="d"
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="option4">
                        <audio src="/audio/factor3-5d.mp3" controls />
                    </label>
                </div>

                <br />
                <button className={classes.btn} onClick={sendDataAndContinue} disabled={!selectedOption}>Continuar</button>
            </div>
        </div>
    )
}

export default QuestionPage5;