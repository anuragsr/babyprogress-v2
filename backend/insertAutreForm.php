<?php
    include('db_connect.php');
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $conn->prepare(
        "INSERT INTO autre (
            qual, 
            nom, 
            prenom, 
            etab, 
            spec, 
            pays, 
            ville, 
            email, 
            tel
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    
    $stmt->bind_param("sssssssss", 
        $data["qual"]["value"], 
        $data["nom"], 
        $data["prenom"], 
        $data["etab"], 
        $data["spec"]["value"],
        $data["pays"], 
        $data["ville"],
        $data["email"],
        $data["tel"]
    );

    if($stmt->execute()){
        $message["inserted"] = true;

        // Send Email
        $to = "question@babyprogress.fr";
        $subject = "First Baby Progress Email";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers.= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers.= "From: Baby Progress Admin <webmaster@babyprog.fr>";
        $txt = "Hello, Baby Progress Team<br/>";
        $txt.= "<br/>You have received a new contact information with the following details:<br/>";
        $txt.= "<br/><b>Qualification:</b> ".$data["qual"]["value"]."<br/>"; 
        $txt.= "<br/><b>Name:</b> ".$data["nom"]."<br/>"; 
        $txt.= "<br/><b>Pre-name:</b> ".$data["prenom"]."<br/>"; 
        $txt.= "<br/><b>Establishment:</b> ".$data["etab"]."<br/>"; 
        $txt.= "<br/><b>Speciality:</b> ".$data["spec"]["value"]."<br/>"; 
        $txt.= "<br/><b>City:</b> ".$data["pays"]."<br/>"; 
        $txt.= "<br/><b>Country:</b> ".$data["ville"]."<br/>"; 
        $txt.= "<br/><b>Email:</b> ".$data["email"]."<br/>"; 
        $txt.= "<br/><b>Telephone:</b> ".$data["tel"]."<br/>";
        
        mail($to,$subject,$txt,$headers);

    }else{
        $message["inserted"] = false;
    }

    echo json_encode($message);
    // echo json_encode($arr);
    // echo json_encode(phpinfo());
    $conn->close();

?>