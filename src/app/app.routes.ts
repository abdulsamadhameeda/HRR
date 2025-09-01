import { Routes } from '@angular/router';
import { Employees } from './components/employees/employees';
import { Department } from './components/department/department';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: Employees },
  { path: 'departments', component: Department },
];
