# **Smart Shopping Checklist (Einkaufs-Checkliste V2.0) 🛒**

A bilingual, real-time progressive web app (PWA) designed for highly efficient family grocery shopping.

[🇩🇪 Deutsche Beschreibung unten](#bookmark=id.8vxc7dfkwnja)

## **✨ Features**

* **⚡ Real-Time Sync:** Instant updates across devices via MQTT.  
* **🌐 Bilingual:** Full support for English and German.  
* **🌙 Dark / Light Mode:** Automatic system preference detection.  
* **🚶‍♂️ Smart Routing:** Individual aisle sorting per store.  
* **📦 Master Data:** Manage catalogs and categories easily.  
* **🎤 Voice Input:** Fast item entry using Web Speech API.  
* **📱 PWA Ready:** Installable on iOS and Android.

## **🚀 Installation & Setup**

### **Option A: The "Easy Way" (Docker Image)**

*Recommended for quick deployments.*

1. **Create a data directory:**  
   mkdir data

2. **Copy example.env to .env and configure your settings:**  
   cp example.env .env

3. **Use the provided Docker Compose file:**  
   mv compose\_image.yaml compose.yaml  
   docker compose up \-d

### **Option B: The "Developer Way" (Manual Setup)**

*Recommended if you want to modify the source code.*

1. **Clone the repository:**  
   git clone https://github.com/DeltaTango69/einkaufs-checkliste.git  
   cd einkaufs-checkliste

2. **Install Dependencies:**  
   npm install  
   npm install dotenv

3. **Configure:**  
   * Create a .env file based on example.env.  
   * Ensure an MQTT broker with WebSocket support is running.  
4. **Run the Server:**  
   node server.js

## **🇩🇪 Deutsche Beschreibung**

Eine zweisprachige Echtzeit-Web-App (PWA) für hocheffizientes Einkaufen in der Familie.

### **Hauptfunktionen**

* **Echtzeit-Synchronisation (MQTT):** Hakt jemand einen Artikel ab, verschwindet er sofort bei allen anderen.  
* **Zweisprachig:** Komplett in Deutsch und Englisch verfügbar.  
* **Individuelle Laufwege:** Für jeden Supermarkt kann die Reihenfolge der Regale (Kategorien) individuell sortiert werden.  
* **Spracheingabe:** Artikel einfach per Mikrofon diktieren.  
* **Verwaltung:** Katalog, Läden und Kategorien lassen sich bequem pflegen und Artikel neu zuweisen.

### **Starten**

#### **Weg 1: Schnellstart mit Docker (Empfohlen)**

1. **Erstelle ein Daten-Verzeichnis:** mkdir data  
2. **Erstelle eine .env Datei** aus der example.env.  
3. **Benenne compose\_image.yaml um:** mv compose\_image.yaml compose.yaml  
4. **Starte den Container:** docker compose up \-d

#### **Weg 2: Manuelle Installation**

1. **Repository klonen.**  
2. **npm install und npm install dotenv** ausführen.  
3. **.env Datei konfigurieren.**  
4. **Server starten:** node server.js

*Developed with Vue.js & Node.js*