<?php
$servername = "localhost";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    echo "База данных myapp успешно создана";
} catch (PDOException $e) {
    echo "Ошибка создания базы данных: " . $e->getMessage();
}

$conn = null;
?>
