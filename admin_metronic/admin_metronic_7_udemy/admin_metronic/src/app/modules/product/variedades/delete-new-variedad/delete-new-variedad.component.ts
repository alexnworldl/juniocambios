import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriasService } from 'src/app/modules/categorias/_services/categorias.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-delete-new-variedad',
  templateUrl: './delete-new-variedad.component.html',
  styleUrls: ['./delete-new-variedad.component.scss']
})
export class DeleteNewVariedadComponent implements OnInit {

  @Output() VariedadD: EventEmitter<any> = new EventEmitter();
  @Input() variedad :any;
  
    constructor(
      public modal: NgbActiveModal,
      public productoService:ProductService,
      public toaster: Toaster,
    ) { }
  
    ngOnInit(): void {
    }
  
    delete(){
    this.productoService.deleteVariedad(this.variedad._id).subscribe((resp:any)=>{
      console.log(resp);
      this.VariedadD.emit("");//envia la respuesta 
     
        this.modal.close();
    },(error)=>{
      if(error.error){
        this.toaster.open(NoticyAlertComponent,{text:`danger- '${error.error.message}'`});
      }
    })
      }

}
