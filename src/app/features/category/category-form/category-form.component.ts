import { HandleErorrService } from "./../../../../shared/services/handleErorr.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Category } from "../models/category.model";
import { ToastrService } from "ngx-toastr";
import { CategoryServiceService } from "shared/services/category-service.service";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.css"]
})
export class CategoryFormComponent implements OnInit {
  @ViewChild("categoryForm", { static: false })
  categForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: Category[] = [];
  categData: Category[] = [];

  //msgssssss
  error: string = null;
  succces: string = null;
  popoverTitle = "Are You Sure ?";
  popoverMessage = "Are you really <b>sure</b> you want to delete this?";

  //toaster msg
  showToasterSuccess(msg) {
    this.toastr.success(msg);
  }
  showToasterErorr(msg) {
    this.toastr.error(msg);
  }

  constructor(
    private categServ: CategoryServiceService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Category Name" },
      { name: "Category Code" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postCategories();
  }

  //creat category
  onCreatCategory(category: NgForm) {
    const val = category.value;

    if (this.editMode) {
      this.categServ
        .updateCategory(val.CategoryCode, val.CategoryName, this.oldCat)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Category = {
              CategoryName: val.CategoryName,
              CategoryCode: val.CategoryCode,
              oldCategoryCode: val.oldCategoryCode
            };

            this.categData.unshift(data);
            this.categData = this.categData.slice();
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetCatogryFrom();
    } else {
      this.categServ
        .creatStoreCateg(val.CategoryCode, val.CategoryName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Category = {
              CategoryName: val.CategoryName,
              CategoryCode: val.CategoryCode
            };
            this.categData.unshift(data);
            this.categData = this.categData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetCatogryFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //getting category in tabel
  postCategories() {
    this.isLoading = true;
    this.categServ.getCategories().subscribe((categories: any) => {
      this.categData = categories.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetCatogryFrom() {
    this.categForm.reset();
    this.editMode = false;
    this.oldCat = 0;
  }

  //delet category
  onDeletCategory(category: Category, i) {
    this.categServ.deletCategory(category.CategoryCode).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.categData.splice(i, 1);
          this.categData = this.categData.slice();
          this.onResetCatogryFrom();
          this.succces = "Successfully Deleted";
          this.showToasterSuccess(this.succces);
        } else {
          this.handelErorr.handleErorr(res);
        }
      },
      err => {
        let errmsg = "Not Authorized to Delet this ";
        this.showToasterErorr(errmsg);
      }
    );
  }

  //getting old categ code
  oldCat = 0;

  onUpdateCategory(category: Category, i) {
    this.editMode = true;
    this.categForm.setValue({
      CategoryName: category.CategoryName,
      CategoryCode: category.CategoryCode
    });
    this.oldCat = category.CategoryCode;
    this.categData.splice(i, 1);
  }
}
