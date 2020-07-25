import { addNewPatient, getAllPatients } from '../controllers/patientController.js';
import { addNewPractitioner, getAllPractitioners } from '../controllers/pracititionerController.js'
import { addNewVisit, getAllVisits} from '../controllers/visitController.js'
import { addNewDocument } from '../controllers/lockController.js'

const routes = (app) => {
    app.route('/patient')
        .post(addNewPatient)
        .get(getAllPatients);

    app.route('/practitioner')
        .post(addNewPractitioner)
        .get(getAllPractitioners);

    app.route('/visit')
        .post(addNewVisit)
        .get(getAllVisits);

    app.route('/lock')
        .post(addNewDocument);

}
export default routes;
