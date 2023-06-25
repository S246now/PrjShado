//POST req into json file
import fs from 'fs';
import path from "path";

export function buildPath() {
    return path.join(process.cwd(), 'data', 'userData.json');
}
export function extractData(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

function SaveUser(req, res) {
    if (req.method === 'POST') {
        // extract de info
        const age = req.body.edad;
        const student = req.body.estudiante;
        const carreer = req.body.carrera;
        const question1 = req.body.question1;
        const question2 = req.body.question2;
        const question3 = req.body.question3;
        const question4 = req.body.question4;
        const question5 = req.body.question5;
        const question6 = req.body.question6;
        const question7 = req.body.question7;
        const question8 = req.body.question8;
        const question9 = req.body.question9;
        const question10 = req.body.question10;
        const question11 = req.body.question11;
        const question12 = req.body.question12;
        const question13 = req.body.question13;
        const question14 = req.body.question14;
        const question15 = req.body.question15;
        const score = req.body.score;

        // create user object
        const newUser = {
            edad: age,
            esEstudiante: student,
            carrera: carreer,
            pregunta1: question1,
            pregunta2: question2,
            pregunta3: question3,
            pregunta4: question4,
            pregunta5: question5,
            pregunta6: question6,
            pregunta7: question7,
            pregunta8: question8,
            pregunta9: question9,
            pregunta10: question10,
            pregunta11: question11,
            pregunta12: question12,
            pregunta13: question13,
            pregunta14: question14,
            pregunta15: question15,
            puntaje: score,
        };
        const filePath = buildPath();
        const data = extractData(filePath);
        data.push(newUser); //interact with the array pushing el nuevo user
        fs.writeFileSync(filePath, JSON.stringify(data));//lo re escribimo
        res.status(201).json({ message: 'Success!', user: newUser }) //send back a response
    }
}

export default SaveUser;