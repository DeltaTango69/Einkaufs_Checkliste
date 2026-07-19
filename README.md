# **Smart Shopping Checklist (Einkaufs-Checkliste V2.0) 🛒**

A bilingual, real-time progressive web app (PWA) designed for highly efficient family grocery shopping.

Features real-time synchronization via MQTT, offline-capable UI (Vue.js), and intelligent store-specific category routing.

[*🇩🇪 Deutsche Beschreibung unten*](#bookmark=id.3bkk89ivq1bw)

## **✨ Features**

* **⚡ Real-Time Sync:** Instant updates across all connected devices using MQTT. If your partner checks off an item, it disappears from your screen immediately.  
* **🌐 Bilingual:** Fully translated into English and German.  
* **🌙 Dark / Light Mode:** Automatic system preference detection with manual override.  
* **🚶‍♂️ Smart Routing (Laufwege):** Categories (aisles) can be sorted individually for *each* store. The app remembers your preferred route through your local supermarket.  
* **📦 Master Data Management:** Manage stores, categories, and a catalog of items. Easily reassign items to different categories.  
* **🎤 Voice Input:** Add items quickly using the built-in Web Speech API (supports English and German).  
* **📱 PWA Ready:** Installable on iOS and Android home screens for an app-like experience.

## **🛠 Tech Stack**

* **Frontend:** HTML5, CSS3, Vue.js 3 (via CDN/local file), MQTT.js  
* **Backend:** Node.js, Express.js  
* **Database:** SQLite3  
* **Communication:** MQTT (WebSockets), REST API

## **🚀 Installation & Setup**

### **Prerequisites**

1. **Node.js** installed on your server/machine.  
2. An active **MQTT Broker** with WebSocket support (e.g., Mosquitto).

### **1\. Clone the repository**

git clone https://github.com/YOUR\_USERNAME/einkaufs-checkliste.git  
cd einkaufs-checkliste

### **2\. Install Dependencies**

npm install

### **3\. Environment Variables**

You can configure the backend using environment variables. Create a .env file or pass them directly:

* PORT: Port for the Express server (Default: 3000\)  
* DB\_PATH: Path to the SQLite database (Default: ./einkauf.db)  
* MQTT\_BROKER: IP/Hostname of your MQTT broker (Default: localhost)  
* MQTT\_PORT: WebSocket port of your MQTT broker (Default: 9001\)  
* MQTT\_WS\_URL: Full WebSocket URL for secure (HTTPS) connections (e.g., wss://mqtt.yourdomain.com)

### **4\. Run the Server**

node server.js

The app will be available at http://localhost:3000.

## **🇩🇪 Deutsche Beschreibung**

Eine zweisprachige Echtzeit-Web-App (PWA) für hocheffizientes Einkaufen in der Familie.

### **Hauptfunktionen**

* **Echtzeit-Synchronisation (MQTT):** Hakt jemand einen Artikel ab, verschwindet er sofort bei allen anderen.  
* **Zweisprachig:** Komplett in Deutsch und Englisch verfügbar.  
* **Individuelle Laufwege:** Für jeden Supermarkt kann die Reihenfolge der Regale (Kategorien) individuell sortiert werden.  
* **Spracheingabe:** Artikel einfach per Mikrofon diktieren.  
* **Verwaltung:** Katalog, Läden und Kategorien lassen sich bequem pflegen und Artikel neu zuweisen.

### **Starten**

1. Repository klonen.  
2. npm install im Ordner ausführen.  
3. Node-Server mit node server.js starten (benötigt einen laufenden MQTT Broker mit WebSockets).

*Developed with Vue.js & Node.js*