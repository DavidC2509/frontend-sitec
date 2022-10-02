import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sell-product-by-warehouse',
  templateUrl: './sell-product-by-warehouse.component.html',
  styleUrls: ['./sell-product-by-warehouse.component.css']
})
export class SellProductByWarehouseComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.formBuilder.group({
      countSell: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }

  close(): void {
    this.form.reset();
    this.activeModal.close();
  }

  store(): void {
    if (this.form.valid) {
      this.activeModal.close({ result: this.form.value });
    }
  }

}
