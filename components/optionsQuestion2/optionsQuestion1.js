//componente de opciones
import { useRouter } from "next/router";
import { useState } from "react";
import classes from '../../styles/extra.module.css'

function OptionsQ1() {

    const [selectedOption, setSelectedOption] = useState('');
    const router = useRouter();

    const handleOptionChange = (event) => {
        //guarda el valor seleccionado en 'selectedOption'
        setSelectedOption(event.target.value);
    };

    //recupero datos de anterior página (userForm)
    const { userData } = router.query;
    function sendDataAndContinue(event) {
        try {
            const user = JSON.parse(userData);
            // Continuar con la lógica después de analizar los datos exitosamente

        event.preventDefault();

        const newUser = {
            age: user.age,
                student: user.student,
                carreer: user.carreer,
                question1: user.question1,
                question2: user.question2,
                question3: user.question3,
                question4: user.question4,
                question5: user.question5,
                question6: selectedOption ?? '',
            };

        // Pass userData as a prop when navigating to the QuestionPage
        const path = '/questions/factor2/question2';
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

    return(
        <div>
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
                    <audio src="/audio/factor2-1a.m4a" type="audio/mp3" controls />
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
                    <audio src="/audio/factor2-1b.m4a" type="audio/mp3" controls />
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
                    <audio src="/audio/factor2-1c.m4a" type="audio/mp3" controls />
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
                    <audio src="/audio/factor2-1d.m4a" controls />
                </label>
            </div>

            <br />
            <button className={classes.btn} onClick={sendDataAndContinue} disabled={!selectedOption}>Continuar</button>
        </div>
    )
}

export default OptionsQ1;