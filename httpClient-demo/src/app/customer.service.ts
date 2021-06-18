import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  getCustomer(id: number) : Observable<Customer> {
    // TODO - Send a request to the API to get the correct Customer data using the httpClient. This method should return an Observable!
    return this.httpClient.get<Customer>(`http://127.0.0.1:3000/customers/${id}`)
    .pipe(
      tap(_ => {
        console.log(`fetched customers with id ${id}`);        
      }),
      catchError(this.handleError('get Customer', new Customer() ))
    )
   ;
  }

  getCustomers(id:number): Observable<Customer[]> {
    return this.httpClient
      .get<Customer[]>('http://127.0.0.1:3000/customers').pipe(
        tap(_ => {
          console.log('fetched customers');        
        }),
        catchError(this.handleError('get Customer', [] ))
      );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    console.log(customer);

    return this.httpClient
      .post<Customer>('http://127.0.0.1:3000/customers', customer, {}).pipe(
        tap(_ => console.log('added customer')),
        catchError(this.handleError('add Customer', new Customer()))
      );
  }

  //update Customer 
  updateCustomer(id: number, customer:Customer) : Observable<Customer>{
     const editedCustomer = {id, ...customer};
    return this.httpClient
      .put<Customer>(`http://127.0.0.1:3000/customers/${id}`, editedCustomer, {}).pipe(
        tap(_ => console.log('updated customer')),
        catchError(this.handleError('Update Customer', new Customer()))
      );
  }

  //delete Customer 
  deleteCustomer(id: number) {
    return this.httpClient
      .delete<Customer>(`http://127.0.0.1:3000/customers/${id}`, {}).pipe(
        tap(_ => console.log(`deleted customer with id ${id}`)),
        catchError(this.handleError('Delete Customer', new Customer()))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
