import { Data } from "./../../../../shared/services/auth.service";
import { SubCategory } from "./../models/sub-category.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Category } from "../models/category.model";
import { ToastrService } from "ngx-toastr";
import { CategoryServiceService } from "shared/services/category-service.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-sub-category",
  templateUrl: "./sub-category.component.html",
  styleUrls: ["./sub-category.component.css"]
})
export class SubCategoryComponent implements OnInit {
  @ViewChild("subCategoryForm", { static: false })
  subCategoryForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: SubCategory[] = [];
  subCategData: SubCategory[] = [];
  categData: Category[] = [];
  selected: number = null;
  categoryName: string = null;

  //msgssssss
  error: string = null;
  succces: string = null;
  popoverTitle = "Are You Sure ?";
  popoverMessage = "Are you really <b>sure</b> you want to delete this?";

  // tostaer msg
  showToasterSuccess(msg) {
    this.toastr.success(msg);
  }
  showToasterErorr(msg) {
    this.toastr.error(msg);
  }

  onButtonClicked(evt) {
    let name: string = evt.target.innerText;
    this.categoryName = name;
  }
  constructor(
    private categServ: CategoryServiceService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {}

  ngOnInit() {
    this.postCategories();
    this.postSubCategories();
  }

  onCreatSubCategory(subCategory: NgForm) {
    const val = subCategory.value;

    if (this.editMode) {
      this.categServ
        .updateSubCategory(
          val.CategoryCode,
          val.SubCategoryName,
          this.subCategoryCode
        )
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: SubCategory = {
              SubCategoryName: val.SubCategoryName,
              CategoryCode: val.CategoryCode,
              SubCategoryCode: +res.Data,
              categoryName: this.categoryName
            };

            this.subCategData.unshift(data);
            this.subCategData = this.subCategData.slice();
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetSubCatogryFrom();
    } else {
      this.categServ
        .creatStoreSubCategory(val.SubCategoryName, val.CategoryCode)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: SubCategory = {
              SubCategoryName: val.SubCategoryName,
              CategoryCode: val.CategoryCode,
              SubCategoryCode: +res.Data,
              categoryName: this.categoryName
            };
            this.subCategData.unshift(data);
            this.subCategData = this.subCategData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetSubCatogryFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //getting subcategory  and category
  postSubCategories() {
    this.isLoading = true;
    this.categServ.getSubCategories().subscribe((subCategories: any) => {
      this.subCategData = subCategories.Data;
      console.log(subCategories.Data);

      this.isLoading = false;
    });
  }

  postCategories() {
    this.isLoading = true;
    this.categServ.getCategories().subscribe((categories: any) => {
      this.categData = categories.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetSubCatogryFrom() {
    this.subCategoryForm.reset();
    this.subCategoryCode = 0;
    this.editMode = false;
  }

  //delet Subcategory
  onDeletSubCategory(subCategory: SubCategory, i) {
    this.categServ.deletSubCategory(subCategory.SubCategoryCode).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.subCategData.splice(i, 1);
          this.subCategData = this.subCategData.slice();
          this.onResetSubCatogryFrom();
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

  // getting subcategory code
  subCategoryCode = 0;
  //edit
  onUpdateSubCategory(subCategory: SubCategory, i) {
    this.editMode = true;
    this.subCategoryForm.setValue({
      SubCategoryName: subCategory.SubCategoryName,
      SubCategoryCode: subCategory.SubCategoryCode,
      CategoryCode: subCategory.CategoryCode
    });
    this.subCategoryCode = subCategory.SubCategoryCode;
    this.subCategData.splice(i, 1);
  }
}
