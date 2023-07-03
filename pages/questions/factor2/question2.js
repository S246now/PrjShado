import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from '../../../styles/extra.module.css';
import OptionsQ2 from "../../../components/optionsQuestion2/optionsQuestion2";

function QuestionPage2() {
    const [timeRemaining, setTimeRemaining] = useState(50); // Tiempo restante en segundos
    const router = useRouter();
    const timerRef = useRef(null);
    const [audioEnded, setAudioEnded] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const { userData } = router.query;
    const [newUser, setNewUser] = useState(null); // Variable de estado para almacenar los datos del nuevo usuario
    const [selectedOption, setSelectedOption] = useState();

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
        // Obtener los datos del usuario desde la query de la URL
        const { userData } = router.query;

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setNewUser(parsedUser);
            } catch (error) {
                console.error('Error al analizar los datos del usuario:', error);
                // Redireccionar a otra página en caso de error
                router.push('/error');
            }
        }
    }, [router.query]);

    const handleOptionSelected = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        if (timeRemaining === 0) {
            // Redireccionar a /questions/question2 si han pasado 30 segundos
            const path = "/questions/factor2/question3";
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
                question7: selectedOption ?? ''
            };
            // Pass userData as a prop when navigating to the QuestionPage
            router.push({
                pathname: path,
                query: { userData: JSON.stringify(newUser) }
            });
            //console.log(newUser);
        }
    }, [timeRemaining]);

    const handleAudioEnded = () => {
        setAudioEnded(true);
        setAudioEnabled(false);// Deshabilitar el control de audio al finalizar la reproducción
    };


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
                <h1>Factor 2 - Segunda Pregunta</h1>
                <h4>Escuche el sonido guía e identifique cuál de las 4 opciones es la misma</h4>
                <p>Tiempo restante: {formatTime(timeRemaining)}</p>
                <h2>Sonido Guía:</h2>
                <br />
                <div>
                    <audio
                        src="/audio/factor2-2.m4a"
                        type="audio/mp3"
                        controls={audioEnabled}
                        onEnded={handleAudioEnded}
                    >
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
                <br />
                {/* Opciones */}
                {audioEnded && <OptionsQ2 onOptionSelected={handleOptionSelected}/>}
            </div>
        </div>
    )
}

export default QuestionPage2;