📊 Log Monitoring Dashboard

A React-based log monitoring dashboard inspired by tools like Kibana and Logz.io. This project focuses on building a responsive UI for exploring and filtering large volumes of log data efficiently.

🚀 Features
Filter logs by keyword, log level, source, and transaction ID
Quick time filters (Today, Last 24 Hours, 7 Days, 30 Days)
Custom date range selection
Interactive charts (click to filter logs by time range)
Logs table with:
server-side–style pagination (simulated)
sorting
expandable log messages
Debounced search to reduce unnecessary renders and improve performance
🧠 Tech Stack
React (Hooks)
Recharts
React Router
Context API
Custom Hooks
📁 Project Structure
src/
components/ # reusable components
pages/ # route-level components
hooks/ # custom hooks
services/ # data handling / API simulation
context/ # global statemanagement
ui/ # base UI elements
▶️ Getting Started
npm install
npm run dev
📌 Implementation Details
Optimized rendering using debouncing and controlled state updates
Designed to handle large datasets through pagination instead of rendering all logs at once
Modular structure to keep components reusable and maintainable
Simulated API layer to mimic real-world log fetching and filtering
🧑‍💻 Author
Arti Joshi
