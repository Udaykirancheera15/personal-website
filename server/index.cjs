const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Apply middleware BEFORE route handlers
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://work-1-fuqcofebzceqatus.prod-runtime.all-hands.dev',
    'https://work-2-fuqcofebzceqatus.prod-runtime.all-hands.dev'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Import routes
const contactRoutes = require("./routes/contact.cjs");
const aiRoutes = require("./routes/ai.cjs");

// ✅ Use API routes
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Serve frontend (Vite build in 'dist' folder)
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ✅ Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
