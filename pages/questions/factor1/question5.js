import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from '../../../styles/extra.module.css';

function QuestionPage5() {
    const [selectedOption, setSelectedOption] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(60); // Tiempo restante en segundos

    const handleOptionChange = (event) => {
        //guarda el valor seleccionado en 'selectedOption'
        const value = event.target.value;
        setSelectedOption(value || "");
    };

    const router = useRouter();
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
            const path = "/questions/factor2/question1";
            router.push(path);
        }
    }, [timeRemaining]);

    //recupero datos de anterior página (userForm)
    const { userData } = router.query;
    function sendDataAndContinue(event) {
        try {
            const user = JSON.parse(userData);
            // Continuar con la lógica después de analizar los datos exitosamente

            clearInterval(timerRef.current); // Cancelar el temporizador al hacer clic en el botón
            event.preventDefault();

            const newUser = {
                age: user.age,
                student: user.student,
                carreer: user.carreer,
                question1: user.question1,
                question2: user.question2,
                question3: user.question3,
                question4: user.question4,
                question5: selectedOption ?? '',
            };

            // Pass userData as a prop when navigating to the QuestionPage
            const path = '/questions/factor2/question1';
            router.push({
                pathname: path,
                query: { userData: JSON.stringify(newUser) }
            });
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
                <h1>Factor 1 - Quinta Pregunta</h1>
                <h4>¿Puede recordar la secuencia que escuchará a continuación? </h4>
                <h4>Escuche el sonido guía e identifique cuál de las 4 opciones es la misma</h4>
                <p>Tiempo restante: {formatTime(timeRemaining)}</p>
                <h2>Sonido Guía:</h2>
                <br />
                <div>
                    <audio
                        src="/audio/factor1-5.mp3"
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
                        <audio src="/audio/factor1-5a.mp3" controls />
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
                        <audio src="/audio/factor1-5b.mp3" controls />
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
                        <audio src="/audio/factor1-5c.mp3" controls />
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
                        <audio src="/audio/factor1-5d.mp3" controls />
                    </label>
                </div>

                <br />
                <button className={classes.btn} onClick={sendDataAndContinue} disabled={!selectedOption}>Continuar</button>
            </div>
        </div>
    )
}

export default QuestionPage5;