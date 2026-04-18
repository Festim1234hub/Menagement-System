<<<<<<< HEAD
# Menagement-System
=======
# Menagement-System

## Frontend — Orbitlane UI

### Kërkesa

- **Node.js** 18 ose më i ri

### Paketat që duhen instaluar

Nga dosja `frontend`, krijo `package.json` (kopjo përmbajtjen më poshtë) dhe pastaj ekzekuto:

```bash
cd frontend
npm install
```

Ose instaloji direkt pa `package.json` të plotë:

```bash
cd frontend
npm install chart.js@^4.4.3 react@^18.3.1 react-chartjs-2@^5.2.0 react-dom@^18.3.1
npm install -D vite@^5.4.2 @vitejs/plugin-react@^4.3.1
```

Pastaj shto skriptet në `package.json` si në shembullin e plotë më poshtë (`"type": "module"`, `dev`, `build`, `preview`).

### Shembull `package.json` për frontend

```json
{
  "name": "management-system-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "chart.js": "^4.4.3",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2"
  }
}
```

### Komanda

| Komandë           | Përshkrim        |
| ----------------- | ---------------- |
| `npm run dev`     | server zhvillimi |
| `npm run build`   | build prod       |
| `npm run preview` | parapamje build  |

---

Pjesa tjetër e projektit (backend, Docker, etj.) dokumentohet sipas nevojës së ekipit.
>>>>>>> master
