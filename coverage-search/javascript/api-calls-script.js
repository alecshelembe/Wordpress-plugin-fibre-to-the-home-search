// Function to display the loading icon

function show_button(x) {
  // Select the element with the given ID and remove the "hidden" class
  var button = jQuery('#' + x);
  button.removeClass("hidden");
  jQuery('#prevButton').removeClass("hidden");
  button.addClass('animate-fly-in');
}

function createTable(data) {
  // Select the container where the cards will be appended
  var container = jQuery('#package-table');
  
  var headingcard = '<h3 class=\'m-4\'>'+data.fibre_network_operator+' Packages'+'<span class=\'text-gray-500 text-sm\'> - Select a package and press \'Next\' to continue</span></h3>';
  container.append(headingcard);
  var headingContainer = jQuery('<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id='+data.fibre_network_operator + 'Packages>');
  
  // container.append(headingcard,headingContainer);
  // Loop through the packages in the response and create a card for each package
  // var gridContainer = container.find('.grid');
  
  // Loop through the packages in the response and create a card for each package
  jQuery.each(data.packages, function(index, package) {
    
    // Create a card div with Tailwind CSS classes and the selected background color
      // var card = '<div class=" bg-purple-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform ease-in-out duration-300">';
      var card = '<div class=" hidden bg-purple-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform ease-in-out duration-300 fly-in">';

      // Add package details to the card
      card += '<p class="absolute top-0 left-0">';
      // card += '<img src='+package.fno_logo+' alt="Image Description" class="w-14 h-14" style=\'border-radius:50%;\'>';
      card += '</p>';

      card += '<h2 class="text-center font-semibold text-gray-800 mb-2">' +package.fibre_network_operator +  '</h2>';
      card += '<p class="text-center text-2xl font-bold text-gray-600 "> ' + package.monthly_price +  ' / pm </p>';
      card += '<p class="text-center text-lg font-bold">' + package.download_speed +' | '+ package.upload_speed +'</p>';
      card += '<p class="text-center text-sm font-bold">'+ package.router +'</p>';
      card += '<p class="text-center text-sm font-bold">'+ package.uncapped +'</p>';
      if(package.special){
        card += '<p class="text-center text-sm font-bold">'+ package.special +'</p>';
      }
      
      switch (package.tag) {
        case 'POPULAR':
        card += '<p class="absolute rounded-lg right-0 top-0 text-sm font-bold text-white mb-2 transform rotate-45 border p-1 transition-transform duration-4000 ease-in-out bg-pink-500">' + package.tag + '</p>';
          break;
        case 'OFCP':
        card += '<p class="absolute rounded-lg right-0 top-0 text-sm font-bold text-white mb-2 transform rotate-45 border p-1 transition-transform duration-4000 ease-in-out bg-red-500">' + package.tag + '</p>';
        break;
        case 'BEST VALUE':
        card += '<p class="absolute rounded-lg right-0 top-0 text-sm font-bold text-white mb-2 transform rotate-45 border p-1 transition-transform duration-4000 ease-in-out bg-blue-500">' + package.tag + '</p>';
          break;
        case 'PROMO':
        card += '<p class="absolute rounded-lg right-0 top-0 text-sm font-bold text-white mb-2 transform rotate-45 border p-1 transition-transform duration-4000 ease-in-out bg-green-500">' + package.tag + '</p>';
          break;
        case 'BLACK FRIDAY':
        card += '<p class="absolute rounded-lg right-0 top-0 text-sm font-bold text-white mb-2 transform rotate-45 border p-1 transition-transform duration-4000 ease-in-out bg-black">' + package.tag + '</p>';
          break;
        default:
          // Handle the case when package.tag is empty or falsy (e.g., do nothing or provide an alternative content).
          break;
      }
      
      var ThePackage = package.monthly_price+' '+package.download_speed+' '+package.upload_speed+' '+package.fibre_network_operator;
      var ThePackage = ThePackage.replace(/ /g, "_");

      card += '<label class=\'flex justify-center\'><input type=\'radio\' onclick=show_button(\'nextButton\') value='+ThePackage+' name=\'package\'><span class=\'"px-4 py-2 p-2 m-4 text-center cursor-pointer text-base font-semibold rounded-lg bg-purple-500 text-white hover:bg-blue-600 rounded-lg rounded-full shadow-md transition-transform transform hover:scale-110\'>Select</span></label>';
       
      if (package.installation_fee == 'Free'){
        card += '<p class="text-sm border rounded-lg p-1 text-white bg-blue-500 text-center ">Installation ' + package.installation_fee + '</p>';
      } else {
        card += '<p class="text-sm text-center text-gray-600">Installation ' + package.installation_fee + '</p>';
      }
      
      if(package.new_lines){
        card += '<p class=" text-sm p-1 text-blue-500 font-bold text-center ">'+ package.new_lines + '</p>';
      }

      if(package.was_monthly_price){
        card += '<p class="line-through text-sm p-1 text-red-500 font-bold text-center ">' + package.was_monthly_price + '</p>';
      }


      // Close the card div
      card += '</div>';
      
      // Append the card to the grid container
      headingContainer.append(card);

       // Apply the fly-in animation to the newly appended card
    var $newCard = headingContainer.children().last();
    setTimeout(function() {
        $newCard.addClass('animate-fly-in');
        $newCard.removeClass('hidden');
    }, index * 100); // Adjust the delay as needed

      container.append(headingContainer);
    });
  }

