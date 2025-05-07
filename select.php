<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <div class="container">
        <h1 style="text-align: center">Корзина</h1>
        <?php
            include("includes.php");
            $db = mysqli_connect($myserver, $mylogin, $mypassword);
            mysqli_select_db($db, "cars_db") or die();
            $sql = "SELECT * FROM cars";
            $result = mysqli_query($db, $sql) or die();
            while ($mr = mysqli_fetch_row($result)) {
                echo "<table class='basket-table' border='1' cellpadding='5' cellspacing='0'>";
                echo "<tr>";
                echo "<th>Изображение</th>";
                echo "<th>Название</th>";
                echo "<th>Описание</th>";
                echo "<th>Мощность</th>";
                echo "<th>Тип Топлива</th>";
                echo "<th>Трансмиссия</th>";
                echo "<th>Цена</th>";
                echo "</tr>";
                
                echo "<tr>";
                echo "<td class='imageP'><img class='images' src='$mr[1]' alt='Изображение товара' width='80'></td>";
                echo "<td class='price'>$mr[7]</td>";
                echo "<td class='title'>$mr[2]</td>";
                echo "<td class='horsepower'>$mr[4]</td>";
                echo "<td class='fuel'>$mr[5]</td>";
                echo "<td class='transmittion'>$mr[6]</td>";
                echo "</tr>";
                
                echo "</table>";
                
            }
        ?>
        <a class="back-link" href="index.html">← На главную</a>
    </div>

    


    
</body>
</html>