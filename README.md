# 🎉 VBDA 2025 Invitation Generator

This project is a full-stack web application that allows users to generate personalized invitation messages for VBDA 2025. It includes a form to collect guest details, generates AI-powered invitations, and displays all sent invites with pagination.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js (Express)
- **Database:** SQLite
- **API:** Mock AI message generation 

---

## 📁 Folder Structure

VBDA/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── App.js
│ ├── App.css
│ └── ...
├── server/ # Node.js backend
│ ├── index.js
│ └── invites.db # SQLite database
├── README.md
└── package.json

yaml
Copy
Edit

---

## 🚀 Features

- Add guest details through a form
- Generate personalized invitation message
- Save invite details to SQLite database
- View all generated invites with pagination
- Clean and interactive UI

---

## 📦 Installation

### 1. Clone the Repository

bash
git clone https://github.com/your-username/vbda.git
cd vbda
###2. Setup Backend (server)

cd server
npm install
node index.js
Runs at: http://localhost:5000
###3. Setup Frontend (client)
cd ../client
npm install
npm start
Runs at: http://localhost:3000


🖼️ Screenshots

Generate invitation
![Screenshot (117)](https://github.com/user-attachments/assets/48a43a6c-9f21-4bd0-b026-b09bacc543ff)

All Invitations
![Screenshot (118)](https://github.com/user-attachments/assets/1934d544-0807-4426-abb7-362ce86befcb)




📌 Example Invite Message
Dear John Doe,

You are cordially invited to VBDA 2025 as a distinguished Senior Analyst from DataCorp.
We look forward to your presence.

Regards,
VBDA Team



👨‍💻 Author
Bijjala Sirisha
