-- Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  job_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') NOT NULL,
  salary_range VARCHAR(255),
  job_description TEXT NOT NULL,
  application_deadline DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the applications table
CREATE TABLE IF NOT EXISTS applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  applicant_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);
