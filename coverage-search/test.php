<?php 
include_once("php-functions.php");

if (isset($_POST['fibre_network_operator'])){
    $conn = connectToDatabase();
    $fibre_network_operator = $_POST['fibre_network_operator'];
    $number = get_number_of_active_specials_from_fibre_network_operator($conn, 'packages',$fibre_network_operator);
    $active_packages_number = get_number_of_active_packages_from_fibre_network_operator($conn, 'packages',$fibre_network_operator);
    $result_from_function = get_full_packages_from_fibre_network_operator($conn, 'packages',$fibre_network_operator);
} else {
    $fibre_network_operator = 'test';
}

// return '<p>Hello World</p>';

// Perform some processing or operations here

// Assuming the operation was successful, prepare a success response
$response = array(
    'fibre_network_operator' => $fibre_network_operator,
    'status' => 'success',
    'packages' => $active_packages_number,
    'specials' => $number,
    'message' => 'Operation completed successfully',
    'result_from_function' => $result_from_function,
    // Add any additional data you want to send back
);

// Send the JSON-encoded response
header('Content-Type: application/json');
echo json_encode($response);

?>
