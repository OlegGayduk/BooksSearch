<?php

require_once("db.php");

if(isset($_POST['id'])) {

    $id = htmlspecialchars($_POST['id']);
    $id = stripcslashes($id);
    $id = addslashes($id);

    $db = connection();

    if($db != false) {

        $db->query("DELETE FROM list WHERE id='$id'");

        exit(true);

    } else {
        return false;
    }

} else {
    exit("Error!");
}

?>