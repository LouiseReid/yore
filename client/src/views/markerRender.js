MarkerRender = function(location){
this.moveLocation(location);
};

MarkerRender.prototype.moveLocation = function (location) {
  console.log(location);
    var lat = location.Latlng[0];
    var lng = location.Latlng[1];
    var newCoords ={lat: lat, lng: lng};
    mainMap.addMarker(newCoords);
    console.log(newCoords);
    mainMap.repositionMap(newCoords, 7);
};

module.exports = MarkerRender;
