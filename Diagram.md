```mermaid
sequenceDiagram
    participant U as 👤 User (Client)
    participant S as 🌐 Server (Express + JWT)
    participant DB as 🗄️ Database (MongoDB)

    U->>S: 1️⃣ Sign Up / Login Request (email + password)
    S->>DB: 2️⃣ Verify or Create User in DB
    DB-->>S: 3️⃣ User Validated ✅
    S-->>U: 4️⃣ Generate JWT Token 🔑 and send (in cookie or response)
    U->>U: 5️⃣ Store Token (Cookie/LocalStorage)

    U->>S: 6️⃣ Request Protected Route (/profile)
    S->>S: 7️⃣ Verify JWT Token Signature 🔍
    S->>DB: 8️⃣ Fetch User Data if token is valid
    S-->>U: 9️⃣ Send Protected Data (Profile Info)
