import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRank } from '../models/IRank';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  rank: IRank;
  id: number;
  drink: string;
  cafe: string;
  location: string;
  rating: string;
  ratingRemainder: string;
  comment: string;
  saveUnsuccessful: boolean;
  httpClient: any;

  constructor(public createHttpClient: HttpClient, public router: Router) {
  
 }

  onFormSubmit(ngForm: NgForm) {

    this.saveUnsuccessful = false;

    if (!ngForm.valid) {
      this.saveUnsuccessful = true;
      return;
    }
    console.log(ngForm);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    const data = {
      id: this.id,
      drink: this.drink,
      cafe: this.cafe,
      location: this.location,
      rating: this.rating,
      ratingRemainder: this.ratingRemainder,
      // rating: this.rating = "★★★★",
      // ratingRemainder: this.ratingRemainder = "★",
      comment: this.comment
    };

    this.createHttpClient.post<any>("http://localhost:8080/ranks", data, options)
      .subscribe({
        next: () => {
          console.log("Call successful");
        },
        error: (err) => {
          console.error("Error occured: " + JSON.stringify(err));
          alert("A rank with this id already exists.")
        }
      });
      
    ngForm.resetForm();
    this.router.navigate(['home']);
  }

}
