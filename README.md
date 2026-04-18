# 🛰️ Strategic Fusion Dashboard

A modern intelligence visualization system that integrates **OSINT, HUMINT, and IMINT** into a unified geospatial dashboard.

---

## 🚀 Live Demo

👉 https://fusion-dashboard.vercel.app

---

## 📌 GitHub Repository

👉 https://github.com/pragati-tripathi/fusion-dashboard

---

## 🧠 Project Overview

The Strategic Fusion Dashboard is designed to simulate a real-world intelligence system where multiple data sources are combined and visualized on an interactive map.

Users can upload different data formats, which are processed and displayed as intelligence nodes with rich metadata and visual context.

---

## ✨ Key Features

* 🌍 Interactive world map using Leaflet
* 📍 Dynamic marker visualization
* 📂 Upload support:

  * CSV (bulk data ingestion)
  * JSON (structured intelligence data)
  * Images (IMINT simulation)
* 🧠 Multi-source intelligence:

  * OSINT (Open Source)
  * HUMINT (Human Intelligence)
  * IMINT (Imagery Intelligence)
* 🖼️ Popup with:

  * Title, summary, metadata
  * Classification & confidence
  * Image preview with fallback handling
* 💾 Local storage persistence (data remains after refresh)
* ⚡ Real-time UI updates

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript
* **Build Tool:** Vite
* **Map Library:** Leaflet (react-leaflet)
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

---

## ⚙️ How It Works

1. User uploads CSV / JSON / Image
2. Data is parsed and converted into structured nodes
3. Nodes are plotted on the map using latitude & longitude
4. Each marker displays detailed intelligence in a popup
5. Data is stored locally for persistence

---

## 🧪 Sample Test Data

### JSON Example

```json
[
  {
    "title": "Test Location",
    "lat": 28.6,
    "lng": 77.2,
    "source": "OSINT"
  }
]
```

### CSV Example

```
title,lat,lng
Delhi,28.6,77.2
Mumbai,19.0,72.8
```

---

## 📌 Notes

* This project uses **simulated/demo data** for visualization.
* The architecture supports integration with real APIs or databases.
* No authentication is implemented as the focus is on data ingestion and visualization.

---

## 🎯 Future Improvements

* Backend integration (Node.js / APIs)
* Real-time data streaming
* Authentication & user roles
* Database storage (MongoDB / Firebase)
* Advanced filtering & analytics

---

## 👤 Author

**Pragati Tripathi**

---

## 📄 License

This project is for educational and assignment purposes.

