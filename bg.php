<?php include("includes.php"); ?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Каталог товаров</title>
    <link rel="stylesheet" href="css/style_main.css">
</head>
<body>

<div class="buttons">
    <a href="add.php"><button class="btn">Добавить товар</button></a>
    <form action="output_order.php" method="post">
        <button type="submit" class="btn">Посмотреть заказ</button>
    </form>
    <a href="cart.php"><button class="btn">Корзина</button></a>
</div>

<h2 style="text-align:center;">Каталог товаров</h2>

<div class="products-grid">

    <?php
    $db = mysqli_connect($server, $login, $password, $db_name);

    if (!$db) {
        die("Ошибка подключения: " . mysqli_connect_error());
    }

    mysqli_select_db($db, "orders");

    $sql = "SELECT * FROM products";
    $result = mysqli_query($db, $sql);

    while ($row = mysqli_fetch_assoc($result)) : ?>
        <div class="card">
            <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['name']) ?>">
            <h3><?= htmlspecialchars($row['name']) ?></h3>
            <p class="price"><?= htmlspecialchars($row['price']) ?> ₽</p>
            <p class="description">
                <?= !empty($row['description']) ? htmlspecialchars($row['description']) : 'Нет описания' ?>
            </p>
            <form action="add_in_cart.php" method="POST">
                <input type="hidden" name="name" value="<?= htmlspecialchars($row['name']) ?>">
                <input type="hidden" name="price" value="<?= htmlspecialchars($row['price']) ?>">
                <input type="hidden" name="image" value="<?= htmlspecialchars($row['image']) ?>">
                <button type="submit" class="btn-card">Добавить в корзину</button>
            </form>
        </div>
    <?php endwhile; ?>

</div>

</body>
</html>