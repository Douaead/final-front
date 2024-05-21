import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../customer-services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      email: [null, Validators.required],

    });
  }

  postCategory() {
    this.service.postCategory(this.categoryForm.value).subscribe({
      next: (res) => {
        if (res.id != null) {
          this.snackBar.open("Success: Category added successfully", "Close", {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
        } else {
          this.snackBar.open("Error: Something went wrong", "Close", {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error: (error) => {
        this.snackBar.open("Error: Something went wrong", "Close", {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      },
      complete: () => {
        console.log("Observable completed");
      }
    });
  }
}
