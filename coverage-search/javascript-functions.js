jQuery(document).ready(function(jQuery) {
var input = document.getElementById('address-input'); // ID of your address input field

var options = {
        types: ['geocode'],
        componentRestrictions: { country: 'ZA' },
        };
var autocomplete = new google.maps.places.Autocomplete(input, options);
autocomplete.addListener('place_changed', function() {
    // Show the icon.
    var address = document.getElementById('address-input');
    getAddressData(address.value);
    
    });
});

function getAddressData(address){
    var api_key = ""; // Replace with your API key
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=" + api_key;

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
                var location_id = 5; // You can set this to a default value or null as needed
    
                if (city.includes("Cape Town")) {
                location_id = 6
                } else if (city.includes("Johannesburg")) {
                location_id = 5
                } else {
                location_id = 5
                }
            }
            console.log(location,latitude,longitude,location_type,postal_code,city);
            jQuery("#google_location").val(location)
            jQuery("#google_latitude").val(latitude)
            jQuery("#google_longitude").val(longitude)
            jQuery("#google_location_type").val(location_type)
            jQuery("#google_postal_code").val(postal_code)
            jQuery("#google_city").val(city)
            jQuery("#location_id").val(location_id)

            startSearch(latitude,longitude);
            
        },
        error: function (xhr, status, error) {
        console.error("AJAX Error: " + status + " - " + error);
        jQuery("#coverage_result").html("AJAX Error: " + status + " - " + error);
    }

});

}

function startSearch(latitude, longitude) {
    jQuery('#congratulations_result').empty();
    // createDeactivateAccountModal();
    jQuery(".relative").remove();
    var modalContent = generateModalContent();
    jQuery('body').append(modalContent);

    // Animate the fade-in effect by changing the opacity
    jQuery('.fadeIn').animate({
      opacity: 1
    }, 500); // Adjust the duration as needed

    function logResults(results, expectedLength) {
        // Check if all requests have completed
        if (results.length === expectedLength) {
            // Log results to the console

            jQuery('#packages_show').empty();
            jQuery('#fibre_network_providers').empty();
            hideModal();

            let congratulationsResult = ''; // Declare the variable outside the loop to store the Congratulations message

            results.forEach(function (result) {
                if (result.data) {
                    console.log('Data:', result.data);
                    
                    if (result.data.coverage == 'Available') {
                        sendAjaxRequestForCoverageSearch('fibre_network_operator', result.data.provider, 'test2', 'value2', '../../wp-content/plugins/coverage-search/test.php');
                        congratulationsResult = '<p><i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Congratulations, your area is fibre ready!</p>';
                    }
                } else if (result.error) {
                    console.log('Error:', result.error);
                }

                console.log('-----------------------');
            });

            if (congratulationsResult) {
                jQuery('#congratulations_result').removeClass('hidden').html(congratulationsResult);
            } else {
                jQuery('#congratulations_result').removeClass('hidden').text('Sorry, No fibre available at the moment');
            }
        }
    }

    function sendRequest(url) {
        return new Promise(function (resolve, reject) {
            jQuery.ajax({
                url: url,
                method: 'GET',
                success: function (data) {
                    resolve({ url: url, data: data });
                },
                error: function (error) {
                    reject({ url: url, error: error });
                }
            });
        });
    }

    function sendRequests(operatorUrls) {
        jQuery('#loader').removeClass('hidden');
        
        console.log('Started Search');
        var promises = [];

        // Use Promise.all to wait for all promises to resolve
        Promise.all(operatorUrls.map(sendRequest))
            .then(function (results) {
                logResults(results, operatorUrls.length);
            })
            .catch(function (error) {
                console.error('Error:', error);
            })
            .finally(function () {
                console.log('Finished Search');
                jQuery('#loader').addClass('hidden');

            });
    }

    var operatorUrls = [
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/all_lightwire-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/metrofibre-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/octotel-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/dnatel-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/ttconnect-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/thinkspeed-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/fsn-open-access-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/metrofibre-wip-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        // "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/auckland-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/openserve-search-api.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/vumatel-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/seacom-search-ftth-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        // "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/seacom-search-fttb-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/frogfoot1-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/frogfoot1b-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/frogfoot2-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        "../wp-content/plugins/coverage-search/check_firbre_network_operator_service/frogfoot2b-search-kml.php?latitude=" + latitude + '&longitude=' + longitude,
        
      ];

      sendRequests(operatorUrls);
}

