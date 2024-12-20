const sqlite3 = require('sqlite3');
const path = require('path')
const os = require('os');
const fs = require('fs');
const dbPath = path.join(os.homedir(), ".dukaan", "store.db")
const dbDirectory = path.dirname(dbPath);
if(!fs.existsSync(dbDirectory)){
    fs.mkdirSync(dbDirectory, {recursive: true})
}



const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database nahi kholsake.", err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS store (
                    key TEXT PRIMARY KEY,
                    value TEXT
                )`, (err) => {
                    if (err) {
                        console.error("Table nahi bana sake.", err.message);
                    }
                }
            );
    }
});


function validateKeyValue(key, value){
    if(key.length > 20){
        console.error("Chaabi ki lambai 20 varno se adhik nahi honi chahiye");
        return false;
    }
    if(value.length > 100){
        console.error("Mulya ki lambai 100 varno se adhik nahi honi chahiye");
        return false;
    }
    return true;
}

function setKeyValue(key, value) {
    // Validate the key-value before proceeding
    if (!validateKeyValue(key, value)) {
        return;
    }
    db.run(`INSERT INTO store (key, value) 
            VALUES (?, ?) 
            ON CONFLICT(key) 
            DO UPDATE SET value = ?`, [key, value, value], 
        (err) => {
            if (err) {
                console.error("Mulya set nahi kar sake.", err.message);
            } else {
                console.log(`Chaabi '${key}' aur uska mulya jodd diya hai`);
            }
        });
}

function getKeyValue(key){
    db.get(`SELECT value from store WHERE key = ?`, 
        [key], (err, row)=>{
            if(err){
                console.error("Mulya praapt nahi kar sake", err.message)
            } else if(row){
                console.log(`${key}:${row.value}`)
            }else{
                console.log(`Chaabi dukaan mein nahi mili`)
            }
        })
}

function deleteKey(key){
    db.run('DELETE FROM store WHERE key = ?', [key], function(err) {
        if (err) {
            console.error('Chaabi nikaal nahi sake.', err.message);
        } else if (this.changes > 0) { 
            console.log(`Chaabi '${key}' aur uska mulya hata diya gaya.`);
        } else {
            console.log('Chaabi nahi mili');
        }
    });
}

function showAllKeys(){
    db.all(`SELECT key FROM store`, [], (err, rows)=>{
        if (err) {
            console.error('Chaabi dhoond nahi sake', err.message);
          } else if (rows.length > 0) {
            console.log('Chaabiyan:');
            rows.forEach((row) => console.log(`-> ${row.key}`));
          } else {
            console.log('Koi Chaabi nahi hai dukaan mein.');
          }
    })
}





module.exports = { setKeyValue, getKeyValue, deleteKey, showAllKeys };
