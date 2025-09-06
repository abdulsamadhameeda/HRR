import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-departments',
  imports: [ReactiveFormsModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {
  departments: department[] = [
    {
      id: 1,
      name: 'IT',
      description: 'this dis for it',
      floornumber: 1,
      typename: 'dfds',
    },
    {
      id: 2,
      name: 'sales',
      description: 'this dis for sale',
    },
    {
      id: 3,
      name: 'accounting',
      description: 'this dis for accounting',
      floornumber: 1,
    },
    {
      id: 4,
      name: 'managment',
      description: 'this dis for managment',
      floornumber: 1,
    },
  ];

  departmentTableColumns: string[] = ['#', 'name', 'description', 'floornumber', 'typename'];

  departmentform: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Name: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    Floornumber: new FormControl(null),
    TypeId: new FormControl(null),
    TypeName: new FormControl(null),
  });
}
export interface department {
  id: number;
  name: string;
  description: string;
  floornumber?: number;
  typeid?: number;
  typename?: string;
}
