import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/category", title: "Category", icon: "dashboard", class: "" },
  {
    path: "/sub-category",
    title: "Sub/Category",
    icon: "content_paste",
    class: ""
  },
  { path: "/employee", title: "Employee", icon: "person", class: "" },
  {
    path: "/incorporation-act",
    title: "Incorporation-Act",
    icon: "bubble_chart",
    class: ""
  },
  { path: "/city", title: "City", icon: "location_on", class: "" },
  {
    path: "/commercial-register",
    title: "Commercial-Register",
    icon: "notifications",
    class: ""
  },
  { path: "/governate", title: "Governrate", icon: "home", class: "" },
  {
    path: "/shahr-aqary",
    title: "Shahr-Aqary",
    icon: "unarchive",
    class: ""
  },
  { path: "/region", title: "Region", icon: "book", class: "" }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
