// customer-details.component.ts

import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  id: number;
  customer: Customer;
  constructor(
              private route: ActivatedRoute, 
              private customerService: CustomerService,
              private Router: Router, 
              private modalService : NgbModal
              ) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.route.params.subscribe(data => this.id = +(data.id));

    // FIXME - this needs to be invoked differently once the service returns an Observable as expected.
    this.customerService.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

  removeCustomer(){

  }

}
