import { Component, OnInit } from '@angular/core';
import { IRank } from '../models/IRank';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  ranks: IRank[] = [];

  constructor(public httpClient: HttpClient) {

  }

  ngOnInit() {
    this.getRanks();
  }

  getRanks() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    this.httpClient.get<IRank[]>("http://localhost:8080/ranks", options)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.ranks = data;
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  deleteCard(id: number) {
    this.httpClient.delete<IRank[]>("http://localhost:8080/ranks/" + id)
    .subscribe(
      (data) => {
        this.ngOnInit();
      });
  }

}
