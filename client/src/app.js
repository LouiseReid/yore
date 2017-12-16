var InfoView = require('./views/infoView');
var ChoicesRender = require('./views/choicesRender');
var Interactions = require("./interactions");
var map = require("./mapWrapper");
var MarkerRender = require('./views/markerRender.js')

currentPosition = 0;
currentEvent = 0;

var app = function(){
  url = "http://localhost:3000/getlocations";
  makeRequest(url, requestLocations);

  //Following displays map on load:
  var container = document.getElementById('map-container');
  var coords = [56.4907, -4.2026];
   mainMap = new MapWrapper(container, coords, 6);

  var modal = document.getElementById('myModal');
  var span = document.getElementById("modal-close");
  modal.style.display = "block";
  span.onclick = function() {
    // this.style.marginRight = "2px";
    // this.style.marginBottom = "4px";
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var move = document.getElementById("next");
  move.addEventListener("click", function(){
      changePosition();
      determineLocation(currentlocation);
  })
  //
  // var move = document.getElementById('advance')
  // move.addEventListener('click', function(){
  //   changePosition();
  //   makeRequest(url, requestLocations)
  // })
  //
  // var btn = document.getElementById('next')
  // btn.addEventListener('click', function(){
  //   addTimelineEvent();
  // })

};

var makeRequest = function(url, callback){
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var requestLocations = function(){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var journeyInfo = JSON.parse(jsonString);
  determineLocation(journeyInfo)
}

var determineLocation = function(locations){
  var location = new InfoView(locations[currentPosition])
  var currentlocation  = new MarkerRender(locations[currentPosition]);
  renderEventChoices(locations[currentPosition].events[currentEvent]);
}

var renderEventChoices = function(event){
  var thisEvent = new ChoicesRender(event);
}

var changePosition = function(){
  currentPosition ++
}

var changeEvent = function(){
  currentEvent++;
}

var addTimelineEvent = function(){
  var timeline = document.getElementById('timeline');
  var timelineObject = document.createElement('div');
  var joiner = document.createElement('div');
  joiner.className = "joiner";
  timelineObject.className = "timeline-object";
  timelineObject.innerText = "last place"
  timeline.appendChild(joiner);
  timeline.appendChild(timelineObject);
}

var renderNewMarker = function(locations){
    var currentlocation  = new MarkerRender(locations[currentPosition]);
};


window.addEventListener("load", app);
