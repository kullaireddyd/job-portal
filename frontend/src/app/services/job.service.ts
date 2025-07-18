// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Job {
  id?: number;  // Optional ID if the backend generates it
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_range: string;
  job_description: string;
  application_deadline: string;
}



@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  // Get all jobs
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  // Get job by ID
  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  // Create a new job
  createJob(jobData: any) {
    return this.http.post(this.apiUrl, jobData);
  }
 
  updateJob(id: number, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jobData);
}

// Add this method
deleteJob(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


}

