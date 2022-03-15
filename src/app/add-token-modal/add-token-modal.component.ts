import { Component, OnInit } from '@angular/core';

import {  Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-token-modal',
  templateUrl: './add-token-modal.component.html',
  styleUrls: ['./add-token-modal.component.scss']
})
export class AddTokenModalComponent implements OnInit {

  @Input() name: any;

  //@ts-ignore
  form: FormGroup ;
  loading = false;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastService:ToastService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ticker: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    
    const ticker = this.f.ticker.value;
    this.toastService.show('Successful', `Ticker ${ticker} added successfully`);
    this.activeModal.close(ticker) ;
        
  }

}

