import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

const BACKEND_URL = environment.apiUrl + '/employees/';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private employees: Employee[] = [];
  private employeeUpdated = new Subject<Employee[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getEmployees() {
    this.httpClient
      .get<{ message: string; data: any }>(BACKEND_URL)
      .pipe(
        map(employeeData => {
          return employeeData.data.map(employee => {
            return {
              id: employee._id,
              fname: employee.fname,
              lname: employee.lname,
              dob: employee.dob,
              address: {
                street: employee.address.street,
                apt: employee.address.apt,
                city: employee.address.city,
                state: employee.address.state,
                country: employee.address.country
              },
              salary: employee.salary,
              deduction: employee.deduction,
              stax: employee.stax
            };
          });
        })
      )
      .subscribe(
        transformedData => {
          this.employees = transformedData;
          this.employeeUpdated.next([...this.employees]);
        },
        //if response is error
        () => this.authService.logout()
      );
  }

  getEmployeeUpdateListner() {
    return this.employeeUpdated.asObservable();
  }

  getEmployee(id: string) {
    return this.httpClient.get<{ message: string; data: any }>(
      BACKEND_URL + id
    );
  }

  addEmployee(employee: Employee) {
    this.httpClient
      .post<{ message: string; id: string }>(BACKEND_URL, employee)
      .subscribe(responseData => {
        const id = responseData.id;
        employee.id = id;
        this.employees.push(employee);
        this.employeeUpdated.next([...this.employees]);
        this.router.navigate(['/list']);
      });
  }

  updateEmployee(id: string, employee: Employee) {
    this.httpClient
      .put<{ message: string }>(BACKEND_URL + id, employee)
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/list']);
      });
  }

  deleteEmployee(employeeId: string) {
    this.httpClient.delete(BACKEND_URL + employeeId).subscribe(responseData => {
      console.log(responseData);
      const updatedEmployeeList = this.employees.filter(
        employee => employee.id != employeeId
      );
      this.employees = updatedEmployeeList;
      this.employeeUpdated.next([...this.employees]);
    });
  }

  getFederalTaxPercentage(salary: number) {
    console.log(salary);
    switch (true) {
      case salary < 9700: {
        return 10;
      }
      case salary < 39475: {
        return 12;
      }
      case salary < 84200: {
        return 22;
      }
      case salary > 84200: {
        return 24;
      }
    }
  }

  getStateTaxPercentage(state: string) {
    switch (state) {
      case 'California': {
        return 13;
      }
      case 'New York': {
        return 12;
      }
      case 'Florida': {
        return 0;
      }
      default: {
        return 0;
      }
    }
  }
}
