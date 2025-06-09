<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

$sql = "CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";

if (mysqli_query($conn, $sql)) {
    echo "База данных myapp успешно создана";
} else {
    echo "Ошибка создания базы данных: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
