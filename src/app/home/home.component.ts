import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bestsellerProducts = [
    {
      image: 'assets/images/01.jpg',
      desc: 'Men Watch',
      title: 'Rolex',
      price: '5000 L.E'
    },
    {
      image: 'assets/images/02.jpg',
      desc: 'Men Watch',
      title: 'Rolex',
      price: '5000 L.E'
    },
    {
      image: 'assets/images/03.jpg',
      desc: 'Men Watch',
      title: 'Rolex',
      price: '5000 L.E'
    },
    {
      image: 'assets/images/04.jpg',
      desc: 'Men Watch',
      title: 'Rolex',
      price: '5000 L.E'
    },
    {
      image: 'assets/images/05.jpg',
      desc: 'Men Watch',
      title: 'Rolex',
      price: '5000 L.E'
    },
    {
      image: 'assets/images/06.jpg',
      desc: 'Men Watch',
      title: 'Rolex',
      price: '5000 L.E'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
