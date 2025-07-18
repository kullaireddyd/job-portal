// src/app/components/job-form/job-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  job: Job = {
    job_title: '',
    company_name: '',
    location: '',
    job_type: '',
    salary_range: '',
    job_description: '',
    application_deadline: ''
  };

  isEditMode = false;
  jobId: number | null = null;
  formSubmitted = false;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.jobId;

    if (this.isEditMode) {
      this.jobService.getJobById(this.jobId).subscribe({
        next: (data) => (this.job = data),
        error: (err) => console.error('Error loading job', err)
      });
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;

    const errors: string[] = [];

    if (!this.job.job_title) errors.push("Job Title is required.");
    if (!this.job.company_name) errors.push("Company Name is required.");
    if (!this.job.location) errors.push("Location is required.");
    if (!this.job.job_type) errors.push("Job Type is required.");
    if (!this.job.job_description) errors.push("Job Description is required.");

    const deadline = new Date(this.job.application_deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!this.job.application_deadline) {
      errors.push("Application Deadline is required.");
    } else if (deadline <= today) {
      errors.push("Application Deadline must be a future date.");
    }

    if (errors.length > 0) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return;
    }

    if (this.isEditMode && this.jobId) {
      this.jobService.updateJob(this.jobId, this.job).subscribe({
        next: () => {
          alert('Job updated successfully!');
          this.router.navigate(['/jobs']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update job.');
        }
      });
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          alert('Job created successfully!');
          this.router.navigate(['/jobs']);
        },
        error: (err) => {
          console.error('Creation failed:', err);
          alert('Failed to create job.');
        }
      });
    }
  }

  isPastDeadline(dateString: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dateString);
    return deadline <= today;
  }
}