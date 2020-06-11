import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.model';
import { Subscription } from 'rxjs';
import { ExcelService } from '../excel.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private employeeSubscription: Subscription;
  isLoading = false;
  dataSource;
  dataSourceExcel;

  displayedColumns: string[] = [
    'fname',
    'lname',
    'dob',
    'salary',
    'deduction',
    'action'
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSourceExcel = [...this.employees];
      });
  }

  onDelete(employeeId: string) {
    this.employeesService.deleteEmployee(employeeId);
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }

  exportAsXLSX(): void {
    this.dataSourceExcel.forEach(function(value) {
      delete value['address'];
      delete value['stax'];
    });
    this.excelService.exportAsExcelFile(this.dataSourceExcel, 'employee');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
