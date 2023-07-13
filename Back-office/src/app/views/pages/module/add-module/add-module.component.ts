import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessDTO } from 'src/app/models/DTO/AccessDTO';
import { ModuleDTO } from 'src/app/models/DTO/ModuleDTO';
import { Product } from 'src/app/models/entity/product';
import { AccessService } from 'src/app/services/access.service';
import { ModuleService } from 'src/app/services/module.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  moduleServices: ModuleDTO[] = [];
  productServices: Product[] = [];
  accessServices: AccessDTO[] = [];
  productSelected: any;
  accesSelected: any;
  selectedAccessId: number = 0;
  filteredModules: ModuleDTO[] = [];
  selectedProductId: number[] = [];
  selectedProductIds: number[] = [];
  constructor(public moduleService: ModuleService, private _snackBar: MatSnackBar,private snackBar: MatSnackBar,
    private accessService: AccessService,private productService: ProductService, public dialogRef: MatDialogRef<AddModuleComponent>) { }

  ngOnInit(): void {
    this.getAllmodules();
    this.getACtiveProducts();
    this.getAllAccess();
  }


  //get the selected value of products 
  onProductSelectionChange(event: any) {
    const selectedProductId = +event.target.value;
    if (event.target.checked) {
      this.selectedProductId.push(selectedProductId);
      
    } else {
      const index = this.selectedProductId.indexOf(selectedProductId);
      if (index !== -1) {
        this.selectedProductId.splice(index, 1);
      }
    }
    this.moduleService.form.patchValue({
      productId: this.selectedProductId[0]     
    });

    //alert('option : '+this.moduleService.form.value.productId)
  
  
  }

  //==================================================
  onChangeaccess(event: any) {
    //debugger
    this.accesSelected = event.target.value;
    this.moduleService.getModulesByAccessId(this.accesSelected).subscribe((res:any)=> {
      this.filteredModules =res;
    })
  }
  //===================================================

  //get active products 
  getACtiveProducts() {
      this.productService.getAllProducts().subscribe(res => {
        console.log(res);
      
        this.productServices = res.filter(product => product.productStatus === true);
      });
    }
  

  //get all module 
  getAllmodules() {
    this.moduleService.getAllModule().subscribe((res:any)=> {
      console.log(res)
      this.moduleServices = res;
    })
  }
  //all access
   getAllAccess() {
    this.accessService.getallAccess().subscribe(res => {
      console.log(res)
      this.accessServices = res;
    })
  } 

  // submit data with context EDITE : CREATE
  onSubmit() {
   
const id=this.moduleService.form.value.productId;
//console.log('product id', id)
//console.log("this.moduleService.form.value", this.moduleService.form.value)
//debugger
    const moduleBody :ModuleDTO= new ModuleDTO();
    debugger;
    moduleBody.moduleName= this.moduleService.form.value.moduleName;
    moduleBody.modulePackage= this.moduleService.form.value.modulePackage;
      moduleBody.productId= this.moduleService.form.value.productId;
      //moduleBody.accessId= this.moduleService.form.value.accessId;
      moduleBody.description= this.moduleService.form.value.description;
      moduleBody.moduleStatus= this.moduleService.form.value.moduleStatus;
      /* if (
        !this.moduleService.form.value.description ||
        !this.moduleService.form.value.moduleName ||
        !this.moduleService.form.value.productId ||
        !this.moduleService.form.value.moduleStatus ||
        !this.moduleService.form.value.modulePackage
      ) {
        const message = 'Please fill in all the required fields.';
        const action = 'Close';
        const panelClass = ['alert-danger', 'custom-alert']; // CSS classes for red color and custom position
  
        this.snackBar.open(message, action, {
          panelClass: panelClass,
          duration: 5000, // Duration in milliseconds (adjust as needed)
        });      return; */
      //}
  
      console.log(moduleBody);
    if(id==undefined){
      return;
    }
    this.moduleService.createModule(moduleBody).subscribe((res) => { 

      window.location.href = '/admin/modules'
      this.onClose();
    },
      (err) => {
        
        //get error from backend  
        if (err.error.message){
          console.log(err.error.message,"******************");
          this._snackBar.open(err.error.message, '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
          return;
        }
    })

  }

  // reset the form 
  onClear() {
    this.moduleService.form.reset();
  }

  // dialogue close 
  onClose() {
    this.dialogRef.close();
  }
}
