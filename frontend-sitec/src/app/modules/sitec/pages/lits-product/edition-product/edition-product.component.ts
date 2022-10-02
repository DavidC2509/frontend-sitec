import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormPageBase } from 'src/app/shared/components/form-page/form-page.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-edition-product',
  templateUrl: './edition-product.component.html',
  styleUrls: ['./edition-product.component.css']
})
export class EditionProductComponent extends FormPageBase {

  id: number | null = null;
  ok:boolean=false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
      const element:any = event.target;              
      if (event.keyCode === 13 && element.localName!=='textarea' ) {
        this.store();
      }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProductService,
    private formBuilder: FormBuilder
  ) {

    super({
      title: 'Edición de Producto',
      module: 'sitec',
      breadcrumb: [
        {
          label: 'Producto',
          link: '/sitec/product',
        },
        
      ],
    });

    this.form = this.formBuilder.group({
      name: [ null, [ Validators.required, Validators.maxLength(50), ] ],
      descripciont: [null, []],
      price: [0, [ Validators.required]],
      status: [true,[ Validators.required]],
    });
  }

  onInit(): void {
    
    if (!this.isCreate) {
      this.id = Number(this.activatedRoute.snapshot.params['id']);
      this.service.getProduct(this.id).subscribe((response) => {
        this.form.get('name')?.setValue(response.name);
        this.form.get('descripciont')?.setValue(response.descripciont);
        this.form.get('price')?.setValue(response.price);
        this.form.get('status')?.setValue(response.status);

      });
    }
  }

  async store() {
    if (this.form.valid) {
      const data = this.form.value;
      data.id = this.id;
      this.service.storeProduct(data).subscribe(() => {
        this.alert.show();
        this.router.navigate(['/sitec/product']);
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  get formLabel(): string {
    return this.isCreate ? 'Registro' : 'Actualización';
  }

}