// Function to create a card with given data
function createCardWithInfo(data) {
    let newCard = '<div class="card p-6">';
    newCard += '<h2 class="text-xl font-semibold mb-2">' + data.package_name + '</h2>';
    newCard += '<p><strong>Download Speed:</strong> ' + data.download_speed + ' Mbps</p>';
    newCard += '<p><strong>Upload Speed:</strong> ' + data.upload_speed + ' Mbps</p>';
    newCard += '<p><strong>Internet Service Provider:</strong> ' + data.internet_service_provider + '</p>';
    newCard += '<p><strong>Router:</strong> ' + data.router + '</p>';
    newCard += '<p><strong>Uncapped:</strong> ' + (data.uncapped ? 'Yes' : 'No') + '</p>';
    newCard += '<p><strong>Installation:</strong> ' + data.installation + '</p>';
    newCard += '<p><strong>Price:</strong> R ' + data.price + '/month</p>';
    newCard += '<p><strong>Fibre Network Provider:</strong> ' + data.fibre_network_provider + '</p>';
    // Add more fields as needed
    newCard += '</div>';

    return newCard;
}
  
function createCard(value) {
    var newCard = '<div class="animate-slide-in-left max-w-sm mx-2 my-4 bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">';
    newCard += '<div class="p-6">';
    newCard += '<div class="font-bold text-xl mb-2">' + value + '</div>';
    // Add any additional information or styling you want inside the new card
    newCard += '</div>';
    newCard += '</div>';
    return newCard;
}

function createCardWithinfo(value, response) {
    var newCard = '<div class="animate-slide-in-left w-full my-4 bg-white rounded-xl shadow-md overflow-hidden ">';
    newCard += '<div class="p-6">';
    newCard += '<div class=" text-xl mb-2">' + value + '<span class="text-sm  bg-black text-white px-2 py-1 rounded-full text-sm ml-2">Specials ' + response.specials + '</span><span class="text-sm  bg-black text-white px-2 py-1 rounded-full text-sm ml-2">All packages ' + response.packages + '</span></div>';
    // Add any additional information or styling you want inside the new card
    // newCard += '<span class="text-sm bg-black text-white px-2 py-1 rounded-full text-sm ml-2">Specials ' + response.specials + '</span>';
    // newCard += '<span class="text-sm bg-black text-white px-2 py-1 rounded-full text-sm ml-2">All packages ' + response.packages + '</span>';
    newCard += '</div>';
    newCard += '</div>';

    return newCard;
}

function showMore(value) {
    console.log('Showing more details for:', value);

    // Hide the existing div
    jQuery('#fibre_network_providers').empty();

    newCard = createCard(value);

    // Append the new card to the div with the id fibre_network_providers
    jQuery('#fibre_network_providers').html(newCard);
    sendAjaxRequest('fibre_network_operator', value, 'test2', 'value2','../../wp-content/plugins/coverage-search/test.php');
    // Call the smooth scroll function
        
    // Example usage:
    // Replace 'yourElementId' with the ID of the element you want to scroll to
    scrollToElementById('fibre_network_providers');

}

