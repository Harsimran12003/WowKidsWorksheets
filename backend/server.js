import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// 📌 CONNECT MONGODB
// ================================
mongoose
  .connect(process.env.MONGO_URI, { dbName: "wowkids" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ================================
// 📌 CLOUDINARY CONFIG
// ================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================================
// 📌 MULTER → CLOUDINARY STORAGE
// ================================
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wowkids_worksheets",
    resource_type: "auto",
    type: "upload",        // <-- forces PUBLIC mode
    access_mode: "public", // <-- ensures downloadable URL
  },
});


const upload = multer({ storage });

// ================================
// 📌 MONGOOSE MODEL
// ================================
const worksheetSchema = new mongoose.Schema({
  name: String,
  category: String,
  subCategory: String,
  file: String,
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
      file: req.file.path, // Cloudinary URL
    });

    res.json({ success: true, worksheet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ⭐ GET ALL WORKSHEETS
app.get("/api/worksheets", async (req, res) => {
  try {
    const data = await Worksheet.find().sort({ createdAt: -1 });
    res.json({ success: true, worksheets: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ⭐ UPDATE WORKSHEET
app.put("/api/worksheets/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, category, subCategory } = req.body;

    const updateData = { name, category, subCategory };

    if (req.file) {
      updateData.file = req.file.path;
    }

    const updated = await Worksheet.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, worksheet: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ⭐ DELETE WORKSHEET
app.delete("/api/worksheets/:id", async (req, res) => {
  try {
    const ws = await Worksheet.findById(req.params.id);
    if (!ws) return res.status(404).json({ success: false, message: "Not found" });

    await Worksheet.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Worksheet deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================================
// 📌 START SERVER (LOCAL ONLY)
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

export default app; // Needed for Vercel
