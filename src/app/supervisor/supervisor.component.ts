import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown, faFileArchive, faHome, faList, faPenToSquare, faRightToBracket, faSackDollar, faSchool, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  constructor(private router: Router) { }
  
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

  ngOnInit(): void {
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
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'])
  }


}
