import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsListComponent } from './job-applications-list.component';

describe('JobApplicationsListComponent', () => {
  let component: JobApplicationsListComponent;
  let fixture: ComponentFixture<JobApplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
