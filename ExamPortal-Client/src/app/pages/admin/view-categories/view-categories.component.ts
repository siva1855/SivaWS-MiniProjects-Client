import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [];

  constructor(private _catrgory: CategoryService) { }

  ngOnInit(): void {
    this._catrgory.categories().subscribe((data: any) => {
      //success
      this.categories = data;
      console.log(this.categories);
    },
    (error)=>{
      //fail
      console.log(error);
      Swal.fire('Error !!','Error in loading Data','error');
    })
  }

}
