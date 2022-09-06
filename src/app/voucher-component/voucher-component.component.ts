import { Component, OnInit } from '@angular/core';
declare var jsPDF: any;
import html2canvas from 'html2canvas';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';



@Component({
  selector: 'app-voucher-component',
  templateUrl: './voucher-component.component.html',
  styleUrls: ['./voucher-component.component.css']
})
export class VoucherComponentComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }

  downloadPDF() {
    const DATA: any = document.querySelector("#htmlData");
    const doc = new jsPDF('p','mm','a4');
    const options = {
      background: 'white',
      scale: 4
    };
    
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL("image/png");
      const pdfwidth = canvas.width/20;
      const pdfheight = (canvas.height * pdfwidth) / canvas.width;

      console.log(canvas.height)
      console.log(canvas.width)
      console.log(pdfwidth)

      doc.addImage(img, 'png', 0, 0, pdfwidth, pdfheight, undefined, 'FAST');
      
      return doc;
    
   }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
  });
  }
}


