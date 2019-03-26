import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.page.html',
  styleUrls: ['./forget-pwd.page.scss'],
})
export class ForgetPwdPage implements OnInit {
  id: String = '';
  pwd: String = '';
  constructor() { }

  ngOnInit() {
    this.id = '';
    this.pwd = '';
  }

  changePwd() {
    console.log('Pwd length:' + this.pwd.length);
  }

}
