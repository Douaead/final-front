import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../customer/customer-services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: any = [];
  validateForm: FormGroup;
  isSpinning: boolean = false;
  noCategoriesFound: boolean = false;

  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
    });

    this.getAllCategories();

    this.validateForm.get('title').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.isSpinning = true;
      if (value) {
        this.service.getAllCategoriesByTitle(value).subscribe({
          next: (res) => {
            this.isSpinning = false;
            if (res.length === 0) {
              this.noCategoriesFound = true;
              this.categories = [];
            } else {
              this.noCategoriesFound = false;
              this.categories = res;
            }
          },
          error: () => {
            this.isSpinning = false;
            this.noCategoriesFound = true;
            this.categories = [];
           
          }
        });
      } else {
        this.noCategoriesFound = false;
        this.getAllCategories();
      }
    });
  }

  submitForm(): void {
    if (!this.validateForm.valid) {
      return;
    }
    const title = this.validateForm.controls['title'].value;
    this.isSpinning = true;
    this.service.getAllCategoriesByTitle(title).subscribe({
      next: (res) => {
        this.isSpinning = false;
        if (res.length === 0) {
          this.noCategoriesFound = true;
          this.categories = [];
        } else {
          this.noCategoriesFound = false;
          this.categories = res;
        }
      },
      error: () => {
        this.isSpinning = false;
        this.noCategoriesFound = true;
        this.categories = [];
       
      }
    });
  }

  getAllCategories(): void {
    this.service.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  approveAndPostCategory(categoryId: number): void {
    this.adminService.approveCategory(categoryId).pipe(
      tap(approvalResponse => {
        console.log('Catégorie approuvée avec succès:', approvalResponse);
      }),
      catchError(approvalError => {
        console.error('Erreur lors de l\'approbation de la catégorie:', approvalError);
        throw approvalError;
      })
    ).subscribe(approvalResponse => {
      this.adminService.sendCategory(approvalResponse.id).pipe(
        tap(postResponse => {
          console.log('Catégorie postée avec succès:', postResponse);
          this.snackBar.open("Success: Category approved and posted successfully", "Close", {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
        }),
        catchError(postError => {
          console.error('Erreur lors de la post de la catégorie:', postError);
          throw postError;
        })
      ).subscribe();
    });
  }}