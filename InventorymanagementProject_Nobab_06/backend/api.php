<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/db.php';
$pdo = get_db_connection();

function json_input() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) { return []; }
    return $data ?: [];
}

function respond($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

$entity = $_GET['entity'] ?? '';
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($entity) {
        case 'inventory':
            handle_crud($pdo, 'inventory', [
                'product_id','product_name','category','stock_level','usage_rate','quantity','procurement_schedule'
            ], $method, $id);
            break;
        case 'agricultural_products':
            handle_crud($pdo, 'agricultural_products', [
                'product_id','product_name','category','seed_type','sowing_date','expected_harvest','storage','shelf_life','packaging'
            ], $method, $id);
            break;
        case 'harvested_crops':
            handle_crud($pdo, 'harvested_crops', [
                'crop_id','temperature','humidity','category','harvest_date','crop_name','quantity','storage','processing_unit'
            ], $method, $id);
            break;
        case 'perishable_products':
            handle_crud($pdo, 'perishable_products', [
                'product_id','product_name','storage','product_type','category','expiry_date'
            ], $method, $id);
            break;
        case 'post_harvest':
            handle_crud($pdo, 'post_harvest', [
                'product_id','product_name','category','batch_number','expiry_date','storage_condition','location','quantity','stock_level_status'
            ], $method, $id);
            break;
        case 'storage_conditions':
            handle_crud($pdo, 'storage_conditions', [
                'warehouse_id','location','temperature','humidity'
            ], $method, $id);
            break;
        default:
            respond(['error' => 'Unknown entity'], 404);
    }
} catch (Throwable $e) {
    respond(['error' => $e->getMessage()], 500);
}

function handle_crud(PDO $pdo, string $table, array $fields, string $method, ?int $id): void {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $pdo->prepare("SELECT * FROM `$table` WHERE id = ?");
                $stmt->execute([$id]);
                $row = $stmt->fetch();
                respond($row ?: []);
            } else {
                $stmt = $pdo->query("SELECT * FROM `$table` ORDER BY id DESC");
                respond($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = json_input();
            $cols = [];
            $placeholders = [];
            $values = [];
            foreach ($fields as $f) {
                if (array_key_exists($f, $data)) {
                    $cols[] = "`$f`";
                    $placeholders[] = '?';
                    $values[] = $data[$f];
                }
            }
            if (!$cols) { respond(['error' => 'No data provided'], 422); }
            $sql = "INSERT INTO `$table` (" . implode(',', $cols) . ") VALUES (" . implode(',', $placeholders) . ")";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            $insertId = (int)$pdo->lastInsertId();
            respond(['id' => $insertId], 201);
        case 'PUT':
            if (!$id) { respond(['error' => 'ID required'], 400); }
            $data = json_input();
            $sets = [];
            $values = [];
            foreach ($fields as $f) {
                if (array_key_exists($f, $data)) {
                    $sets[] = "`$f` = ?";
                    $values[] = $data[$f];
                }
            }
            if (!$sets) { respond(['error' => 'No fields to update'], 422); }
            $values[] = $id;
            $sql = "UPDATE `$table` SET " . implode(',', $sets) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            respond(['updated' => true]);
        case 'DELETE':
            if (!$id) { respond(['error' => 'ID required'], 400); }
            $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = ?");
            $stmt->execute([$id]);
            respond(['deleted' => true]);
        default:
            respond(['error' => 'Method not allowed'], 405);
    }
}
?>



