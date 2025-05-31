# ✨ Collaborative Text Editor

A **real-time collaborative text editor** built with **React**, **Vite**, **Tailwind CSS**, and **Yjs**. Multiple users can edit the same document simultaneously with live updates and rich text formatting (bold, italic, underline, colors, font sizes, etc.).

---

## 📌 Features

- Real-time collaboration using Yjs + WebSocket
- Rich text formatting options
- Personalized usernames (stored in browser)
- Built with React + Vite for fast performance
- Styled with Tailwind CSS

---

## 🚀 How to Run the Project

### 1. **Clone the Repository**
```bash 
git clone https://github.com/ikrajnish/wasserstoff.git
cd wasserstoff
## 2.Install Dependencies
     Make sure you have Node.js and npm installed.
bash
npm install
## 3. Run the Development Server
bash
npm run dev
After running, open your browser and go to:

http://localhost:5173

🛠 Tech Stack
React + Vite

Tailwind CSS

Yjs (shared data model)

y-websocket (real-time sync)

React Router (for routing between username and editor pages)

💡 How It Works
Users enter a username to join.

The editor connects to the shared document using Yjs and WebSocket (wss://demos.yjs.dev).

Any text typed is instantly shared with all other users in the same document.

Formatting uses document.execCommand() to apply styles to selected text.

🖼 Preview
Open the editor in multiple tabs or windows to see live collaborative editing in action.

📄 License
MIT License

👤 Author
Rajnish Kumar

yaml
Copy
Edit

---

Let me know if you want:
- https://wasserstoff-pi.vercel.app/






