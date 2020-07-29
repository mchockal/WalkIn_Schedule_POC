import { updateVisitStatus } from '../controllers/visitController.js';

export const notifyWorker = async(queue) => {
    queue.process(async (job) => { 
        return await visitEncounter(job.data); 
    });
}

const visitEncounter = async(visit) => {
    /*This is where actual encounter happens - Video call / conference.
     Once that session is complete and returns, the encounter is marked 'done'
     And next item(patient) in queue can be processed(addressed).
     */
    console.log("Do something and wait for : "+ visit.consultationTime);
    await new Promise(resolve => setTimeout(resolve, 20000));
    return 1;
}

export const listenToEvents = async(queue) => {
    queue.on("active", activeHandler);
    queue.on("failed", failHandler);
    queue.on("completed", completedHandler);
}

const activeHandler = (job) => {
    updateVisitStatus(job.data._id, "In Progress");
    console.log(`You are now in session with doctor ${job.data.doctorId} - token #${job.data.token}`);
    //This will be a notification sent to everyone in frontend waiting on their pracitioner  
    let token = job.data.token+1;
    console.log(`Next up for doctor ${job.data.doctorId} token #${token}`); 
    //Alert next patient in queue
}

const failHandler = (job, err) => {
    console.log("Encounter failed for visitId : "+ job.data._id);
    //Retry here if needed after alerting the user.
}

const completedHandler = (job, result) => {
    updateVisitStatus(job.data._id, "Completed");
    console.log(`Encounter complete for doctor ${job.data.doctorId} and token #${job.data.token}`);  
    //Do something with result
}