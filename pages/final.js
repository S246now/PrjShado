//dal puntaje
//excel(?) no hay control de usuarios
//se elimina el token
import { useRouter } from "next/router"
import { useState } from "react";
import classes from '../styles/extra.module.css'

function FinalPage() {
    const [message, setMessage] = useState("");
    const router = useRouter();

    //recupero datos de anterior página (userForm)
    const { userData } = router.query;
    const user = JSON.parse(userData);
    // Continuar con la lógica después de analizar los datos exitosamente


    //Cálculo de puntajes:
    function Score() {
        let totalPuntos = 0;

        if (user.question1 === 'c') {
            totalPuntos += 1;
        }
        if (user.question2 === 'a') {
            totalPuntos += 1;
        }
        if (user.question3 === 'd') {
            totalPuntos += 1;
        }
        if (user.question4 === 'd') {
            totalPuntos += 1;
        }
        if (user.question5 === 'c') {
            totalPuntos += 1;
        }
        if (user.question6 === 'd') {
            totalPuntos += 2;
        }
        if (user.question7 === 'd') {
            totalPuntos += 2;
        }
        if (user.question8 === 'b') {
            totalPuntos += 2;
        }
        if (user.question9 === 'b') {
            totalPuntos += 2;
        }
        if (user.question10 === 'c') {
            totalPuntos += 2;
        }
        if (user.question11 === 'a') {
            totalPuntos += 3;
        }
        if (user.question12 === 'a') {
            totalPuntos += 3;
        }
        if (user.question13 === 'd') {
            totalPuntos += 3;
        }
        if (user.question13 === 'd') {
            totalPuntos += 3;
        }
        if (user.question14 === 'b') {
            totalPuntos += 3;
        }
        if (user.question15 === 'b') {
            totalPuntos += 3;
        }
        return totalPuntos;
    }

    function showMessage() {
        const totalPuntos = Score();
        
        let message = '';
        //Enviar mensaje
        if (totalPuntos > -1 && totalPuntos < 11) {
            message = <div>
                <h2>Lo hiciste bien, has obtenido {totalPuntos} /33 puntos</h2>
                <h4>Quizá debas comer más sardina...</h4>
            </div>;
        }
        if (totalPuntos > 10 && totalPuntos < 16) {
            message = <div>
                <h2>Buen Trabajo!, has obtenido {totalPuntos} /33 puntos</h2>
                <h4>Sigue así!</h4>
            </div>;
        }
        if (totalPuntos > 15 && totalPuntos < 34) {
            message = <div>
                <h2>Felicidades!, has obtenido {totalPuntos} /33 puntos</h2>
                <h4>Envidio tu memoria... </h4>
            </div>;
        }
        setMessage(message);
    }
    const handleClick = () => {
        showMessage();
    };

    function SendData() {
        const totalPuntos = Score();
        console.log(totalPuntos);

        const reqBody = {
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
            question15: user.question15,
            score: totalPuntos,
        }; //javascript object

        fetch('/api/saveUser', {
            method: 'POST', //send the POST HTTP REQUEST
            body: JSON.stringify(reqBody), //lo envío como JSON
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

        console.log(reqBody);
        router.push('/');
        /* logout(); */
    }

    /* const logout = async () => {
        try {
            await axios.post('/api/logout')
            router.push('/')
        } catch (error) {
            console.log(error)
            router.push('/')
        }
    
    } */

    return (
        <div className={classes.container}>
            <div className={classes.containerHijo}>
                <h1> ENHORABUENA </h1>
                <h2>HAS FINALIZADO EL TEST!</h2>
                <p>Haz click en el botón para ver tus resultados</p>
                <button className={classes.btn} onClick={handleClick} >Ver Resultados</button>
                {message && <div>{message}</div>} {/* Muestra el mensaje si existe */}
                <br />
                <p>Haz click en este botón para enviar tus resultados y volver al inicio</p>
                <button className={classes.btn} onClick={SendData}>Finalizar Test</button>
            </div>
        </div>
    )
}

export default FinalPage;