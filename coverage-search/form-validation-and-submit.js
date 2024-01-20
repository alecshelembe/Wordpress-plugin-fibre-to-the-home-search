

    function updateLabel_type_of_identity() {
        var selectElement = document.getElementById('type_of_identity_user_select');
        var labelElement = document.getElementById('type_of_identity_new_label');
        var selectedOption = selectElement.options[selectElement.selectedIndex].text;
        labelElement.innerText = selectedOption;
    }

    function type_of_property_check() {
        var selectElement = document.getElementById('type_of_property');
        var place_type_name = document.getElementById('place_type_name');
        var place_name = document.getElementById('place_name');
        var place_unit_number = document.getElementById('place_unit_number');
        var place_number = document.getElementById('place_number');

        // Check if the selected value is "Free standing"
        if (selectElement.value === 'free_standing_house') {
            // If it is, hide the 'place_type_name' and 'place_unit_number' elements
            place_type_name.style.display = 'none';
            place_unit_number.style.display = 'none';
            
        } else {
          // If it's not "Free standing," make sure the elements are visible
          place_type_name.style.display = 'block'; // or 'inline-block', depending on your layout
          place_unit_number.style.display = 'block'; // or 'inline-block', depending on your layout

          if (selectElement.value === 'apartment'){
            place_name.textContent  = 'Apartment Name';
            
          } else {
            place_name.textContent  = 'Complex Name';

          }
        }
        
    }

    function checkField(id, checkElementId) {
        var value = jQuery('#' + id).val();
        
        if (value === '') {
            jQuery('#' + checkElementId).removeClass('hidden');
            empty_fields++;
            console.log( id + ' empty field');
        } else {
            jQuery('#' + checkElementId).addClass('hidden');
        }
    }
      
      function validateAndFormatPhoneNumber() {
          let inputVal = jQuery("#phone_number").val();
      
          // Remove white spaces from the input
          inputVal = inputVal.replace(/\s+/g, "");
      
          // Keep only the first 10 digits
          inputVal = inputVal.substring(0, 10);
      
          // If input starts with +27, replace it with 0
          if (inputVal.startsWith("+27")) {
              inputVal = "0" + inputVal.substring(3);
          } else if (inputVal === '27') {
              // If the user types '27', change it to '0'
              inputVal = '0';
          }
      
          // Update the input field value
          jQuery("#phone_number").val(inputVal);
      }
      
      var empty_fields = 0;

      jQuery(document).ready(function() {
          type_of_property_check();
          // Use event delegation for dynamically added input fields
          jQuery("#sign_up_form").on("keyup", "input", function() {
               // Exclude inputs with specific IDs (e.g., exclude inputs with IDs 'excludeInput1' and 'excludeInput2')
            if (!jQuery(this).is('#place_name_value, #unit_number_value')) {
                validateAndFormatField(jQuery(this));
            }
          });
      
          // Attach a click event to the submit button
          jQuery('#submit_form').on('click', function() {
            empty_fields = 0;
              // Iterate over form fields and perform validation
              jQuery("#sign_up_form input").each(function() {
                if (!jQuery(this).is('#place_name_value, #unit_number_value')) {
                    var fieldName = jQuery(this).attr("name");
                    var checkElementId = fieldName + '_check';
                    checkField(fieldName, checkElementId);
                }
              });
      
              if (empty_fields == 0){
                  // Serialize the form data
                  
                  var formData = jQuery('#sign_up_form').serialize();

                  // Additional data as an object
                  var google_location = jQuery("#google_location").val();
                  var google_latitude = jQuery("#google_latitude").val();
                  var google_longitude = jQuery("#google_longitude").val();
                  var google_location_type = jQuery("#google_location_type").val();
                  var google_postal_code = jQuery("#google_postal_code").val();
                  var google_city = jQuery("#google_city").val();
                  var address_input = jQuery("#address-input").val();
                  var package_selected = jQuery("#package_selected").val();
                  var location_id = jQuery("#location_id").val();
                   var web_source = jQuery("#web_source").val();
                  
                  var additionalData = {
                      google_location: encodeURIComponent(google_location),
                      location_id: encodeURIComponent(location_id),
                      google_latitude: encodeURIComponent(google_latitude),
                      google_longitude: encodeURIComponent(google_longitude),
                      google_location_type: encodeURIComponent(google_location_type),
                      google_postal_code: encodeURIComponent(google_postal_code),
                      google_city: encodeURIComponent(google_city),
                      address_input: encodeURIComponent(address_input),
                      package_selected: encodeURIComponent(package_selected),
                      web_source: encodeURIComponent(web_source),
                    };

                  // Serialize the additional data and append to the existing formData
                  formData += '&' + jQuery.param(additionalData);
                  
                  console.log(formData);
                  // return false
                  // getting values for thank you message
                  var first_name = jQuery("#first_name").val();
                  var last_name = jQuery("#last_name").val();

                  // Make an AJAX request
                  jQuery.ajax({
                    type: 'POST', // Change the method type if needed
                    url: 'https://hooks.zapier.com/hooks/catch/15303535/3wcvywc/', // Replace with your server endpoint
                    data: formData,
                    success: function(response) {
                      // Handle the success response here
                      console.log('Success:', response);
                      jQuery('#sign_up_form').html('<div class="flex justify-center"><p>Thank you, '+ first_name + ' ' + last_name + ' we received your request</p></div>')
                      jQuery('#submit_form').hide();
                    },
                    error: function(error) {
                      // Handle the error response here
                      console.error('Error:', error);
                    }
                  });
              } else{
                // console.log(empty_fields + ' fields are empty');
                alert('Please fill '+ empty_fields + ' empty fields to submit');
              }
      
          });
      
          // Function to validate and format a specific field
          function validateAndFormatField(field) {
              var fieldName = field.attr("name");
              var checkElementId = fieldName + '_check';
      
              // Run the validation and formatting function for the current field
              checkField(fieldName, checkElementId);
      
              // Additional actions specific to the field, if needed
              // ...
          }
      });
