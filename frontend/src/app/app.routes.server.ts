// src/app/app.routes.server.ts
import { ServerRoute, RenderMode } from '@angular/ssr';

// 👇 Fetch job IDs dynamically at prerender time
async function fetchJobIds(): Promise<string[]> {
  const res = await fetch('https://job-portal-l9am.onrender.com/api/jobs');
  const jobs = await res.json();
  return jobs.map((job: any) => String(job.id));
}

export const serverRoutes: ServerRoute[] = [
  // 🔹 STATIC ROUTES (no params)
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'jobs',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'jobs/new',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'applications',
    renderMode: RenderMode.Prerender,
  },

  // 🔹 DYNAMIC ROUTES (with IDs)
  {
    path: 'jobs/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const ids = await fetchJobIds();
      return ids.map(id => ({ id }));
    },
  },
  {
    path: 'jobs/edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const ids = await fetchJobIds();
      return ids.map(id => ({ id }));
    },
  },
  {
    path: 'jobs/:id/apply',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const ids = await fetchJobIds();
      return ids.map(id => ({ id }));
    },
  },
  {
    path: 'job-details/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const ids = await fetchJobIds();
      return ids.map(id => ({ id }));
    },
  },

  // 🔹 WILDCARD ROUTE (for 404 or unmatched)
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
