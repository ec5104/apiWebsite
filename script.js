//old context stuff nothing new here
let context;
let button;
let playing = false;
let soundy;
let infoField;

window.onload = (event) => {
  soundy = document.querySelector("#soundy");
  console.log(soundy);
  infoField = document.querySelector("#info");
};


//set this to your desired address
let tommyLat = 40.693368073976764;
let tommyLong =-73.98795830821966;

//eltons
let eltonsLat = 40.69272122881661;
let eltonsLong = -73.98702333530535;


function checkLocation () {
  if ( 'geolocation' in navigator) {
  console.log(navigator);
  console.log ( 'geolocation available');
  console.log(navigator.geolocation.getCurrentPosition);
    
    //navigator geolocation getcurrentposition takes a callback function as an argument (provides coords when they are available )
  navigator.geolocation.getCurrentPosition(function(e) {
    console.log(e);
    renderLoc(e.coords.latitude, e.coords.longitude);
  }
                                          
  );

  } else {
  console.log ('geolocation not available');
  }

  function renderLoc (lat, lon) {
    if (Math.abs(lat - tommyLat) < .001 && Math.abs(lon - tommyLong) < .001 ) {
      console.log('youre there');
      infoField.innerHTML = "you're there 🌎"
      soundy.play();
    }
    else {
      console.log('nope not there');
      infoField.innerHTML = "nope not there 👎🏼"
    }
    
    //second site
    
    if (Math.abs(lat - eltonsLat) < .001 && Math.abs(lon - eltonsLong) < .001 ) {
      console.log('youre there');
      infoField.innerHTML = "you're there 🌎"
      soundy.play();
    }
    else if (Math.abs(lat - eltonsLat) < .001 && Math.abs(lon - tommyLong)) {
             
             
      console.log('nope not there');
      infoField.innerHTML = "nope not there 👎🏼"
    }
  }

}

