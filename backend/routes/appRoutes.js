import { addNewPatient, getAllPatients } from '../controllers/patientController.js';
import { addNewPractitioner, getAllPractitioners, getAllSpecialties, getPractitionersBySpecialty, getNextAvailableDoctor } from '../controllers/pracititionerController.js'
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

    app.route('/test')
        .get(getNextAvailableDoctor);

}
export default routes;
