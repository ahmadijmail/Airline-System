'use strict';

const AirlineEvent = require("./events")
const {faker} = require('@faker-js/faker');





setInterval(() => {
   let id= faker.datatype.number()
   let name=faker.name.findName();
   let destination=faker.address.country();
   

   let flight= {
    event: 'new-flight',
    time: new Date(),
    Details: {
        airLine: 'Royal Jordanian Airlines',
        destination: destination,
        pilot: name,
        flightID: id,
    }
    
   }
   console.log(`Manager: new flight with ID '${flight.Details.flightID}' have been scheduled`);
   let payload = {flight:flight,Details:flight.Details};
   AirlineEvent.emit('new-flight', payload); 
  // console.log(payload);
}, 10000)


AirlineEvent.on("arrived", notifyarrived)

function notifyarrived(payload){
    setTimeout(() => {
        
        console.log(`Manager: we're greatly thankful for the amazing flight, ${payload.Details.pilot}`);            
    }, 10);
}