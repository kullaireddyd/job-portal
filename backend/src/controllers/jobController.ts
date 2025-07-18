import { Request, Response } from "express";
import db from "../db/connection";
import { RowDataPacket } from "mysql2";


// GET /api/jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM jobs ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// GET /api/jobs/:id
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.execute("SELECT * FROM jobs WHERE id = ?", [req.params.id]) as unknown as [any[]];

    if (rows.length === 0) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

// POST /api/jobs
export const createJob = async (req: Request, res: Response): Promise<void> => {
  const { job_title, company_name, location, job_type, salary_range, job_description, application_deadline } = req.body;

  if (!job_title || !company_name || !location || !job_type || !job_description || !application_deadline) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO jobs (job_title, company_name, location, job_type, salary_range, job_description, application_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [job_title, company_name, location, job_type, salary_range || null, job_description, application_deadline]
    );

    res.status(201).json({
      message: "Job created successfully",
      jobId: (result as any).insertId
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};
// PUT /api/jobs/:id
export const updateJob = async (req: Request, res: Response) => {
  const { job_title, company_name, location, job_type, salary_range, job_description, application_deadline } = req.body;
  try {
    const [result] = await db.execute(
      `UPDATE jobs SET job_title = ?, company_name = ?, location = ?, job_type = ?, salary_range = ?, job_description = ?, application_deadline = ? WHERE id = ?`,
      [job_title, company_name, location, job_type, salary_range || null, job_description, application_deadline, req.params.id]
    );
    res.json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
};

// DELETE /api/jobs/:id
export const deleteJob = async (req: Request, res: Response) => {
  try {
    await db.execute("DELETE FROM jobs WHERE id = ?", [req.params.id]);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
};
