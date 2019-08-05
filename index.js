function showPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            alert('success');
        });
    } else {
        alert('Geolocation not supported');
    }
}

function successCallback(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;

    alert('success');
}

function errorCallback(error) {
    alert('Geolocation not supported');
}