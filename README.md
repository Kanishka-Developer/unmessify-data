# unmessify-data
Data for Unmessify

## Overview

This repository contains CSV data files and their corresponding JSON representations in NocoDB API format. The JSON files are automatically generated from CSV files using GitHub Actions.

## Structure

```
├── csv/                       # Source CSV files
│   ├── VITC-A-L.csv          # Date and RoomNumber data
│   ├── VITC-B-L.csv          # Date and RoomNumber data
│   ├── VITC-CB-L.csv         # Date and RoomNumber data
│   ├── VITC-CG-L.csv         # Date and RoomNumber data
│   ├── VITC-D1-L.csv         # Date and RoomNumber data
│   ├── VITC-D2-L.csv         # Date and RoomNumber data
│   ├── VITC-M-N.csv          # Menu data (Day, Breakfast, Lunch, Snacks, Dinner)
│   ├── VITC-M-S.csv          # Menu data (Day, Breakfast, Lunch, Snacks, Dinner)
│   ├── VITC-M-V.csv          # Menu data (Day, Breakfast, Lunch, Snacks, Dinner)
│   ├── VITC-W-N.csv          # Menu data (Day, Breakfast, Lunch, Snacks, Dinner)
│   ├── VITC-W-S.csv          # Menu data (Day, Breakfast, Lunch, Snacks, Dinner)
│   └── VITC-W-V.csv          # Menu data (Day, Breakfast, Lunch, Snacks, Dinner)
├── json/                     # Generated JSON files (NocoDB API format)
│   ├── VITC-A-L.json
│   ├── VITC-B-L.json
│   ├── ... (corresponding JSON files)
│   └── VITC-W-V.json
├── assets/                   # PWA icons and static assets
│   ├── icon-*.png           # App icons (various sizes)
│   └── icon.svg             # Source icon
├── index.html               # Main PWA application
├── styles.css               # Application styles
├── app.js                   # Application JavaScript
├── manifest.json            # PWA manifest
├── sw.js                    # Service Worker for offline support
├── convert_csv_to_json.py   # Python script for CSV to JSON conversion
└── .github/workflows/       # GitHub Actions workflows
    ├── csv-to-json.yml      # Auto-conversion workflow
    └── deploy-pages.yml     # GitHub Pages deployment
```

## JSON Format

The generated JSON files follow the NocoDB API format with the following structure:

```json
{
  "list": [
    {
      "Id": 1,
      "ncRecordId": "rec...",
      "ncRecordHash": "...",
      "Date": "1",
      "RoomNumber": null,
      "CreatedAt": "2025-07-01 00:00:00+00:00",
      "UpdatedAt": "2025-07-01 12:34:56+00:00"
    }
  ],
  "pageInfo": {
    "totalRows": 31,
    "page": 1,
    "pageSize": 50,
    "isFirstPage": true,
    "isLastPage": true
  },
  "stats": {
    "dbQueryTime": "1.234"
  }
}
```

## Automatic Conversion

When CSV files in the `csv/` directory are modified:

1. GitHub Actions automatically triggers the conversion workflow
2. The `convert_csv_to_json.py` script processes all CSV files
3. Updated JSON files are generated in the `json/` directory
4. Changes are automatically committed back to the repository

## Manual Conversion

To manually convert CSV files to JSON:

```bash
python convert_csv_to_json.py
```

## Data Types

### Room Assignment Files (VITC-*-L.csv)
- **Date**: Day number (1-31)
- **RoomNumber**: Room range assignment (e.g., "101 - 248") or null for no assignment

### Menu Files (VITC-M-*.csv, VITC-W-*.csv)
- **Day**: Day of the week (Monday, Tuesday, etc.)
- **Breakfast**: Breakfast menu items
- **Lunch**: Lunch menu items  
- **Snacks**: Snacks menu items
- **Dinner**: Dinner menu items

## Frontend Application

The repository includes a modern, responsive Progressive Web App (PWA) that provides an intuitive interface to explore the data:

🌐 **Live Site**: [https://kanishka-developer.github.io/unmessify-data/](https://kanishka-developer.github.io/unmessify-data/)

### Features

- **📱 Progressive Web App**: Install as a mobile app for offline access
- **🔍 Smart Search**: Search across all tables and data records
- **📊 Interactive Cards**: Visual overview of each data table with statistics
- **🎯 Filtering**: Filter by data type (Room Assignments or Menus)
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🌙 Dark Mode**: Automatic dark mode support based on system preferences
- **⚡ Fast Performance**: Lightweight design with service worker caching
- **🔗 Direct Links**: PWA shortcuts for quick access to specific data types

### PWA Installation

On mobile devices:
1. Open the website in your browser
2. Tap "Install App" button or browser's "Add to Home Screen"
3. Use the app like any native mobile application

On desktop:
1. Visit the website in Chrome/Edge
2. Click the install icon in the address bar
3. Install for quick access from your desktop
