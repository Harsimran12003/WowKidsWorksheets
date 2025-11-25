import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// 📌 CONNECT MONGODB
// ================================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "wowkids",
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ================================
// 📌 MULTER STORAGE
// ================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/worksheets";

    // create folder if missing
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// ================================
// 📌 MONGOOSE MODEL
// ================================
const worksheetSchema = new mongoose.Schema({
  name: String,
  file: String,
  category: String,
  subCategory: String,
  createdAt: { type: Date, default: Date.now },
});

const Worksheet = mongoose.model("Worksheet", worksheetSchema);

// ================================
// 📌 ROUTES
// ================================

// ⭐ ADD WORKSHEET
app.post("/api/worksheets", upload.single("file"), async (req, res) => {
  try {
    const { name, category, subCategory } = req.body;

    const worksheet = await Worksheet.create({
      name,
      category,
      subCategory,
      file: req.file ? req.file.filename : null,
    });

    res.json({ success: true, worksheet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⭐ GET ALL WORKSHEETS
app.get("/api/worksheets", async (req, res) => {
  try {
    const data = await Worksheet.find().sort({ createdAt: -1 });
    res.json({ success: true, worksheets: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⭐ UPDATE WORKSHEET
app.put("/api/worksheets/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, category, subCategory } = req.body;
    const updateData = { name, category, subCategory };

    // If new file uploaded
    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updated = await Worksheet.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, worksheet: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⭐ DELETE WORKSHEET
app.delete("/api/worksheets/:id", async (req, res) => {
  try {
    const ws = await Worksheet.findById(req.params.id);

    if (!ws) return res.status(404).json({ success: false, message: "Not found" });

    // Delete file
    if (ws.file && fs.existsSync(`uploads/worksheets/${ws.file}`)) {
      fs.unlinkSync(`uploads/worksheets/${ws.file}`);
    }

    await Worksheet.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Worksheet deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⭐ Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================================
// 📌 START SERVER
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
