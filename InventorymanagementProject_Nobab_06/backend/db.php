<?php
// Simple PDO connection helper
$config = require __DIR__ . '/config.php';

function get_db_connection(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $cfg = require __DIR__ . '/config.php';
    $dsn = 'mysql:host=' . $cfg['host'] . ';dbname=' . $cfg['database'] . ';charset=' . $cfg['charset'];
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, $cfg['user'], $cfg['password'], $options);
    return $pdo;
}
?>



