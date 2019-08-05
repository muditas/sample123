

var allRegisteredVehicles = [];
var previousKmReading = 0;
var currentKmReading = 0;


var url, method_name, body_data;


$(document).ready(function () {
    $(document).on("load", getVehicleDetails());
})


//ajax call function
function ajaxCall(url, method_name, body_data) {
    if (method_name === "POST") {
        return $.ajax({
            url: url,
            type: method_name,
            data: body_data
        })
    }

    else {
        return $.ajax({
            url: url,
            type: method_name

        })
    }
}

$("#addTripButton").click(function() {
    addTripDetails(event);
});


// ///////////////////////////////////////

//to store data in DB on registering details--
// function register_vehicle_form() {
//     var data = {};
//     var myForm = $('#myForm').serializeArray();

//     var empty = true;
//     $('input[type="text"]').each(function () {
//       if ($(this).val() != "") {
//         empty = false;
//         return false;
//       }
//     });

//     if (empty === true) {
//       swal({
//         title: "Please enter details!",
//         icon: "warning",
//         button: "Ok",
//       })
//     } else {
//       $.each(myForm, (i, pair) => {
//         data[pair.name] = pair.value;
//       })


//       url = "http://localhost:3000/vehicle";
//       method_name = "POST";
//       body_data = data;



//       ajaxCall(url, method_name, body_data)
//         .done(() => {
//           //alert("Your data submitted succesfully!!!!");
//           swal({
//             title: "Vehicle Registered!",
//             text: "Successfully",
//             icon: "success",
//             button: "Ok",
//           });

//           $('#myForm')[0].reset();
//           return false;
//         })
//         .fail((error) => {
//           swal("Sorry!", "Vehicle not Registered", "error");
//         })
//     }

//   }


// fetching details drop down
function getVehicleDetails() {
    url = "http://localhost:3000/vehicle";
    method_name = "GET";

    ajaxCall(url, method_name, body_data)
        .done((vehicles) => {
            generateVehiclesDetails(vehicles)
            // vehicleDropDown(vehicles);
            allRegisteredVehicles = vehicles;
        })
}

//showing of dropdown

function generateVehiclesDetails(vehicles) {
    if (vehicles.length !== 0) {
        $.each(vehicles, (x, vehicle) => {
            var o = new Option(vehicle.name + " " + vehicle.number, vehicle.number)
            $("#dropDown").append(o);

        })
    }
    else {
        return;
    }
}

//function vehicle select on dropdown

function selectYourVehicle() {
    var selectedVehicleNumber = $('#dropDown')[0].value;
    getLastTripDetails(selectedVehicleNumber);
    getAllTripsOfVehicle(selectedVehicleNumber);


}





// var request = $.ajax({
//     url: "http://localhost:3000/vehicle",
//     type: "POST",
//     data: JSON.stringify({
//         Name: "Test",
//         Credits: 0
//     }),
//     contentType: "application/json",
// });

// request.done(function(msg) {
//   $("#log").html( msg );
// });

// request.fail(function(jqXHR, textStatus) {
//   alert( "Request failed: " + textStatus );
// });
//////////////////////////////////

// function getVehicleDetails() {
//     console.log('hello');
//     fetch("http://localhost:3000/vehicle", {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then((data) => {
//             return data.json();
//         })
//         .then((vehicles) => {
//             allRegisteredVehicles = vehicles;
//             generateVehiclesDetails(vehicles);
//         })
// }
// function generateVehiclesDetails(dropDown) {
//     var vehicleDropDown = document.getElementById('dropDown');
//     var i = 1;
//     if (dropDown.length !== 0) {
//         dropDown.forEach((vehicle) => {
//             vehicleDropDown.options[i] = new Option(vehicle.name + ' ' + vehicle.number, vehicle.number)
//             i++;
//         });
//     }
// }






// function selectYourVehicle() {
//     var selectedVehicleNumber = document.getElementById('dropDown').value;
//     getAllTripsOfVehicle(selectedVehicleNumber);

// }
function getLastTripDetails(selectedVehicleNumber) {
    url = "http://localhost:3000/getLastTrip/" + selectedVehicleNumber;
    method_name = "GET";

    ajaxCall(url, method_name, body_data)
        .done((lastTripDetails) => {
            previousKmReading = 0;

            if (lastTripDetails.length !== 0) {
                previousKmReading = lastTripDetails[0].kms;
                $('#previousKmReading').html("previous km reading:" + previousKmReading);
            }
            else {
                var vehicleDetails = allRegisteredVehicles.filter((vehicle) => {
                    return vehicle.number === selectedVehicleNumber;
                });
                previousKmReading = vehicleDetails[0].kms;
                $('#previousKmReading').html("previous km reading" + previousKmReading);
            }


            calculateTrip();

            //To set minimum current value
            var minKmsValue = $("#currentKms")[0];
            minKmsValue.setAttribute("min", previousKmReading);

        })
}





//Total Kms in Trip
function calculateTrip() {
    var previousKmReading = 0;
var currentKmReading = 0;

currentKmReading = $("#currentKms")[0].value;

    if (currentKms !== "") {
        var kmInTrip = currentKmReading - previousKmReading;
        $("#TotalKms").html("Total Kms in Trip: " + kmInTrip);
    } else {
        $("#TotalKms").html("");
    }
}

/////////////////////////////////////////////////////////////////////////

