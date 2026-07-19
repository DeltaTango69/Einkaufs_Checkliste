const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_PATH || path.join(__dirname, 'einkauf.db');

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error("CRITICAL: Datenbankfehler:", err.message);
    } else {
        console.log("------------------------------------------");
        console.log("DATENBANK-STATUS:");
        console.log("Pfad:", DB_FILE);
        console.log("------------------------------------------");
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS shops (id TEXT PRIMARY KEY, name TEXT, regalOrder TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS catalog (id TEXT PRIMARY KEY, name TEXT, regal TEXT, laeden TEXT, isPlaceholder INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS active_list (id TEXT PRIMARY KEY, qty INTEGER, checked INTEGER, addedBy TEXT, addedAt TEXT)");
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// API: Alles laden
app.get('/api/data', (req, res) => {
    const data = { shops: [], catalog: [], activeList: {} };
    
    db.all("SELECT * FROM shops", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        data.shops = rows.map(r => ({...r, regalOrder: JSON.parse(r.regalOrder || '[]')}));
        
        db.all("SELECT * FROM catalog", [], (err, cRows) => {
            if (err) return res.status(500).json({ error: err.message });
            data.catalog = cRows.map(r => ({...r, laeden: JSON.parse(r.laeden || '[]'), isPlaceholder: !!r.isPlaceholder}));
            
            db.all("SELECT * FROM active_list", [], (err, aRows) => {
                if (err) return res.status(500).json({ error: err.message });
                aRows.forEach(r => {
                    data.activeList[r.id] = { qty: r.qty, checked: !!r.checked, addedBy: r.addedBy, addedAt: r.addedAt };
                });
                res.json(data);
            });
        });
    });
});

// API: Einzelnes Item speichern oder Liste leeren
app.post('/api/save-item', (req, res) => {
    const { id, itemData, catalogData, clearAll } = req.body;
    
    db.serialize(() => {
        if (clearAll) {
            db.run("DELETE FROM active_list", [], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                return res.json({ status: 'cleared' });
            });
            return;
        }
        
        if (catalogData) {
            db.run("INSERT OR REPLACE INTO catalog (id, name, regal, laeden, isPlaceholder) VALUES (?, ?, ?, ?, ?)",
                [catalogData.id, catalogData.name, catalogData.regal, JSON.stringify(catalogData.laeden), catalogData.isPlaceholder ? 1 : 0]);
        }
        
        if (itemData) {
            db.run("INSERT OR REPLACE INTO active_list (id, qty, checked, addedBy, addedAt) VALUES (?, ?, ?, ?, ?)",
                [id, itemData.qty, itemData.checked ? 1 : 0, itemData.addedBy, itemData.addedAt]);
        } else {
            db.run("DELETE FROM active_list WHERE id = ?", [id]);
        }
        res.json({ status: 'success' });
    });
});

// API: Alles auf einmal speichern (Shops & Katalog Synchronisation)
app.post('/api/save-all', (req, res) => {
    const { shops, catalog, activeList } = req.body;
    
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        
        db.run("DELETE FROM shops");
        const shopStmt = db.prepare("INSERT INTO shops (id, name, regalOrder) VALUES (?, ?, ?)");
        shops.forEach(s => shopStmt.run(s.id, s.name, JSON.stringify(s.regalOrder)));
        shopStmt.finalize();
        
        db.run("DELETE FROM catalog");
        const catStmt = db.prepare("INSERT INTO catalog (id, name, regal, laeden, isPlaceholder) VALUES (?, ?, ?, ?, ?)");
        catalog.forEach(c => catStmt.run(c.id, c.name, c.regal, JSON.stringify(c.laeden), c.isPlaceholder ? 1 : 0));
        catStmt.finalize();

        if (activeList) {
            db.run("DELETE FROM active_list");
            const activeStmt = db.prepare("INSERT INTO active_list (id, qty, checked, addedBy, addedAt) VALUES (?, ?, ?, ?, ?)");
            Object.keys(activeList).forEach(id => {
                const item = activeList[id];
                activeStmt.run(id, item.qty, item.checked ? 1 : 0, item.addedBy, item.addedAt);
            });
            activeStmt.finalize();
        }
        
        db.run("COMMIT", (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ status: 'success' });
        });
    });
});

// API: MQTT-Konfiguration
app.get('/api/config', (req, res) => {
    res.json({
        broker: process.env.MQTT_BROKER || 'localhost',
        wsUrl: process.env.MQTT_WS_URL || '',
        port: process.env.MQTT_PORT || '9001'
    });
});

app.listen(PORT, () => {
    console.log(`Einkauf-Server (SQLite) läuft auf Port ${PORT}`);
});