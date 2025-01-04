import { Injectable } from '@angular/core';
import { Course, sampleCourses } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = sampleCourses;

  

  constructor() { }

  

  // Offline

  addNewCourse(name: string, price: number) {
    let newCourse: Course = {
      id: 0,
      name: name,
      price: price,
    }

    newCourse.id = this.courses.length + 1;
    this.courses.push(newCourse);
  }

  getAllCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }

  updateCourse(id: number, name: string, price: number) {
    const course = this.courses.find(course => course.id === id);
    if (!course) {
      return;
    }
    course.name = name;
    course.price = price;
  }

  deleteAllCourses() {
    this.courses.length = 0;
  }

  deleteCourseById(id: number) {
    const index = this.courses.findIndex(course => course.id === id);
    this.courses.splice(index, 1);
  }


}
