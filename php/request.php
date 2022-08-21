<?php

require_once("db.php");

if(isset($_POST['text'])) {

	$val = htmlspecialchars($_POST['text']);
    $val = stripcslashes($val);
    $val = addslashes($val);
    //$val = trim($val);

    $db = connection();

	if($db != false) {

        $result = $db->query("SELECT id,place FROM list WHERE name LIKE '%$val%'");

        if($result->num_rows > 0) {

            $row = $result->fetch_assoc();

            $a = 0;
            $arr = array();

            do {
                $arr[++$a] = array("id" => $row['id'], "n" => $row['place']);
            } while($row = $result->fetch_assoc());

            exit(json_encode($arr));

        } else {
            return false;
        }
    } else {
        return false;
    }

} else {
	exit("Error!");
}

?>