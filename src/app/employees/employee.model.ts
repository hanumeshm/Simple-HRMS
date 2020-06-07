export interface Employee {
  id: string;
  fname: string;
  lname: String;
  dob: Date;
  address: {
    street: String;
    apt: String;
    city: String;
    state: String;
    country: String;
  };
  salary: number;
  deduction: number;
  stax: string;
}