// Function to create a card with information
function createCardExampleStart(data) {
    let cardHTML = '<div class="flex space-y-12 animate-slide-in-left my-8 p-2">'; // Added flex container with spacing between cards
    cardHTML += '<div class="flex-none w-64 bg-white rounded-xl shadow-md overflow-hidden">';
    cardHTML += '<img class="w-full p-2" src='+data.link_to_image+' alt="imageofserviceprovider">';
    cardHTML += '<div class="p-6">';
    cardHTML += '<div class="text-center">';
    cardHTML += '<p class="inline-block rounded-full px-3 py-1 font-semibold text-black mr-2 mb-2 text-xl mb-2">' + data.fibre_network_provider + '</p>';
    // cardHTML += '<h2 class="inline-block rounded-full px-3 py-1 font-semibold text-black mr-2 mb-2 text-xl mb-2">' + data.package_name + '</h2>';
    cardHTML += '<p class="text-xl font-semibold"> R ' + data.price + '.00 /month</p>';
    cardHTML += '<p class="text-2xl "><i class="fa-solid fa-circle-down"></i>  ' + data.download_speed + ' Mbps</p>';
    cardHTML += '<p class="text-xl "><i class="fa-regular fa-circle-up"></i>  ' + data.upload_speed + ' Mbps</p>';
    cardHTML += '<p class="">Router ' + data.router + '</p>';
    cardHTML += '<p class="">Uncapped ' + data.uncapped + '</p>';
    cardHTML += '<p class="">Installation ' + data.installation + '</p>';
    // cardHTML += '<p class="">' + data.internet_service_provider + '</p>';
    cardHTML += '<br><button type="button" id="get_started_button"  onclick="scrollToElementById(\'main-form\')" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Check Coverage</button>';
    cardHTML += '</div>';
    cardHTML += '</div>';
    cardHTML += '</div>';
    cardHTML += '</div>';
    return cardHTML;
}

// Function to create a card with information
function createCardExampleStart_with_select(data) {
    let cardHTML = '<div class="flex space-y-12 animate-slide-in-left my-8 p-2">'; // Added flex container with spacing between cards
    cardHTML += '<div class="flex-none w-64 bg-white rounded-xl shadow-md overflow-hidden">';
    cardHTML += '<img class="w-full p-2" src='+data.link_to_image+' alt="imageofserviceprovider">';
    cardHTML += '<div class="p-6">';
    cardHTML += '<div class="text-center">';
    cardHTML += '<p class="inline-block rounded-full px-3 py-1 font-semibold text-black mr-2 mb-2 text-xl mb-2">' + data.fibre_network_provider + '</p>';
    // cardHTML += '<h2 class="inline-block rounded-full px-3 py-1 font-semibold text-black mr-2 mb-2 text-xl mb-2">' + data.package_name + '</h2>';
    cardHTML += '<p class="text-xl font-semibold"> R ' + data.price + '.00 /month</p>';
    cardHTML += '<p class="text-2xl "><i class="fa-solid fa-circle-down"></i>  ' + data.download_speed + ' Mbps</p>';
    cardHTML += '<p class="text-xl "><i class="fa-regular fa-circle-up"></i>  ' + data.upload_speed + ' Mbps</p>';
    cardHTML += '<p class="">Router ' + data.router + '</p>';
    cardHTML += '<p class="">Uncapped ' + data.uncapped + '</p>';
    cardHTML += '<p class="">Installation ' + data.installation + '</p>';
    // cardHTML += '<p class="">' + data.internet_service_provider + '</p>';
    // Stringify the object before passing it
// Assuming data has an 'id' property
    cardHTML += '<br><button type="button" onclick="handleButtonClick(' + data.id + ')" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Select</button>';
    cardHTML += '</div>';
    cardHTML += '</div>';
    cardHTML += '</div>';
    cardHTML += '</div>';
    return cardHTML;
}

function handleButtonClick(data) {
    var requestData = {
        package_id: data,
    };

    jQuery.ajax({
        type: 'POST',               // Request method (can be 'GET' or 'POST')
        url: '../../wp-content/plugins/coverage-search/get-package.php', // URL to your PHP script
        data: requestData,          // Data to be sent with the request
        dataType: 'json',           // Expected data type from the server
        success: function(response) {
            // Handle the successful response from the server
            console.log('Success:', response);
            let newCard = createCardExampleStart(response.data_array);
            // // Animate the fade-in effect by changing the opacity
            jQuery('#package_selected').val(response.data_array.fibre_network_provider+'_R_'+response.data_array.price+'_'+response.data_array.download_speed+'_'+response.data_array.upload_speed);
            jQuery('#web_source').val(response.data_array.internet_service_provider);
            jQuery('#submit_form').removeClass('hidden');
            jQuery('#while_searching_text').empty();
            jQuery('#while_searching_text').append(newCard);
            jQuery('#get_started_button').hide();
            jQuery('.relative').fadeIn();

        },
        error: function(error) {
            // Handle errors
            console.error('Error:', error);
        }
    });

  }

