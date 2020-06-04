import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
})
export class SubheaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /* zoomArr = [0.5, 0.75, 0.9, 1];

     element = document.querySelector<HTMLInputElement>('.listDrop');

    value = this.element.getBoundingClientRect().width / this.element.offsetWidth;


     indexofArr = 4;

    handleChange = () => {

      let  val: string|number = document.querySelector<HTMLInputElement>('#sel').value;
      val = Number(val);
      console.log('handle change selected value ', val);
      this.indexofArr = this.zoomArr.indexOf(val);
      console.log('Handle changes', this.indexofArr);
      this.element.style['transform'] = `scale(${val})`;
    }



    zmin = document.querySelector<HTMLInputElement>('.zoomin').addEventListener('click', () => {
      console.log('value of index zoomin is', this.indexofArr);
      if (this.indexofArr < this.zoomArr.length - 1 ) {
        this.indexofArr += 1;
        this.value = this.zoomArr[this.indexofArr];
        let res1: string|number = document.querySelector<HTMLInputElement>('#sel').value ;
        res1 = this.value;
        // console.log('current value is',value)
        // console.log('scale value is',value)
        this.element.style['transform'] = `scale(${this.value})`;
      }
    });

      zout = document.querySelector('.zoomout').addEventListener('click', ( ) => {
      console.log('value of index  zoom out is', this.indexofArr);
        if (this.indexofArr > 0) {
          this.indexofArr -= 1;
          this.value = this.zoomArr[this.indexofArr];
          let res2: string|number = document.querySelector<HTMLInputElement>('#sel').value ;
          res2 = this.value;
        // console.log('scale value is',value)
        this.element.style['transform'] = `scale(${this.value})`;
        }
      }); */
}
