import { Request, Response } from "express";
import db from "../db/connection";
import { RowDataPacket } from "mysql2";

export const applyToJob = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  const jobId = req.params.id;

  // Validate input fields
  if (!name || !email) {
    res.status(400).json({ error: "Applicant name and email are required" });
    return;
  }

  try {
    // Step 1: Check if the applicant has already applied to this job
    const [rows] = await db.execute(
      "SELECT * FROM applications WHERE job_id = ? AND email = ?",
      [jobId, email]
    );

    // Check if any rows were returned
    if (Array.isArray(rows) && rows.length > 0) {
      res.status(409).json({ error: "You have already applied to this job with this email." });
      return;
    }

    // Step 2: If no previous application, insert the new application
    await db.execute(
      "INSERT INTO applications (job_id, applicant_name, email) VALUES (?, ?, ?)",
      [jobId, name, email]
    );

    // Step 3: Send success response
    res.status(201).json({ message: "Applied successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Application failed" });
  }
};
  
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM applications") as unknown as [RowDataPacket[]];
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

export const getApplicationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM applications WHERE id = ?", 
        [req.params.id]
      ) as unknown as [RowDataPacket[]];
  
      if (rows.length === 0) {
        res.status(404).json({ error: "Application not found" });
        return;
      }
  
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch application" });
    }
  };
  
