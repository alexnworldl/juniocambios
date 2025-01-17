import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-edit-new-variedad',
  templateUrl: './edit-new-variedad.component.html',
  styleUrls: ['./edit-new-variedad.component.scss']
})
export class EditNewVariedadComponent implements OnInit {
  @Input() variedad:any;
  @Output() VariedadE: EventEmitter<any> = new EventEmitter();
  isLoading$:any;
  variedad_multiple:any=null;
  constructor(

    public modal: NgbActiveModal,
    public _serviceProduct : ProductService,

  ) { }

  ngOnInit(): void {
    this.variedad_multiple = this.variedad.valor;

  }
  update(){

    let data = {
      _id : this.variedad._id,
      valor: this.variedad_multiple,


    }

    this._serviceProduct.updateVariedad(data).subscribe((resp:any)=>{
      console.log(resp);
      this.VariedadE.emit(resp.variedad);
      this.modal.close();
    })

  }
}
