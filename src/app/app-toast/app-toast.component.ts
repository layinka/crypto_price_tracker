import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.scss']
})
export class AppToastComponent implements OnInit {

  

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
  }


}
