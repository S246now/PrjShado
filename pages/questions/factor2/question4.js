import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from '../../../styles/extra.module.css';
import OptionsQ4 from "../../../components/optionsQuestion2/optionsQuestion4";

function QuestionPage4() {
    const [timeRemaining, setTimeRemaining] = useState(50); // Tiempo restante en segundos
    const router = useRouter();
    const timerRef = useRef(null);
    const [audioEnded, setAudioEnded] = useState(false);

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
            const path = "/questions/factor2/question5";
            router.push(path);
        }
    }, [timeRemaining]);

    const handleAudioEnded = () => {
        setAudioEnded(true);
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
                <h1>Factor 2 - Cuarta Pregunta</h1>
                <h4>Por favor, escuche el sonido guía e identifique cuál de las 4 opciones es la misma</h4>
                <p>Tiempo restante: {formatTime(timeRemaining)}</p>
                <h2>Sonido Guía:</h2>
                <br />
                <div>
                    <audio
                        src="/audio/factor2-4.mp3"
                        type="audio/mp3"
                        controls
                        onEnded={handleAudioEnded}
                    >
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
                <br />
                {/* Opciones */}
                {audioEnded && <OptionsQ4 />}
            </div>
        </div>
    )
}

export default QuestionPage4;