function generateCard(title, description, tags) {
    let cardHTML = '<div class="max-w-xs w-full rounded overflow-hidden shadow-md" style="max-width: 15em;">';
    cardHTML += '<div class="px-3 py-2">';
    cardHTML += '<div class="font-bold text-sm mb-1">' + title + '</div>';
    cardHTML += '<p class="text-gray-600 text-xs">' + description + '</p>';
    cardHTML += '</div>';
    cardHTML += '<div class="px-3 pt-2 pb-1">';
  
    // Loop through tags and add them to the card
    tags.forEach(function(tag) {
      cardHTML += '<span class="inline-block bg-gray-200 rounded-full px-1 py-0.5 text-xs font-semibold text-gray-700 mr-1 mb-1">' + tag + '</span>';
    });
  
    cardHTML += '</div>';
    cardHTML += '</div>';
  
    return cardHTML;
  }


function sendAjaxRequest(fibre_network_operator, value1, key2, value2,url) {
    // Define the data you want to send with the request
    var requestData = {
        fibre_network_operator: value1,
        key2: value2
    };
    
    // Make an AJAX request
    jQuery.ajax({
        type: 'POST',               // Request method (can be 'GET' or 'POST')
        url: url, // URL to your PHP script
        data: requestData,          // Data to be sent with the request
        dataType: 'json',           // Expected data type from the server
        success: function(response) {
            // Handle the successful response from the server
            console.log('Success:', response);
            // jQuery('#fibre_network_providers').htmls(response);
            newCard = createCardWithinfo(value1,response);
            jQuery('#fibre_network_providers').html(newCard);
            // Iterate through the data array and append cards to the container
            
            jQuery('#packages_show').empty();
            // Loop through the data and generate cards
            jQuery.each(response.result_from_function.data_array, function (index, data) {
                let newCard = createCardExampleStart(data);
                jQuery('#packages_show').append(newCard);
            });
            

            // Example usage:

        },
        error: function(error) {
            // Handle errors
            console.error('Error:', error);
        }
    });
}

  function hideModal() {
    jQuery('.relative').fadeOut(); // You can customize this line based on your needs
  }

  function generateModalContent() {
    var modalContent = `
    <div class="relative fadeIn z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background backdrop, show/hide based on modal state. -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-2 pt-5 sm:p-6 sm:pb-2">
                    <form id="sign_up_form" class="w-full max-w-lg">
                    <div class="flex justify-center ">
                <div id="while_searching_text" class='text-sm text-center m-4'> <div class="loader"></div></div>
                </div>
                     <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                First Name
                            </label>
                            <input name="first_name" id="first_name" class="appearance-none block w-full border border-gray-200 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane">
                            <p id="first_name_check" class="text-red-500 text-xs italic hidden">Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Last Name
                            </label>
                            <input name="last_name" id="last_name" class="appearance-none block w-full border border-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe">
                            <p id="last_name_check" class="text-red-500 text-xs italic mt-3 hidden">Please fill out this field.</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                             Email Address
                            </label>
                            <input name="email_address" id="email_address" class="appearance-none block w-full border border-gray-200 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="email" placeholder="Jane@email.com">
                            <p id="email_address_check" class="text-red-500 text-xs italic hidden">Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Phone Number
                            </label>
                            <input onkeyup="validateAndFormatPhoneNumber(this.value)" name="phone_number" id="phone_number" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" placeholder="0723946287">
                            <p id="phone_number_check" class="text-red-500 text-xs italic mt-3 hidden">Please fill out this field.</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                                Type Of Identity
                            </label>
                            <div class="relative">
                                <select name="type_of_identity" id="type_of_identity_user_select" onchange="updateLabel_type_of_identity()" class="appearance-none block w-full mb-6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="ID_number" selected>ID Number</option>
                                    <option value="Passport_number">Passport Number</option>
                                    <!-- Add more options as needed -->
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-8 8h16l-8-8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                                <label id="type_of_identity_new_label" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                                    ID Number
                                </label>
                                <input name="identity_number" id="identity_number" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="">
                                <p id="identity_number_check" class="text-red-500 text-xs italic mt-3 hidden">Please fill out this field.</p>
                            </div>
                        </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                New Installation or Migration
                            </label>
                            <div class="relative">
                                <select name="installation_or_migration" id="installation_or_migration" class="appearance-none block w-full mb-6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="Installation" selected>Installation</option>
                                    <option value="Migration">Migration</option>
                                    <!-- Add more options as needed -->
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-8 8h16l-8-8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Payment
                            </label>
                            <div class="relative">
                                <select name="payment_type" id="payment_type" class="appearance-none block w-full mb-6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="debit_order" selected>Debit Order</option>
                                    <option value="Credit_card">Credit Card</option>
                                    <!-- Add more options as needed -->
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-8 8h16l-8-8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Type Of Property
                            </label>
                            <div class="relative">
                                <select name="type_of_property" id="type_of_property" onchange="type_of_property_check()"  class="appearance-none block w-full mb-6 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="free_standing_house" selected>Free Standing House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="unit_numeber">Complex</option>
                                    <!-- Add more options as needed -->
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-8 8h16l-8-8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div id="place_unit_number" class="w-full md:w-1/2 px-3">
                            <label id="unit_number" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Unit Number
                                </label>
                                <div class="relative">
                                    <input name="unit_number" id="unit_number_value" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" placeholder="3">
                                </div>
                            </div>
                        <div id="place_type_name" class="w-full px-3 mt-3">
                            <label id="place_name" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Name
                            </label>
                            <div class="relative">
                                <input  name="place_name" id="place_name_value" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="">
                            </div>
                        </div>
                    </div>
                </form>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" onclick="hideModal()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Continue</button>
                    <button type="button" id="submit_form" class="hidden mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto md:mr-2 lg:mr-2">Submit</button>
                    <input  name="pakage_selected" id="pakage_selected" class="hidden appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../wp-content/plugins/coverage-search/form-validation-and-submit.js"></script>
    `;

    return modalContent;
  }