function showLoadingIcon() {
 
    // Remove the "hidden" class from the loading spinner
    jQuery("#loader-icon").removeClass("hidden");
    jQuery("#checkCoverage").val("We're still searching...");
    console.log('Loading...');
  }
  
  // Function to hide the loading icon
  function hideLoadingIcon() {
    // Replace this with code to hide your loading icon
    jQuery("#loader-icon").addClass("hidden");
    jQuery("#checkCoverage").val("Check Coverage");
    console.log('Loading completed.');

  }

  // Function to run sequential API calls with loading indicator
  async function runSequentialApiCallsWithLoading(apiUrls) {
    // Display the loading icon before starting the API calls
    showLoadingIcon();

    const results = [];
    
    for (const apiUrl of apiUrls) {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          // Handle API call errors here if needed
          throw new Error(`API call failed with status ${response.status}`);
        }

      const data = await response.json();
      results.push({ success: true, data });
      if(data.coverage == "Available"){
        // jQuery("#coverage_result").append(data.fibre_network_operator);
        // Call a function to create a table with the response data and operator name
        createTable(data);
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error(`API call error: ${error.message}`);
      results.push({ success: false, error: error.message });
    }
  }
  
   // Check if the specific value is present in any of the API responses
   valueToCheck = 'Available';
   
   // Hide the loading icon after the API calls are completed
   hideLoadingIcon();
   
  //  return results;
   const foundValueResults = results.filter((result) => {
    if (result.success) {
      // Replace 'coverage' with the actual property name you want to check
      return result.data.coverage === valueToCheck;
    }
    return false; // Skip unsuccessful API calls
  });
 
  if (foundValueResults.length === 0) {
    console.log(`The desired value '${valueToCheck}' was not found in any API response.`);
    jQuery("#coverage_result").html('<div class="border border-gray-300 rounded-lg p-4 "><h1 class=\'text-2xl font-semibold\'>Oops! Sorry No coverage found for this address.</div>');

  } else{
    jQuery("#coverage_result").html('<div class="border border-gray-300 rounded-lg p-4 "><p class=\'text-2xl font-semibold\'>Congratulations, you\'re covered! </p></div>');
  }
  
  return foundValueResults;
  }


