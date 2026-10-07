import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import prisma from "../config/db.js";

export async function uploadDocument(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "File is required." });

    const uploadDir = path.resolve(process.cwd(), "storage/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${randomUUID()}-${safeName}`;
    const diskPath = path.join(uploadDir, fileName);
    await fs.writeFile(diskPath, req.file.buffer);

    const document = await prisma.document.create({
      data: {
        userId: req.user.id,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        storageUrl: `/uploads/${fileName}`,
        documentType: req.body.documentType || null,
      },
    });

    res.status(201).json({ success: true, document });
  } catch (error) { next(error); }
}
