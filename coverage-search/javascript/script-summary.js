
var selectedOption;

 // Function to generate the card
 function generateCard(title, description, guidelineUrl) {
  // Create the card container div
  var cardDiv = jQuery("<div>")
      .addClass("max-w-sm p-6 bg-white");

  // Create the SVG icon
  var svgIcon = jQuery("<svg>")
      .addClass("w-7 h-7 text-gray-500 dark:text-gray-400 mb-3")
      .attr({
          "aria-hidden": "true",
          "xmlns": "http://www.w3.org/2000/svg",
          "fill": "currentColor",
          "viewBox": "0 0 20 20"
      })
      .html('<path d="M18 5h-.7c.229-.467.349-.980.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>');

  // Create the anchor element for the title
  var titleAnchor = jQuery("<a>")
      .attr("href", guidelineUrl);

  // Create the title heading
  var titleHeading = jQuery("<h5>")
      .addClass("mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white")
      .text(title);

  // Create the description paragraph
  var descriptionPara = jQuery("<p>")
      .addClass("mb-3 font-normal text-gray-500 dark:text-gray-400")
      .text(description);

  // Create the "See our guideline" link
  var guidelineLink = jQuery("<a>")
      .addClass("inline-flex items-center text-blue-600 hover:underline")
      .attr("href", guidelineUrl)
      .html("Return Home <svg class='w-3 h-3 ml-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/></svg>");

  // Append elements to the card container
  cardDiv.append(svgIcon, titleAnchor.append(titleHeading), descriptionPara, guidelineLink);

  // Append the card to the card container in the DOM
  jQuery("#summary_object").html(cardDiv);
}