// Wait for the document to be fully loaded before executing the script
jQuery(document).ready(function () {
  // Hide the select element with the ID "select_package"
  jQuery('#select_package').hide();
  
  // Attach a click event handler to the "checkCoverage" button
  jQuery("#checkCoverage").click(function () {
    // Initialize a flag to control further calls (assuming it's declared elsewhere)
    stopFurtherCalls = false;
    jQuery('#nextButton').addClass("hidden");
    // Clear the content of certain HTML elements
    jQuery('#package-table').empty();
    jQuery('#coverage_result').empty();
    jQuery('#package').empty();
    jQuery('#coverage_result_fno_list').empty();
    jQuery('#coverage_result_fno_list').addClass("hidden");

    // Get the user-entered address
    var address = document.getElementById('address-input').value;
    
    // Replace with your Google Maps API key
    var api_key = "AIzaSyBqS16Ak-yZg-C5bBGgOz8_Z1BUhV-35j0"; // Replace with your API key
    
    // Construct the URL for the Google Maps Geocoding API request
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=" + api_key;

    // Check if the address is empty
    if (address == '') {
      // Display an error message and add a "pulse" class for visual effect
      jQuery("#Enter_address").html('<h1 class=\'text-red-500 text-2xl\'>Please enter an address to continue</h1>');
      jQuery("#Enter_address").addClass("pulse");
      return false;
    }
  
    // Make an AJAX request to the Google Maps Geocoding API
    jQuery.ajax({
      url: url,
      method: "GET",
      success: function (response) {
        // Check if the Geocoding request was successful and there is at least one result
        if (response.status === "OK" && response.results.length > 0) {
          // Extract latitude and longitude from the response
          var location = response.results[0]?.geometry?.location || { lat: 0, lng: 0 };
          var latitude = location.lat || 0;
          var longitude = location.lng || 0;
          var location_type = response.results[0]?.address_components[3]?.long_name || "Unknown";
          var postal_code = response.results[0]?.address_components[7]?.long_name || "Unknown";
          var city = response.results[0]?.address_components[4]?.long_name || "Unknown";
          var location_id = null; // You can set this to a default value or null as needed

          
          if (location_type.includes("Cape Town")) {
            location_id = 6
          } else if (location_type.includes("Johannesburg")) {
            location_id = 5
          } else {
            location_id = 5
          }
          
          // Set the latitude and longitude in corresponding input fields
          jQuery("#LongitudeInput").val(longitude);
          jQuery("#LatitudeInput").val(latitude);
          jQuery("#LocationInput").val(location_id);
          jQuery("#PostalcodeInput").val(postal_code);
          jQuery("#CityInput").val(city);
          // Example usage:
          var operatorUrls = [
            "../../wp-content/plugins/beta-coverage-map/all_lightwire-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/metrofibre-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/octotel-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/dnatel-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/ttconnect-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/thinkspeed-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/fsn-open-access-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/metrofibre-wip-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/auckland-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/openserve-search-api.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/vumatel-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/seacom-search-fttb-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/frogfoot2-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/frogfoot-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            "../../wp-content/plugins/beta-coverage-map/seacom-search-ftth-kml.php?latitude=" + latitude + '&longitude=' + longitude,
            
          ];

        runSequentialApiCallsWithLoading(operatorUrls)
        .then((results) => {
          // Handle the results of the API calls here
          console.log('API call results:', results);

          jQuery('#coverage_result_fno_list').removeClass("hidden");
            results.forEach((result, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("p-2");
            listItem.innerHTML = '<i class="fas fa-check-circle" style="color: #37ff00;"></i> ' + result.data.fibre_network_operator;

            // Append the list item to your list or container
            // For example, if you have a ul with id "my-list":
            // document.querySelector("#my-list").appendChild(listItem);

            // Assuming there's an unordered list with the id "coverage_result_fno_list"
            jQuery('#coverage_result_fno_list').append(listItem);
        });
        
        })
        .catch((error) => {
          // Handle any errors that occurred while running the API calls
          console.error('Error running API calls:', error);
        });


        } else {
          console.log("Geocoding failed " + url);
          return false;
        }
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error: " + status + " - " + error);
        jQuery("#coverage_result").html("AJAX Error: " + status + " - " + error);
      }
    });
  });
});
