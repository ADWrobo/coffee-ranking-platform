import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { IRank } from '../models/IRank';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  rank: IRank;
  id: number;
  drink: string;
  cafe: string;
  location: string;
  rating: string;
  ratingRemainder: string;
  comment: string;
  saveUnsuccessful: boolean;
  rateEntered: string;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getRankById(this.id);
    });
  }

  getRankById(id: number) {
    this.httpClient.get<IRank>(`http://localhost:8080/ranks/${id}`)
      .subscribe({
        next: (data) => {
          this.rank = data;
          this.id = this.rank.id;
          this.drink = this.rank.drink;
          this.cafe = this.rank.cafe;
          this.location = this.rank.location;
          this.rating = this.rank.rating;
          this.ratingRemainder = this.rank.ratingRemainder;
          this.comment = this.rank.comment;
          this.rateEntered = this.rating.length.toString();
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;

    if (!ngForm.valid) {
      this.saveUnsuccessful = true;
      return;
    }

    this.convertRate(this.rateEntered);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    const data = {
      id: this.id,
      drink: this.drink,
      cafe: this.cafe,
      location: this.location,
      rating: this.rating,
      ratingRemainder: this.ratingRemainder,
      comment: this.comment
    };

    this.httpClient.put<any>(`http://localhost:8080/ranks/${this.id}`, data, options)
      .subscribe({
        next: () => {
          console.log("Update successful");
        },
        error: (err) => {
          console.error("Error occurred: " + JSON.stringify(err));
        }
      });

    ngForm.resetForm();
    this.router.navigate(['home']);
  }

  convertRate(rateEntered: string) {
    switch (rateEntered) {
      case "1":
        this.rating = "★";
        this.ratingRemainder = "★★★★";
        break;
      case "2":
        this.rating = "★★";
        this.ratingRemainder = "★★★";
        break;
      case "3":
        this.rating = "★★★";
        this.ratingRemainder = "★★";
        break;
      case "4":
        this.rating = "★★★★";
        this.ratingRemainder = "★";
        break;
      case "5":
        this.rating = "★★★★★";
        this.ratingRemainder = "";
        break;
      default:
        console.log("Invalid rating.");
    }
  }
}
