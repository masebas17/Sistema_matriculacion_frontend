import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown, faFileArchive, faHome, faList, faPenToSquare, faRightToBracket, faSackDollar, faSchool, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  faChevronDown = faChevronDown;
  faHome =faHome;
  faRightToBracket =faRightToBracket;
  faUser = faUser;
  faUserPen = faUserPen;
  faFileArchive = faFileArchive;
  faPenToSquare = faPenToSquare;
  faList = faList;
  faSackDollar = faSackDollar;
  faSchool = faSchool;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openNav() {
    const sidebar: any = document.getElementById('mySidebar');
    sidebar.style.width = "250px";
    const main: any = document.getElementById('main');
    main.style.marginLeft = "250px";
  }
  
  closeNav() {
    
    const sidebar: any = document.getElementById('mySidebar');
    sidebar.style.width = "0";
    const main: any = document.getElementById('main');
    main.style.marginLeft = "0";
  }

  myFunction() {
    const x: any = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/teacher-login'])
  }

}
