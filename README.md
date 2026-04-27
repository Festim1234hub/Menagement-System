 Si të nisni projektin

 Hapi 1 — Sigurohu që Docker Desktop është hapur dhe running 

 Hapi 2 — Hap Terminal në VS Code dhe shkruaj:

```bash
docker-compose up --build
```

Prit derisa të shohësh në terminal:
 mysql is ready
 Auth Service running on port 3001
 Project Service running on port 3002
 Task Service running on port 3003
 Notification Service running on port 3004
 
 Hapi 3 — Hap browserin dhe shko tek:
 http://localhost:5173  ← Frontend

 Për të ndalur projektin:
```bash
docker-compose down
```