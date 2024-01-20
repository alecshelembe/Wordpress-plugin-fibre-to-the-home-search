<?php

    // remember to close the connection
    // $conn->close(); 

function get_url($your_subdirectory,$your_file){

    // Get the URL of a specific file within the plugin directory
    $file_url = plugins_url($your_subdirectory.'/'.$your_file, __FILE__);
    
    // Output the file URL
    // echo 'File URL: ' . $file_url;
    return $file_url;
        
}

function connectToDatabase(){

    $host = "localhost"; // Replace with your actual database host
    $username = "root"; // Replace with your actual database username
    $password = ""; // Replace with your actual database password
    $database = "internet_fibre_packages"; // Replace with your actual database name

    // Create a connection
    $conn = new mysqli($host, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        // echo("Connection successfull");
    }

    return $conn;

}

function alert($var)
{
	echo ("<script type=\"text/javascript\">
	alert(\"$var\");
	</script>");
}

function stop()
{
	die();
}

function get_full_packages_from_fibre_network_operator($conn, $table,$fibre_network_provider){

    $query = "SELECT `price`,`id`, `package_name`,`link_to_image`, `download_speed`, `upload_speed`, `internet_service_provider`, `router`, `uncapped`, `installation`, `price`, `link`, `contact_person_email`, `contact_person_phone`, `contact_person_two`, `package_date_added`, `package_created_by_name`, `package_created_by_contact`, `special`, `fibre_network_provider`, `active` FROM `packages` WHERE `packages`.`active` = 'yes' AND `packages`.`fibre_network_provider`= '$fibre_network_provider'  ORDER BY `price` ASC;";

	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

	// echo "$query";
	// stop();

	$row_number = mysqli_num_rows($result); 
	$row = mysqli_num_rows($result);
	if ($row == 0) {
		echo ("None found");
		stop();
	}

    $dataArray = array();

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
    
        // Append data to the main array
        $dataArray[] = $data;
    }
    

    // Now $dataArray contains all the rows' data

    // $conn->close(); 
    $response = array(
        'rows' => $row_number,  
        'data_array' => $dataArray,
        // Add any additional data you want to send back
    );
    

    return $response;

}

function get_number_of_active_packages_from_fibre_network_operator($conn, $table,$fibre_network_provider){
  
    $query = "SELECT `price`,`fibre_network_provider`,`active` FROM `$table` WHERE `$table`.`active` = 'yes' AND `$table`.`fibre_network_provider` = '$fibre_network_provider'  ORDER BY `price` ASC;";

	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

	// echo "$query";
	// stop();

	$row = mysqli_num_rows($result);
	if ($row == 0) {
		echo ("None found");
		stop();
	}

    // $conn->close(); 

    return $row;

}

function get_number_of_active_specials($conn, $table){

    $query = "SELECT `price`,`special`, `fibre_network_provider`,`active` FROM `$table` WHERE `$table`.`active` = 'yes' AND `$table`.`special` = 'yes'  ORDER BY `price` ASC;";

	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

	// echo "$query";
	// stop();

	$row = mysqli_num_rows($result);
	if ($row == 0) {
		echo ("None found");
		stop();
	}

    // $conn->close(); 

    return $row;

}

function get_number_of_active_specials_from_fibre_network_operator($conn, $table,$fibre_network_operator){

    $query = "SELECT `price`,`special`, `fibre_network_provider`,`active` FROM `$table` WHERE `$table`.`active` = 'yes' AND `$table`.`fibre_network_provider` = '$fibre_network_operator' AND `$table`.`special` = 'yes'  ORDER BY `price` ASC;";

	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

	// echo "$query";
	// stop();

	$row = mysqli_num_rows($result);

    return $row;
}

function get_all_fibre_network_providers($conn, $table, $row_title)
{
    // alert("test two");

    $query = "SELECT `price`,`$row_title`,`link_to_image` FROM `$table` WHERE `$table`.`active` = 'yes'  ORDER BY `price` ASC;";

	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

	// echo "$query";
	// stop();

	$row = mysqli_num_rows($result);
	if ($row == 0) {
		echo ("None found");
		stop();
	}

    $previousValues = array();

    echo '<p class="p-8 pb-12 mx-auto text-sm font-bold">View all available Packages</p>';
    echo '<div class="flex flex-wrap justify-center">';
    while ($row = mysqli_fetch_assoc($result)) {
        $value = $row[$row_title];
        $link_to_image = $row['link_to_image'];
        
        // Check if the value has been echoed before
        if (!in_array($value, $previousValues)) {
            $active_packages_number = get_number_of_active_packages_from_fibre_network_operator($conn, 'packages',$value);
            echo '<div class="m-2 w-60 my-2 animate-slow-grow bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">';
            echo '<img class="p-2" src="' . $link_to_image . '" alt="Sunset in the mountains" style="width: 15em; height: auto;">';
            echo '<div class="p-6">';
            
            echo '';
            // More button
            echo '<button class="absolute bottom-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onclick="showMore(\'' . $value . '\')">
                    <div flex items-center  mb-2">
                        <span>' . $value . '</span>
                        <span class=" text-black px-2 py-1 rounded-full text-sm ml-2">' . $active_packages_number . '</span>
                    </div>
                </button>';
            
            // Add any additional information or styling you want inside the card
            echo '</div>';
            echo '</div>';
            
            // Add the value to the array of previous values
            $previousValues[] = $value;
        }
    }
    echo '</div>';

    // $conn->close(); 

	// https://github.com/alecshelembe

}