jQuery(document).ready(function() {
  // When the "Sign Up" button is clicked
  function updateInputText(inputId, outputId, updateInterval) {
    const inputElement = document.getElementById(inputId);
    const outputElement = document.getElementById(outputId);
  
    if (inputElement && outputElement) {
      function updateOutput() {
        const inputValue = inputElement.value;
  
        if (inputValue === "") {
          // Input is empty, show "Please fill in" text in red
          outputElement.textContent = "* " + inputElement.getAttribute("placeholder");
          outputElement.classList.add("text-purple-500");
        } else {
          // Input has a value, show the actual input value
          outputElement.textContent = inputValue;
          outputElement.classList.remove("text-purple-500");
          outputElement.classList.remove("text-red-500");
        }
      }
  
      // Initial update
      updateOutput();
  
      // Set up an interval to update the output every 'updateInterval' milliseconds (10 seconds in this case)
      setInterval(updateOutput, updateInterval);
    } else {
      console.error("Input or output element not found.");
    }
  }

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 14);
  
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;  
  
  // function updateInputValue(inputId, outputId) {
  //   jQuery('#' + inputId).keyup(function() {
  //     jQuery('#' + outputId).value(jQuery(this).val());
  //   });
  // }

  updateInputText('userFirstname', 'summary_userFirstname', 3000);
  updateInputText('email', 'summary_email', 3000);
  updateInputText('userLastname', 'summary_userLastname', 3000);
  updateInputText('phone', 'summary_phone', 3000);
  updateInputText('address-input', 'summary_address', 3000);
  updateInputText('idnumber', 'summary_idnumber', 3000);
  updateInputText('passportnumber', 'summary_passportnumber', 3000);
  updateInputText('migration_or_migration', 'summary_migration_or_migration', 3000);
  updateInputText('payment_type', 'summary_payment_type');

  // var fullDomain = window.location.protocol + "//" + window.location.hostname;
  var fullDomain = 'https://Wondernet.co.za';

  function checkInputValues() {
    // Gather input values
    var streetName = jQuery("#address-input").val();
    var phone = jQuery("#phone").val();
    var userLastname = jQuery("#userLastname").val();
    var userFirstname = jQuery("#userFirstname").val();
    var email = jQuery("#email").val();
    var Latitude = jQuery("#LatitudeInput").val();
    var Longitude = jQuery("#LongitudeInput").val();
    var coverageFound = jQuery("#coverage_result").text();
    var location_id = jQuery("#location_id").val();
    var idnumber = jQuery("#idnumber").val();
    var unit_number = jQuery("#unit_number").val();
    var payment_type = jQuery("#payment_type").val();
    var migration_or_migration = jQuery("#migration_or_migration").val();
    var passportnumber = jQuery("#passportnumber").val();
    var location_id = jQuery("#LocationInput").val();
    var postal_code = jQuery("#PostalcodeInput").val();
    var city = jQuery("#CityInput").val();
  
    // Check if any of the values are empty (missing)
    if (
      streetName === "" ||
      phone === "" ||
      userLastname === "" ||
      userFirstname === "" ||
      email === "" ||
      Latitude === "" ||
      Longitude === "" ||
      coverageFound === "" ||
      location_id === "" ||
      payment_type === "" ||
      migration_or_migration === "" ||
      location_id === "" ||
      postal_code === "" ||
      city === ""
      && (idnumber === "" && passportnumber === "")
    ) {
      return false; // Return false if any value is missing
    }
  
    return true; // All values are present
  }

  jQuery("input[type='submit']").click(function(event) {
    // Prevent the default form submission
    event.preventDefault();

    var selectedRadioButton = jQuery("input[name='package']:checked");

  // Check if any radio button is selected
  if (selectedRadioButton.length > 0) {
    // Get the value of the selected radio button
    var selectedValue = selectedRadioButton.val();
  } else {
    selectedValue = 'None';
  }

    
    // Gather input values
    var streetName = jQuery("#address-input").val();
    var phone = jQuery("#phone").val();
    var userLastname = jQuery("#userLastname").val();
    var userFirstname = jQuery("#userFirstname").val();
    var email = jQuery("#email").val();
    var Latitude = jQuery("#LatitudeInput").val();
    var Longitude = jQuery("#LongitudeInput").val();
    var unit_number = jQuery("#unit_number").val();
    var coverageFound = jQuery("#coverage_result").text();
    var location_id = jQuery("#location_id").val();
    var idnumber = jQuery("#idnumber").val();
    var payment_type = jQuery("#payment_type").val();
    var migration_or_migration = jQuery("#migration_or_migration").val();
    var passportnumber = jQuery("#passportnumber").val();
    var location_id = jQuery("#LocationInput").val();
    var postal_code = jQuery("#PostalcodeInput").val();
    var type_of_property = jQuery("#type_of_property").val();
    var type_of_property_name = jQuery("#type_of_property_name").val();
    var city = jQuery("#CityInput").val();
    var partner = 1;
    
    // Check if any of the fields are empty
      if (!checkInputValues()) {
        var city = jQuery("#signup_button").val("* Complete The Form to Continue");
      } 
   
      // All fields are filled, proceed with AJAX form submission
      var formData = {
        streetName: streetName,
        type_of_property_name: type_of_property_name,
        postal_code: postal_code,
        formattedDate: formattedDate,
        city: city,
        Location_id: location_id,
        userLastname: userLastname,
        userFirstname: userFirstname,
        migration_or_migration: migration_or_migration,
        phone: phone,
        email: email,
        partner: partner,
        Latitude: Latitude,
        Longitude: Longitude,
        selectedOption: selectedValue,
        type_of_property: type_of_property,
        unit_number: unit_number,
        coverage: coverageFound,
        payment_type: payment_type,
        idnumber: idnumber,
        source: fullDomain,
        passportnumber: passportnumber,
        // additionalnotes: additionalnotes,
    };
    // console.log(formData);

    // return false
      
      // Send the data to the server using AJAX
      jQuery.ajax({
        type: "POST", // You can change this to "GET" or other methods as needed
        url: "https://hooks.zapier.com/hooks/catch/15303535/35v42c2/", // Replace with your server-side endpoint
        // url: "https://hooks.zapier.com/hooks/catch/15303535/35v42c2/", // Replace with your server-side endpoint
        data: formData,
        success: function(response) {
          // Handle the response from the server, e.g., display a success message
          jQuery("#nextButton").hide();
          jQuery("#signup_button").hide();
          generateCard("Thanks "+ userFirstname +" "+ userLastname +" .", "We received your Request. ", "https://wondernet.co.za/");
       
        
        },
        error: function(error) {
          // Handle any errors that occur during the AJAX request
          console.error(error);
          alert("An error occurred while submitting the form.");
        }
      });
    
  });
});