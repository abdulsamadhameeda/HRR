import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  providers: [DatePipe],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  @ViewChild('closeButton') closeButton: any;

  employees: Employee[] = [
    {
      id: 1,
      name: 'Emp1',
      isActive: true,
      startDate: new Date(2025, 11, 21),
      phone: '+96255895155',
      positionId: 1,
      positionName: 'Manager',
      birthdate: new Date(1995, 5, 1),
      departmentId: 1,
      departmentName: 'HR',
      managerId: null,
      managerName: null,
    },
    {
      id: 2,
      name: 'Emp2',
      isActive: true,
      startDate: new Date(2025, 6, 21),
      phone: '+9625466456',
      positionId: 1,
      positionName: 'Manager',
      birthdate: new Date(1994, 5, 1),
      departmentId: 2,
      departmentName: 'IT',
      managerId: null,
      managerName: null,
    },
    {
      id: 3,
      name: 'Emp3',
      isActive: false,
      startDate: new Date(2025, 5, 21),
      phone: '+9677777',
      positionId: 2,
      positionName: 'Developer',
      birthdate: new Date(2000, 5, 1),
      departmentId: 2,
      departmentName: 'IT',
      managerId: 2,
      managerName: 'Emp2',
    },
    {
      id: 4,
      name: 'Emp4',
      isActive: true,
      startDate: new Date(2025, 1, 11),
      phone: '+964534534534',
      positionId: 2,
      positionName: 'Developer',
      birthdate: new Date(2001, 5, 1),
      departmentId: 2,
      departmentName: 'IT',
      managerId: 2,
      managerName: 'Emp2',
    },
    {
      id: 5,
      name: 'Emp5',
      isActive: false,
      startDate: new Date(2025, 2, 25),
      phone: '+9622244552',
      positionId: 3,
      positionName: 'HR',
      birthdate: new Date(1999, 5, 1),
      departmentId: 1,
      departmentName: 'HR',
      managerId: 1,
      managerName: 'Emp1',
    },
  ];

  employeesTableColumns: string[] = [
    '#',
    'Name',
    'Phone',
    'Birthdate',
    'Status',
    'Start Date',
    'Position',
    'Department',
    'Manager',
  ];

  depatments = [
    { id: null, name: '--Select depatment--' },
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
  ];

  positions = [
    { id: null, name: '--Select position--' },
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Developer' },
    { id: 3, name: 'Hr' },
  ];
  Managers = [
    { id: null, name: '--Select Manager--' },
    { id: 1, name: 'Emp1' },
    { id: 2, name: 'Emp2' },
  ];

  EmployeeForm: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Name: new FormControl(null, [Validators.required]),
    Phone: new FormControl(null, [Validators.required]),
    Birthdate: new FormControl(null, [Validators.required]),
    Startdate: new FormControl(null, [Validators.required]),
    Department: new FormControl(null, [Validators.required]),
    Manager: new FormControl(null),
    Position: new FormControl(null, [Validators.required]),
    IsActive: new FormControl(true, [Validators.required]),
  });

  saveEmployee() {
    if (!this.EmployeeForm.value.Id) {
      let newemp: Employee = {
        id: this.employees[this.employees.length - 1].id + 1,
        name: this.EmployeeForm.value.Name,
        phone: this.EmployeeForm.value.Phone,
        birthdate: this.EmployeeForm.value.Birthdate,
        startDate: this.EmployeeForm.value.Startdate,
        isActive: this.EmployeeForm.value.IsActive,
        departmentId: this.EmployeeForm.value.Department,
        departmentName: this.depatments.find((x) => x.id == this.EmployeeForm.value.Department)
          ?.name,
        managerId: this.EmployeeForm.value.Manager,
        managerName: this.EmployeeForm.value.Manager
          ? this.Managers.find((x) => x.id == this.EmployeeForm.value.Manager)?.name
          : null,
        positionId: this.EmployeeForm.value.Position,
        positionName: this.positions.find((x) => x.id == this.EmployeeForm.value.Position)?.name,
      };
      this.employees.push(newemp);
    } else {
      let index = this.employees.findIndex((x) => x.id == this.EmployeeForm.value.Id);
      this.employees[index].name = this.EmployeeForm.value.Name;
      this.employees[index].phone = this.EmployeeForm.value.Phone;
      this.employees[index].birthdate = this.EmployeeForm.value.Birthdate;
      this.employees[index].startDate = this.EmployeeForm.value.Startdate;
      this.employees[index].departmentId = this.EmployeeForm.value.Department;
      (this.employees[index].departmentName = this.depatments.find(
        (x) => x.id == this.EmployeeForm.value.Department
      )?.name),
        (this.employees[index].managerId = this.EmployeeForm.value.Manager);
      (this.employees[index].managerName = this.EmployeeForm.value.Manager
        ? this.Managers.find((x) => x.id == this.EmployeeForm.value.Manager)?.name
        : null),
        (this.employees[index].positionId = this.EmployeeForm.value.Position);
      (this.employees[index].positionName = this.positions.find(
        (x) => x.id == this.EmployeeForm.value.Position
      )?.name),
        (this.employees[index].isActive = this.EmployeeForm.value.IsActive);
    }

    this.closeButton?.nativeElement.click();
    this.resetform();
  }

  resetform() {
    this.EmployeeForm.reset({
      IsActive: true,
    });
  }

  paginationconfig = { itemsPerPage: 3, currentPage: 1 };
  changePage(pageNumber: number) {
    this.paginationconfig.currentPage = pageNumber;
  }

  constructor(private _Datepipe: DatePipe) {}
  editemp(id: number) {
    let employee = this.employees.find((x) => x.id == id);
    if (employee != null) {
      this.EmployeeForm.patchValue({
        Id: employee?.id,
        Name: employee?.name,
        Phone: employee?.phone,
        Birthdate: this._Datepipe.transform(employee?.birthdate, 'yyyy-MM-dd'),
        Startdate: this._Datepipe.transform(employee?.startDate, 'yyyy-MM-dd'),
        Department: employee?.departmentId,
        Manager: employee?.managerId,
        Position: employee?.positionId,
        IsActive: employee?.isActive,
      });
    }
  }
  removeEmp(id: number) {
    this.employees = this.employees.filter((x) => x.id != id);
  }
}
export interface Employee {
  id: number;
  name: string;
  positionId?: number;
  positionName?: string;
  birthdate?: Date;
  isActive: boolean;
  startDate: Date;
  phone?: string;
  managerId?: number | null; // Accept Multiple Data Types
  managerName?: string | null; // Accept Multiple Data Types
  departmentId?: number;
  departmentName?: string;
}
