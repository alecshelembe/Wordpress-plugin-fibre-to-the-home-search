<?php 
include_once("php-functions.php");

if (isset($_POST['package_id'])){

    $conn = connectToDatabase();
    
    $package_id = $_POST['package_id'];

    $query = "SELECT `id`, `package_name`,`link_to_image`, `download_speed`, `upload_speed`, `internet_service_provider`, `router`, `uncapped`, `installation`, `price`, `link`, `contact_person_email`, `contact_person_phone`, `contact_person_two`, `package_date_added`, `package_created_by_name`, `package_created_by_contact`, `special`, `fibre_network_provider`, `active` FROM `packages` WHERE `packages`.`active` = 'yes' AND `packages`.`id`= '$package_id';";

	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

    while ($row = mysqli_fetch_assoc($result)) {
        $id = $row['id'];
        $internet_service_provider = $row['internet_service_provider'];
        $fibre_network_provider = $row['fibre_network_provider'];
    
        // Fetch other data from the database
        $package_name = $row['package_name'];
        $link_to_image = $row['link_to_image'];
        $download_speed = $row['download_speed'];
        $upload_speed = $row['upload_speed'];
        $router = $row['router'];
        $uncapped = $row['uncapped'];
        $installation = $row['installation'];
        $price = $row['price'];
        $link = $row['link'];
        $contact_person_email = $row['contact_person_email'];
        $contact_person_phone = $row['contact_person_phone'];
        $contact_person_two = $row['contact_person_two'];
        $package_date_added = $row['package_date_added'];
        $package_created_by_name = $row['package_created_by_name'];
        $package_created_by_contact = $row['package_created_by_contact'];
        $special = $row['special'];
        $active = $row['active'];
    
        // Save data to array
        $data = array(
            'id' => $id,
            'internet_service_provider' => $internet_service_provider,
            'fibre_network_provider' => $fibre_network_provider,
            'package_name' => $package_name,
            'download_speed' => $download_speed,
            'link_to_image' => $link_to_image,
            'upload_speed' => $upload_speed,
            'router' => $router,
            'uncapped' => $uncapped,
            'installation' => $installation,
            'price' => $price,
            'link' => $link,
            'contact_person_email' => $contact_person_email,
            'contact_person_phone' => $contact_person_phone,
            'contact_person_two' => $contact_person_two,
            'package_date_added' => $package_date_added,
            'package_created_by_name' => $package_created_by_name,
            'package_created_by_contact' => $package_created_by_contact,
            'special' => $special,
            'active' => $active
            // Add more fields if needed
        );

         // $conn->close(); 
    $response = array(
        'data_array' => $data,
        // Add any additional data you want to send back
    );
} 
} else {
    $response = array(
        'result' => 'Error'
        // Add any additional data you want to send back
    );
}

// Send the JSON-encoded response
header('Content-Type: application/json');
echo json_encode($response);

?>
