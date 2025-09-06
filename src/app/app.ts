import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { RandomColor } from './directives/random-color';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReversePipe } from './pips/reverse-pipe';
import { Employees } from './components/employees/employees';
import { Departments } from './components/departments/departments';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgClass,
    NgIf,
    NgFor,
    NgStyle,
    RandomColor,
    ReversePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Employees,
    Departments,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
