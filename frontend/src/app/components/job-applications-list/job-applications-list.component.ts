import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/applicationservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-all-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-applications-list.component.html',
  styleUrls: ['./job-applications-list.component.scss'],
})
export class GetAllApplicationsComponent implements OnInit {
  applications: any[] = [];
  filteredApplications: any[] = [];
  loading = true;
  errorMessage = '';
  showSortDropdown = false;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllApplications();
  }

  getAllApplications(): void {
    this.applicationService.getAllApplications().subscribe(
      (data) => {
        this.applications = data;
        this.filteredApplications = [...data];
        this.loading = false;
      },
      () => {
        this.errorMessage = 'Error fetching applications';
        this.loading = false;
      }
    );
  }

  viewJobDetails(jobId: string): void {
    this.router.navigate(['/job-details', jobId], {
      queryParams: { fromApplications: true },
    });
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  applySort(criteria: string): void {
    if (criteria === 'name') {
      this.filteredApplications.sort((a, b) =>
        a.applicant_name.localeCompare(b.applicant_name)
      );
    } else if (criteria === 'jobIdAsc') {
      this.filteredApplications.sort((a, b) => a.job_id - b.job_id);
    } else if (criteria === 'jobIdDesc') {
      this.filteredApplications.sort((a, b) => b.job_id - a.job_id);
    }
    this.showSortDropdown = false;
  }
  
}