function sendAjaxRequestForCoverageSearch(fibre_network_operator, value1, key2, value2,url) {
    // Define the data you want to send with the request
    var requestData = {
        fibre_network_operator: value1,
        key2: value2
    };
    
    // Make an AJAX request
    jQuery.ajax({
        type: 'POST',               // Request method (can be 'GET' or 'POST')
        url: url, // URL to your PHP script
        data: requestData,          // Data to be sent with the request
        dataType: 'json',           // Expected data type from the server
        success: function(response) {
            // Handle the successful response from the server
            console.log('Success:', response);
            // jQuery('#fibre_network_providers').htmls(response);
            newCard = createCardWithinfo(value1,response);
            jQuery('#fibre_network_providers').append(newCard);
            // Iterate through the data array and append cards to the container
            
            // jQuery('#packages_show').empty();
            // Loop through the data and generate cards
            jQuery.each(response.result_from_function.data_array, function (index, data) {
                let newCard = createCardExampleStart_with_select(data);
                jQuery('#packages_show').append(newCard);
            });
            

            // Example usage:

        },
        error: function(error) {
            // Handle errors
            console.error('Error:', error);
        }
    });
}

function scrollToElementById(elementId) {
    const targetElement = document.getElementById(elementId);
  
    if (targetElement) {
      // Scroll to the target element
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      console.error(`Element with ID "${elementId}" not found`);
    }
  }

  

