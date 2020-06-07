import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.model';
import { Subscription } from 'rxjs';
import { ExcelService } from '../excel.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeViewComponent } from '../employee-view/employee-view.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterViewInit {
  employees: Employee[] = [];
  private employeeSubscription: Subscription;
  isLoading = false;
  dataSource;
  displayedColumns: string[] = [
    'fname',
    'lname',
    'dob',
    'salary',
    'deduction',
    'action'
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public employeesService: EmployeesService,
    public excelService: ExcelService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.employeesService.getEmployees();
    this.employeeSubscription = this.employeesService
      .getEmployeeUpdateListner()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
        this.isLoading = false;
        this.dataSource = this.employees;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onDelete(employeeId: string) {
    this.employeesService.deleteEmployee(employeeId);
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataSource, 'employee');
  }
}
