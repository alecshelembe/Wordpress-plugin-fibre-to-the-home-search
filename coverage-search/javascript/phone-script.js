 // Function to validate the email format
 function isValidPhone(phone) {
    var phoneRegex = /^0[6-8][0-9]{8}$/;
    return phoneRegex.test(phone);
}

// Function to handle the AJAX request
function sendPhoneRequest() {
    const phoneInput = jQuery('#phone').val();
    const url = '../../wp-content/plugins/beta-coverage-map/validate-phone.php'; // Replace with your server endpoint URL

        let inputVal = jQuery(this).val();
        
        // Remove white spaces from the input
        inputVal = inputVal.replace(/\s+/g, "");
        
        // Keep only the first 10 digits
        inputVal = inputVal.substring(0, 10);
        
        // If input starts with +27, replace it with 0
        if (inputVal.startsWith("+27")) {
            inputVal = "0" + inputVal.substring(3);
        }
        
        // Update the input field value
        jQuery(this).val(inputVal);
        
        // Error handling and response
        let responseElement = jQuery("#phoneInputResponse");
        responseElement.text("");
        
        if (inputVal.length !== 10 || isNaN(inputVal)) {
            responseElement.text("Invalid phone number format.");
        }

    // Validate the phone format
    if (!isValidPhone(phoneInput)) {
        var x = "Invalid Phone format";
        jQuery("#phoneInputResponse").text(x).css("color", "orange");
        jQuery("#phoneInput").css({
            "border": "1px solid orange"
          });
        
        return false;
    } else {
        var x = "Valid Phone format";
        jQuery("#phoneInputResponse").text(x).css("color", "lightgreen");
        jQuery("#phoneInput").css({
            "border": "1px solid lightgreen"
          });
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: { phone: phoneInput },
        success: function (response) {
            // Request was successful, handle the response here
        },
        error: function (xhr, status, error) {
            // Request failed, handle the error here
            console.error('Request failed:', status, error);
        }
    });
}

// Attach the event listener to the phone input field
jQuery('#phone').keyup(sendPhoneRequest);