//Function to add trip details and show as well on submission--
function addTripDetails(event) {

    // var form = new FormData();
    // var data = {
    //     kms: Number(form.get("kms")),
    //     totalFuelPrice: Number(form.get("fuelPrice")),
    //     pricePerLtr: Number(form.get("price")),
    //     totalFuelFilled: Number(form.get("totalfuelfilled")),
    //     date: new Date(form.get("date")),
    //     number: $('#dropDown').value
    // };

    // console.log(details);
// //////////////////////////////////////////////////
var formData={};
  $("#addTripDetailsForm").submit(function(event){
      formData = $(this).serializeArray();
      event.preventDefault();

    $.ajax({
   type: 'POST',
   url: 'http://localhost:3000/trip/',
   
   data: formData

      }
          
      )
      .done((data)=>{
          console.log(data);
      }

      )
  }

  );


    // var data=[];
    // var formData= {};
    // var data=$("#addTripDetailsForm").serializeArray();
    // $.each(data,function(index,element){
    //     formData = element.value;
    // });

    // $.ajax({
    // url :"http://localhost:3000/trip/",
    // method: 'POST',
    // data : formData
    // })
    // .done(() =>{
    //     $("#total_fuel_fill").html="";
    //     $("#previousKmReading").html="";

    // })


    // var empty = true;
    // $('input[type="text"]').each(function () {
    //     if ($(this).val() != "") {
    //         empty = false;
    //         return false;
    //     }
    // });

    // if (empty === true) {
    //     swal({
    //         title: "Please enter the details!",
    //         icon: "warning",
    //         button: "Ok",
    //     });
    // }
    // else {


    //     ajaxCall(url, method_name, data)
    //         .done(() => {
    //             //alert("Your data submitted succesfully!!!!");

    //             showTripDetails(vehicleNumberSelected);
    //             $("#addTripDetailsForm").trigger("reset");
    //             $("#TotalKms").html("");
    //             $("#previousKmsReading").html("");
    //             swal({
    //                 title: "Trip added successfully!",
    //                 text: "Woohoo !!!",
    //                 icon: "success",
    //                 button: "Ok",
    //             });

    //         })

    // }

}


function deleteTrip(){
    var deleteId=event.target.id;
    var vehicleNumber=event.target.getAttribute("vno");

    url="http://localhost:3000/trip/"+deleteId;
    method_name="DELETE";
    
    then((willDelete)=> {
        if(willDelete){
            ajaxCall(url,method_name,body_data)
            .done(()=> {
                alert("trip deleted successfully");
            });
            showTripDetails(vehicleNumber)
            lastTripDetails(vehicleNumber)
        }
    });


    }

function getAllTripsOfVehicle(selectedVehicleNumber) {
    url = "http://localhost:3000/getTripsForVehicle/" + selectedVehicleNumber;
    method_name = 'GET';

    ajaxCall(url, method_name, body_data)


        // .done((details) => {
        //     return details.json();
        // })
        .done((vehicleTrips) => {
            // vehicleTrips[vehicleTrips.length - 1].kms;
            if (vehicleTrips.length !== 0) {
                var previousKmReading = vehicleTrips[vehicleTrips.length - 1].kms;
                $('#previousKmReading').html("previous km reading:" + previousKmReading);
            }
            else {
                var vehicleDetails = allRegisteredVehicles.filter((vehicle) => {
                    return vehicle.number === selectedVehicleNumber;
                });
                var previousKmReading = vehicleDetails[0].kms;
                $('#previousKmReading').html("previous km reading" + previousKmReading);
            }
            renderTripsTable(vehicleTrips);
            //console.log(vehicleTrips);

        })
}
function renderTripsTable(trips) {


    var registedVehicle = allRegisteredVehicles.filter((vehicle) => {
        return vehicle.number === trips[0].number;
    });

    trips.forEach((trip, index, trips) => {
        var currentDate = new Date(trip.date);
        var date = currentDate.getDate() + '/' + parseInt(currentDate.getMonth()) + "/" + parseInt(currentDate.getFullYear());

        if (index === 0) {
            previousKmReading = registedVehicle[0].kms;
            currentKmReading = trip.kms;
        }
        else {
            previousKmReading = trips[index - 1].kms;
            currentKmReading = trip.kms;
        }

        //console.log(currentKmReading+" "+ previousKmReading);

        var tripHtml = $('#vehicleTrip');
        tripHtml.html(` 
      <tr>
        <td>${index + 1}</td>
        <td>${date}</td> 
        <td>${trip.kms}</td> 
        <td>${calculateKmsInTrip(currentKmReading, previousKmReading)}</td>
        <td>${calculateAverage(calculateKmsInTrip(currentKmReading, previousKmReading), trip.totalFuelPrice, trip.pricePerLtr)}</td>
        <td>${calculateRsPerKms(trip.totalFuelPrice, calculateKmsInTrip(currentKmReading, previousKmReading))}</td>
        
      </tr>
      <button class="btn btn-primary col-md-3" id="addTripButton"> DELETE </button>
      `);

    });
}

function calculateKmsInTrip(currentKmReading, previousKmReading) {
    return (Number(currentKmReading) - Number(previousKmReading)).toFixed(2);
}

function calculateAverage(kmsInTrip, totalFuelPrice, pricePerLtr) {
    return (Number(kmsInTrip) / (Number(totalFuelPrice) / Number(pricePerLtr))).toFixed(2);
}

function calculateRsPerKms(kmsInTrip, totalFuelPrice) {
    return (Number(totalFuelPrice) / (Number(kmsInTrip))).toFixed(2);
}
