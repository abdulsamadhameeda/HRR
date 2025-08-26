import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { RandomColor } from './directives/random-color';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ReversePipe} from './pips/reverse-pipe'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, NgIf, NgFor, NgStyle, RandomColor,ReversePipe, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // students = [
  //   { name: 'stu_1', mark: 50 },
  //   { name: 'stu_2', mark: 67 },
  //   { name: 'stu_3', mark: 40 },
  //   { name: 'stu_4', mark: 90 },
  //   { name: 'stu_5', mark: 30 }
  // ]

  // images = [
  //   "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=2210&quality=70",
  //   "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
  //   "https://images.pexels.com/photos/26151151/pexels-photo-26151151/free-photo-of-night-sky-filled-with-stars-reflecting-in-the-lake.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  // ];

  // currentindex = 0;


  // next() {
  //   if (this.currentindex < this.images.length - 1) {
  //     this.currentindex++;

  //   }



  // }

  // Previous() {

  //   if (this.currentindex > 0) {
  //     this.currentindex--;
  //   }



  // }

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
    course: new FormControl(1, Validators.required)



  })
  price = 22100.5;
  date = new Date();
reversName='ahmad'

  courses = [
    { id: 1, name: 'asp.net' },
    { id: 2, name: 'python' },
    { id: 3, name: 'angular' },
    { id: 4, name: 'java' },
  ]


  rest() {

    this.form.reset({

      course: 1
    });


  }
  submit() {

    alert(`welcome ${this.form.value.name}!
  i will contact U about ${this.courses.find(x => x.id == this.form.value.course)?.name} course`)

  }



}
