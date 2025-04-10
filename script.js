let context;
let button;
let playing = false;
let soundy;
let infoField;
let toggleBtn;

// Location tracking
let lastLat = null;
let lastLong = null;
let lastTime = null;

window.onload = (event) => {
  soundy = document.querySelector("#soundy");
  infoField = document.querySelector("#info");
  toggleBtn = document.querySelector("#toggleSound");

  const output = document.getElementById("output");
  console.log("Output element:", output); // debug

  toggleBtn.addEventListener("click", () => {
    if (soundy.paused) {
      soundy.play();
      toggleBtn.innerHTML = "⏸ Pause";
    } else {
      soundy.pause();
      toggleBtn.innerHTML = "▶️ Play";
    }
  });
};

function checkLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(e) {
      renderLoc(e.coords.latitude, e.coords.longitude);
    });
  } else {
    console.log('geolocation not available');
  }
}

function renderLoc(lat, lon) {
  let currentTime = Date.now();

  if (lastLat !== null && lastLong !== null && lastTime !== null) {
    let timeDiff = (currentTime - lastTime) / 1000;
    let distance = getDistanceFromLatLonInKm(lastLat, lastLong, lat, lon);
    let pace = distance / (timeDiff / 3600);
  
    console.log(`Pace: ${pace.toFixed(2)} km/h`);
    document.getElementById("output").innerHTML = `${pace.toFixed(2)} km/h`;
  
    let rate = Math.min(Math.max(pace / 5, 0.5), 2);
    soundy.playbackRate = rate;
  } else {
    document.getElementById("output").innerHTML = `0 km/h`;
  }

  lastLat = lat;
  lastLong = lon;
  lastTime = currentTime;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

setInterval(checkLocation, 5000); 