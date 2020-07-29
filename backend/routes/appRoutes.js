import { addNewPatient, getAllPatients } from '../controllers/patientController.js';
import { addNewPractitioner, getAllPractitioners, getAllSpecialties, getPractitionersBySpecialty } from '../controllers/pracititionerController.js'
import { addNewVisit, getAllVisits} from '../controllers/visitController.js'

const routes = (app) => {
    app.route('/patient')
        .post(addNewPatient)
        .get(getAllPatients);

    app.route('/practitioner/:specialty')
        .get(getPractitionersBySpecialty);

    app.route('/practitioner')
        .post(addNewPractitioner)
        .get(getAllPractitioners);

    app.route('/specialty')
        .get(getAllSpecialties);

    app.route('/visit')
        .post(addNewVisit)
        .get(getAllVisits);

}
export default routes;
