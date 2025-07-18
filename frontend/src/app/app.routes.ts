import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./components/job-list/job-list.component').then(m => m.JobListComponent)
  },
  {
    path: 'jobs/new',
    loadComponent: () =>
      import('./components/job-form/job-form.component').then(m => m.JobFormComponent)
  },
  {
    path: 'jobs/edit/:id',
    loadComponent: () =>
      import('./components/job-form/job-form.component').then(m => m.JobFormComponent)
  },
  {
    path: 'jobs/:id',
    loadComponent: () =>
      import('./components/job-details/job-details.component').then(m => m.JobDetailsComponent)
  },
  {
    path: 'jobs/:id/apply',
    loadComponent: () =>
      import('./components/job-application-form/job-application-form.component').then(m => m.JobApplicationFormComponent)
  },
  {
    path: 'applications',
    loadComponent: () =>
      import('./components/job-applications-list/job-applications-list.component').then(m => m.GetAllApplicationsComponent)
  },
  {
    path: 'job-details/:id',  //
    loadComponent: () =>
      import('./components/job-details/job-details.component').then(m => m.JobDetailsComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
