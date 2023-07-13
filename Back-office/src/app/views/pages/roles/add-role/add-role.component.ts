import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'jquery';
import { forEach } from 'lodash';
import { ModuleDTO } from 'src/app/models/DTO/ModuleDTO';
import { Product } from 'src/app/models/entity/product';
import { AccessService } from 'src/app/services/access.service';
import { ModuleService } from 'src/app/services/module.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  moduleServices: ModuleDTO[] = [];
  productServices: Product[] = [];
  selectProduct: any;
  errorMessage = '';
  selectModuleId: number[] = [];
  productName!:string
  constructor(public accessService: AccessService,private _snackBar: MatSnackBar,private snackBar: MatSnackBar, private producService: ProductService, private moduleService: ModuleService, public dialogRef: MatDialogRef<AddRoleComponent>) { }
  selectedModule: any;

  ngOnInit(): void {
    this.getActivemodules();
    this.getACtiveproducts();
  }

  

  //get active products
  getACtiveproducts() {
    this.producService.getAllProducts().subscribe(res => {
      console.log(res)
      this.productServices = res.filter(product => product.productStatus === true);
    })
  }

  //get active modules
  getActivemodules() {
    this.moduleService.getAllModule().subscribe(res => {
      console.log(res)
      this.moduleServices = res.filter(product => product.moduleStatus === true);
    })
  }

  getModulesByProductId(id: number) {
    this.moduleService.getAllModulesByProductId(id).subscribe(res => {
     this.moduleServices = res;
    });
  }

  //get the selected value of products 
  onModuleSelectionChange(event: any) {
    const selectModuleId = +event.target.value;
    if (event.target.checked) {
      this.selectModuleId.push(selectModuleId);
    } else {
      const index = this.selectModuleId.indexOf(selectModuleId);
      if (index !== -1) {
        this.selectModuleId.splice(index, 1);
      }
    }
    this.accessService.form.patchValue({
      moduleId: this.selectModuleId
    });
  }


  //onchange Product
  onChangeproduct(event: any) {
    this.productName="";
    this.selectProduct = event.target.value
    this.getModulesByProductId(this.selectProduct);
    this.productServices.forEach(item =>{
      console.log(item)
      if(item.productId===Number(this.selectProduct)){
        this.productName=item.productName 
        
      }
      
    })
    console.log("the selected value ", this.selectProduct)
  }


  // submit data with context CREATE
  onSubmit() {
    debugger
    let nameModule:string=this.selectModuleId.join(",");
     


    let accessBody = {
      accessName: this.accessService.form.value.accessName, 
      moduleName: nameModule,//this.accessService.form.value.moduleName,
      productId: this.accessService.form.value.productId,
      productName:  this.productName,
      createdDate: new Date(),
      lastModificatedDate: new Date(),
    };
    // if (S
    //   !this.accessService.form.value.accessName ||
    //   !this.accessService.form.value.moduleName ||
    //   !this.accessService.form.value.productId
    // )
    // {
    //   const message = 'Please fill in all the required fields.';
    //   const action = 'Close';
    //   const panelClass = ['alert-danger', 'custom-alert']; // CSS classes for red color and custom position

    //   this.snackBar.open(message, action, {
    //     panelClass: panelClass,
    //     duration: 5000, // Duration in milliseconds (adjust as needed)
    //   });      return;
    // }
    console.log("last Bug",accessBody)
    // this.accessService.createAccess(accessBody).subscribe((res) => {

          
    //      //window.location.href = '/admin/role';
    //     }, err=>{
    //       if (err.error.message){
    //         this._snackBar.open(err.error.message, '', {
    //           duration: 4000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'bottom',
    //           panelClass: ['mat-toolbar', 'mat-warn'],
    //         });
    //         return;
    //       }
    //   })
    this.accessService.createAccess(accessBody).subscribe((resp:any)=>{
      window.location.href = '/admin/role';
    },(err:any)=>{
        if (err.error.message){
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

  onClear() {
    this.accessService.initializeFormGroup();
  }
  // dialogue close 
  onClose() {
    this.dialogRef.close();
  }
}
