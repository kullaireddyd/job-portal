import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Application {
    id?: number;
    job_id: number;
    applicant_name: string;
    email: string;
  }
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/api/applications'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  // Method to fetch all applications
  getAllApplications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to fetch application by ID
  getApplicationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  applyToJob(jobId: number, applicationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${jobId}`, applicationData);
  }

}
