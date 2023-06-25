import classes from '../styles/extra.module.css'

function ErrorPage() {
    return (
        <div className={classes.container}>
            <div className={classes.containerHijo}>
                <h2>Wow, no respondiste la pregunta anterior verdad?</h2>
                <p>Te recordamos que es necesario seleccionar una opción en cada pregunta</p>
                <p>caso contrario, tu progreso será anulado y deberás comenzar de nuevo.</p>
                <br />
                <button className={classes.btn} >Volver al Inicio</button>
            </div>
        </div>
    )
}

export default ErrorPage;