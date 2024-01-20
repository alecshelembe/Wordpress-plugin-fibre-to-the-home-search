jQuery("#type_of_property_name_div").hide();
jQuery("#type_of_property").on("change", function () {
  var selectedOption = jQuery(this).find(":selected").val();
  jQuery("#type_of_property_name_label").text(selectedOption + " Name");
  if(selectedOption == 'Free Standing House'){
    jQuery("#type_of_property_name_div").hide();
  } else {
    jQuery("#type_of_property_name_div").show();
  }
});

jQuery("#type_of_identity_passport_div").hide();
jQuery("#type_of_identity").on("change", function () {
  var selectedOption = jQuery(this).find(":selected").val();
  if(selectedOption == 'ID Number'){
    jQuery("#type_of_identity_id_div").show();
    jQuery("#type_of_identity_passport_div").hide();
  } else {
    jQuery("#type_of_identity_id_div").hide();
    jQuery("#type_of_identity_passport_div").show();
  }
});