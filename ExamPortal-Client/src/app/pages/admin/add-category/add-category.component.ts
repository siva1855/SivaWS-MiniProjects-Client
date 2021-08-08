import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    categoryTitle: '',
    categoryDescription: ''
  }

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  addCategoryFormSubmit() {
    //start- validations
    if (this.category.categoryTitle.trim() == '' || this.category.categoryTitle == null) {
      this._snack.open('Category Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.category.categoryDescription.trim() == '' || this.category.categoryDescription == null) {
      this._snack.open('Category Description Required !!', '', {
        duration: 3000,
      });
      return;
    }
    //end- validations


    //sent data to server
    this._category.addCategory(this.category).subscribe((data:any) => {
      this.category.categoryTitle='';
      this.category.categoryDescription='';
      Swal.fire('Success !!', 'Category Added Successfully', 'success');
    },
    (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error Data Not Saved', 'error');
      }
    );



  }

}
