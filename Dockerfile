# Wir nutzen ein schlankes Node.js Image
FROM node:20-slim

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nur die Package-Dateien kopieren, um den Cache optimal zu nutzen
COPY package*.json ./

# Abhängigkeiten installieren (erzeugt die node_modules im Image)
RUN npm install --production

# Den restlichen Code kopieren (index.html, server.js, js-Dateien, etc.)
COPY . .

# Sicherstellen, dass der Datenordner existiert
RUN mkdir -p /app/data

# Umgebungsvariable für den Pfad zur SQLite-DB
ENV DB_PATH=/app/data/einkauf.db

# Port deiner Anwendung (Standard für viele Node-Apps ist 3000, bitte anpassen falls nötig)
EXPOSE 3000

# Startbefehl
CMD ["node", "server.js"]