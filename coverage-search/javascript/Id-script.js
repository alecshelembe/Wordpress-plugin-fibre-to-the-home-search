 // Function to validate the id format
 function isValidId(id_number) {
    var saIdRegex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
    return saIdRegex.test(id_number);
}

// Function to handle the AJAX request
function sendIdRequest() {
    const idInput = jQuery('#idnumber').val();
    const url = '../../wp-content/plugins/beta-coverage-map/validate-id.php'; // Replace with your server endpoint URL

    // Validate the id format
    if (!isValidId(idInput)) {
        var x = "Invalid ID format";
        jQuery("#idInputResponse").text(x).css("color", "orange");
        jQuery("#idnumber").css({
            "border": "1px solid orange"
          });
        
        return false;
    } else {
        var x = "Valid ID format";
        jQuery("#idInputResponse").text(x).css("color", "lightgreen");
        jQuery("#idnumber").css({
            "border": "1px solid lightgreen"
          });
    }
    if (idInput == '') {
        x ='';
    }
    
    // return false

    jQuery.ajax({
        url: url,
        type: 'POST',
        data: { id: idInput },
        success: function (response) {
            // Request was successful, handle the response here
            // console.log(response);
            jQuery("#idInputResponse").text(x);
            jQuery("#idGender").text(response.Gender);
            jQuery("#idDay").text(response.Month);
            jQuery("#idMonth").text(response.Day);

        },
        error: function (xhr, status, error) {
            // Request failed, handle the error here
            console.error('Request failed:', status, error);
        }
    });
}

// Attach the event listener to the id input field
jQuery('#idnumber').keyup(sendIdRequest);