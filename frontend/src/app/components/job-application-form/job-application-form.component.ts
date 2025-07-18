import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.scss']
})
export class JobApplicationFormComponent implements OnInit {
  jobId: string = '';
  jobDeadline: string = '';
  applicant = {
    name: '',
    email: ''
  };
  isSubmitting = false;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id') || '';

    // Fetch job details including deadline
    this.http.get<any>(`http://localhost:3000/api/jobs/${this.jobId}`).subscribe({
      next: (job) => {
        this.jobDeadline = job.deadline; // Expected to be in YYYY-MM-DD format
      },
      error: () => {
        this.error = 'Failed to load job details.';
      }
    });
  }

  onSubmit() {
    const { name, email } = this.applicant;
    this.error = '';
    this.success = '';
  
    if (!name || !email) {
      this.error = 'Please fill in all fields.';
      return;
    }
  
    if (name.length > 100 || email.length > 100) {
      this.error = 'Name and email must be under 100 characters.';
      return;
    }
  
    const deadlineDate = new Date(this.jobDeadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (deadlineDate <= today) {
      this.error = 'The application deadline has passed.';
      return;
    }
  
    this.isSubmitting = true;
  
    this.http.post(`http://localhost:3000/api/applications/${this.jobId}/apply`, this.applicant).subscribe({
      next: () => {
        this.success = 'Application submitted successfully!';
        this.isSubmitting = false;
        this.applicant = { name: '', email: '' };
  
        // 👇 Redirect to applications page after 2 seconds
        setTimeout(() => this.router.navigate(['/applications']), 2000);
      },
      error: (err) => {
        if (err.status === 400) {
          this.error = 'Invalid input. Please check your details.';
        }
        else if (err.status === 409) {
          this.error = 'You Already applied to this job through this mail id please select new mail.';
        }
        else if (err.status === 500) {
          this.error = 'Server error. Please try again later.';
        } else {
          this.error = 'Application failed. Please try again.';
        }
        console.error('Application submission failed:', err);
        this.isSubmitting = false;
      }
    });
  }
}  