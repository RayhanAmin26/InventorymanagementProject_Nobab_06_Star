Agri Inventory Management – PHP + MySQL Backend

Prerequisites
- XAMPP (Apache + MySQL)
- PHP 8+

Setup
1. Copy the whole folder `InventorymanagementProject_Nobab_06` into `C:/xampp/htdocs/`.
2. Start Apache and MySQL from XAMPP Control Panel.
3. Import database:
   - Open `http://localhost/phpmyadmin/`.
   - Create database `agri_inventory` (utf8mb4).
   - Import file: `InventorymanagementProject_Nobab_06/backend/db.sql`.
4. Update DB credentials if needed in `backend/config.php`.

Run
- Visit `http://localhost/InventorymanagementProject_Nobab_06/index.html`.
- API endpoint: `http://localhost/InventorymanagementProject_Nobab_06/backend/api.php`.

CRUD Endpoints
- GET /backend/api.php?entity=inventory
- POST /backend/api.php?entity=inventory (JSON body)
- PUT /backend/api.php?entity=inventory&id=1 (JSON body)
- DELETE /backend/api.php?entity=inventory&id=1

Entities: inventory, agricultural_products, harvested_crops, perishable_products, post_harvest, storage_conditions.

Frontend wiring
- All pages include `Js/script.js` which loads and submits data to the API.
- Make sure the site is served from XAMPP so relative path `backend/api.php` works.

Notes
- CORS is open for local dev. For production, restrict origins.
- Date fields expect YYYY-MM-DD.

