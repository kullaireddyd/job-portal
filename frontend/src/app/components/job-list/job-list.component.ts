// src/app/components/job-list/job-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService, Job } from '../../services/job.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService, private router: Router) {}

  viewJob(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/jobs', id]);
    }
  }
  
  editJob(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/jobs/edit', id]);
    }
  }
  deleteJob(id: number) {
    if (confirm("Are you sure you want to delete this job?")) {
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(job => job.id !== id);
        },
        error: (err:any) => {
          console.error("Delete failed", err);
        }
      });
    }
  }
  createNewJob() {
    this.router.navigate(['/jobs/new']);
  }
  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Error fetching jobs:', err)
    });
  }
}
