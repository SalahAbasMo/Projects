import { TokenService } from "./token.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Category } from "app/features/category/models/category.model";
import { SubCategory } from "app/features/category/models/sub-category.model";

@Injectable({
  providedIn: "root"
})
export class CategoryServiceService {
  constructor(private http: HttpClient, private token: TokenService) {}

  url = "http://10.0.0.35:9999/api/";

  //Category
  creatStoreCateg(CategoryCode: number, CategoryName: string) {
    const categData: Category = {
      CategoryCode: CategoryCode,
      CategoryName: CategoryName
    };
    return this.http.post(
      this.url + "Category/add",
      categData,
      this.token.getHeaders
    );
  }

  getCategories() {
    return this.http.get(this.url + "Category/list", this.token.getHeaders);
  }
  updateCategory(
    CategoryCode: number,
    CategoryName: string,
    oldCategoryCode: number
  ) {
    const categoryData: Category = {
      CategoryCode: CategoryCode,
      CategoryName: CategoryName,
      oldCategoryCode: oldCategoryCode
    };
    return this.http.post(
      this.url + "Category/edit",
      categoryData,
      this.token.getHeaders
    );
  }

  deletCategory(categoryCode) {
    return this.http.post(
      this.url + "Category/Delete?CategoryCode=" + categoryCode,
      "",
      this.token.getHeaders
    );
  }

  //SubCategory
  creatStoreSubCategory(SubCategoryName: string, Categorycode: number) {
    const subCategoryData: SubCategory = {
      SubCategoryName: SubCategoryName,
      CategoryCode: Categorycode
    };
    return this.http.post(
      this.url + "SubCategory/add",
      subCategoryData,
      this.token.getHeaders
    );
  }
  getSubCategories() {
    return this.http.get(this.url + "SubCategory/list", this.token.getHeaders);
  }
  // getSubCategoryByAllCategory(CategoryCode) {
  // 	return this.http
  // 		.get(
  // 			'http://10.0.0.35:9999/api/SubCategory/ListByCategoryCode?categoryCode=' + CategoryCode,
  // 			this.token.getHeaders
  // 		)
  // 		.pipe(
  // 			map((respData) => {
  // 				const subCategArray: SubCategory[] = [];
  // 				for (const k in respData) {
  // 					subCategArray.push(respData[k]);
  // 				}
  // 				return subCategArray;
  // 			})
  // 		);
  // }

  deletSubCategory(SubCategoryCode) {
    return this.http.post(
      this.url + "SubCategory/delete?SubCategoryCode=" + SubCategoryCode,
      "",
      this.token.getHeaders
    );
  }

  updateSubCategory(
    CategoryCode: number,
    SubCategoryName: string,
    SubCategoryCode: number
  ) {
    const categoryData: SubCategory = {
      CategoryCode: CategoryCode,
      SubCategoryName: SubCategoryName,
      SubCategoryCode: SubCategoryCode
    };
    return this.http.post(
      this.url + "SubCategory/edit",
      categoryData,
      this.token.getHeaders
    );
  }
}
