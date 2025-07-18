import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService, Job } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-job-details',
  imports:[CommonModule,RouterModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  jobId!: number;
  jobDetails!: Job;
  showApplyButton: boolean = false;  // Variable to control Apply Now button visibility

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    // Get the job ID from the URL
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));

    // Get the query parameter to check if the user came from the Applications page
    const fromApplications = this.route.snapshot.queryParamMap.get('fromApplications');
    if (fromApplications === 'true') {
      this.showApplyButton = true;
    }

    // Fetch job details by ID
    this.jobService.getJobById(this.jobId).subscribe({
      next: (data) => {
        this.jobDetails = data;
      },
      error: (err) => {
        console.error('Error fetching job details:', err);
      }
    });
  }
}
