import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from '../../../styles/extra.module.css';
import OptionsQ3 from "../../../components/optionsQuestion2/optionsQuestion3";

function QuestionPage3() {
    const [timeRemaining, setTimeRemaining] = useState(50); // Tiempo restante en segundos
    const router = useRouter();
    const timerRef = useRef(null);
    const [audioEnded, setAudioEnded] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);

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
            const path = "/questions/factor2/question4";
            router.push(path);
        }
    }, [timeRemaining]);

    const handleAudioEnded = () => {
        setAudioEnabled(false);// Deshabilitar el control de audio al finalizar la reproducción
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
                <h1>Factor 2 - Tercera Pregunta</h1>
                <h4>Escuche el sonido guía e identifique cuál de las 4 opciones es la misma</h4>
                <p>Tiempo restante: {formatTime(timeRemaining)}</p>
                <h2>Sonido Guía:</h2>
                <br />
                <div>
                    <audio
                        src="/audio/factor2-3.mp3"
                        type="audio/mp3"
                        controls={audioEnabled}
                        onEnded={handleAudioEnded}
                    >
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
                <br />
                {/* Opciones */}
                {audioEnded && <OptionsQ3 />}
            </div>
        </div>
    )
}

export default QuestionPage3;