import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  drinkTitle="Drink Name";
  cafeName="Cafe";
  location="Location";
  rating="★★";
  ratingRemainder="★★★"; //This is the difference between the rating and 5 stars
  comments="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque purus id magna molestie mollis. Aliquam orci neque, laoreet condimentum varius quis, blandit vitae nunc. Vivamus in ultrices nibh. Fusce sit amet luctus felis, sed egestas orci. Nam porta dui mi, non luctus tellus malesuada sit amet. Nullam sed varius mauris, vel pretium arcu. Vestibulum arcu nisl, faucibus in erat a, blandit gravida mauris. Fusce et erat vel lectus gravida tristique. Quisque consectetur posuere tellus, a faucibus tortor pretium in. Maecenas eleifend nunc et justo suscipit, ac egestas massa egestas.";

}
