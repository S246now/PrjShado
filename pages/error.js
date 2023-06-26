import Link from 'next/link';
import classes from '../styles/extra.module.css'

function ErrorPage() {
    return (
        <div className={classes.container}>
            <div className={classes.containerHijo}>
                <h2>Wow, no respondiste la pregunta anterior verdad?</h2>
                <p>Te recordamos que es necesario seleccionar una opción en cada pregunta</p>
                <p>caso contrario, tu progreso será anulado y deberás comenzar de nuevo.</p>
                <br />
                <Link className={classes.btn} href='/' >Volver al Inicio</Link>
            </div>
        </div>
    )
}

export default ErrorPage;