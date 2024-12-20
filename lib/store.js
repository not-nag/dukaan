const Database = require("better-sqlite3");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Define database path
const dbPath = path.join(os.homedir(), ".dukaan", "store.db");
const dbDirectory = path.dirname(dbPath);

// Ensure the database directory exists
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Open the database connection
const db = new Database(dbPath);

// Create the `store` table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS store (
        key TEXT PRIMARY KEY,
        value TEXT
    )
`);

// Validation function for key-value pairs
function validateKeyValue(key, value) {
  if (key.length > 20) {
    console.error("Chaabi ki lambai 20 varno se adhik nahi honi chahiye");
    return false;
  }
  if (value.length > 100) {
    console.error("Mulya ki lambai 100 varno se adhik nahi honi chahiye");
    return false;
  }
  return true;
}

// Set or update a key-value pair
function setKeyValue(key, value) {
  if (!validateKeyValue(key, value)) return;

  try {
    const stmt = db.prepare(`
            INSERT INTO store (key, value) 
            VALUES (?, ?) 
            ON CONFLICT(key) 
            DO UPDATE SET value = excluded.value
        `);
    stmt.run(key, value);
    console.log(`Chaabi '${key}' aur uske mulya ko dukaan mein daal diya.`);
  } catch (err) {
    console.error(
      "Chaabi aur Mulya ko dukaan ke andar daal nahi sake.",
      err.message
    );
  }
}

// Get the value for a specific key
function getKeyValue(key) {
  try {
    const stmt = db.prepare(`SELECT value FROM store WHERE key = ?`);
    const row = stmt.get(key);
    if (row) {
      console.log(`${key}: ${row.value}`);
    } else {
      console.log(`Chaabi dukaan mein nahi mili`);
    }
  } catch (err) {
    console.error("Mulya praapt nahi kar sake", err.message);
  }
}

// Delete a key-value pair
function deleteKey(key) {
  try {
    const stmt = db.prepare(`DELETE FROM store WHERE key = ?`);
    const info = stmt.run(key);
    if (info.changes > 0) {
      console.log(
        `Chaabi '${key}' aur uska mulya ko dukaan se hata diya gaya.`
      );
    } else {
      console.log("Chaabi dukaan mein nahi mili");
    }
  } catch (err) {
    console.error("Chaabi nikaal nahi sake.", err.message);
  }
}

// Show all keys in the store
function showAllKeys() {
  try {
    const stmt = db.prepare(`SELECT key FROM store`);
    const rows = stmt.all();
    if (rows.length > 0) {
      console.log("Chaabiyan");
      console.log("");
      rows.forEach((row) => console.log(`-> ${row.key}`));
    } else {
      console.log("Koi Chaabi nahi hai dukaan mein.");
    }
  } catch (err) {
    console.error("Chaabi dhoond nahi sake", err.message);
  }
}

module.exports = { setKeyValue, getKeyValue, deleteKey, showAllKeys };
