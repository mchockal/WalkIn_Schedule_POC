import Queue from 'bull';
import { getPractitionerById } from '../controllers/pracititionerController.js'
import { notifyWorker, listenToEvents } from './consumer.js';

export const scheduleWalkIn = async(visit) => {
    if (global.qMap.has( visit.doctorId )) {
        //Queue for practitioner exists, so simply push visit to queue.
        await global.qMap.get(visit.doctorId).add(visit);
    }
    else {
        //Get pracitioner details to create named queue.
        let practitioner = await getPractitionerById( visit.doctorId );
        let qName = practitioner.specialty + "_" + practitioner.lName + "_queue";
        let qObject = new Queue(qName, process.env.REDIS_URL);    
        //Add newly created queue to the list of available queues. 
        global.qMap.set(visit.doctorId, qObject); 
        console.log(visit);
        //Add incoming visit request to the corresponding pracitioner queue.
        await qObject.add(visit);
        addQueueInfoForArena(qName, practitioner.specialty);
        notifyWorker(qObject);
        listenToEvents(qObject);
    }
}

const addQueueInfoForArena = (qName, hostId) => {
    global.qArena.push( {
        'name': qName,
        'hostId': hostId,
        'redis': process.env.REDIS_URL 
    });
}