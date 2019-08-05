var fetch= require('node-fetch');
async function getVehicleDetails(){
    var vehicleDetails= await fetch('http://localhost:3000/vehicle');
    vehicleDetails
    var vehicleData= await vehicleDetails.json();
    vehicleData
}

getVehicleDetails();
