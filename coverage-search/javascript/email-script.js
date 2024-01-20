 // Function to validate the email format
 function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle the AJAX request
function sendEmailRequest() {
    const emailInput = jQuery('#email').val();
    const url = '../../wp-content/plugins/beta-coverage-map/validate-email.php'; // Replace with your server endpoint URL

    // Validate the email format
    if (!isValidEmail(emailInput)) {
        var x = "Invalid Email format";
        jQuery("#emailInputResponse").text(x).css("color", "orange");
        jQuery("#email").css({
            "border": "1px solid orange"
          });
        
        return false;
    } else {
        var x = "Valid Email format";
        jQuery("#emailInputResponse").text(x).css("color", "lightgreen");
        jQuery("#email").css({
            "border": "1px solid lightgreen"
          });
    }

    return false

    $.ajax({
        url: url,
        type: 'POST',
        data: { email: emailInput },
        success: function (response) {
            // Request was successful, handle the response here
            console.log(response);

        },
        error: function (xhr, status, error) {
            // Request failed, handle the error here
            console.error('Request failed:', status, error);
        }
    });
}

// Attach the event listener to the email input field
jQuery('#email').keyup(sendEmailRequest);