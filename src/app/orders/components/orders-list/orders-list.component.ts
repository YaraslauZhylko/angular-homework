import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersData } from './../..';

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class OrdersListComponent implements OnInit {

  ordersData: OrdersData = new OrdersData();

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: { ordersData: OrdersData }) => {
      if (data.ordersData) this.ordersData = data.ordersData;
    });
  }

}
