function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft").value;
  var bhk = document.getElementById("uiBHK").value;
  var bathrooms = document.getElementById("uiBathrooms").value;
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  // Validation: Ensure all fields are filled
  if (sqft === "" || bhk === "" || bathrooms === "" || location === "") {
      alert("Please enter all fields properly.");
      return;
  }

  // Convert values to proper types
  sqft = parseFloat(sqft);
  bhk = parseInt(bhk);
  bathrooms = parseInt(bathrooms);

  // API Request to Backend
  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(url, {
      total_sqft: sqft,
      bhk: bhk,
      bath: bathrooms,
      location: location
  }, function(data, status) {
      console.log("Received response: ", data);
      estPrice.innerHTML = "<h2>Estimated Price: ₹" + data.estimated_price + " Lakhs</h2>";
  });
}

function onPageLoad() {
  console.log("Document loaded");

  var url = "http://127.0.0.1:5000/get_location_names";

  $.get(url, function(data, status) {
      console.log("Received locations:", data);
      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");

          $("#uiLocations").empty();
          $("#uiLocations").append(new Option("Choose a Location", "", true, true));

          for (var i in locations) {
              $("#uiLocations").append(new Option(locations[i], locations[i]));
          }
      }
  });
}

window.onload = onPageLoad;
