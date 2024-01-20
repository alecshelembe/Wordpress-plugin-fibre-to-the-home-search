
// autocomplete feature

jQuery(document).ready(function(jQuery) {
  var input = document.getElementById('address-input'); // ID of your address input field

  var options = {
          types: ['geocode'],
          componentRestrictions: { country: 'ZA' },
          };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener('place_changed', function() {
      // Show the icon.
      document.getElementById('checkCoverage').click();
    });
});

