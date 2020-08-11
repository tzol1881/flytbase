import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flytbase';
  count = 0;
  keyboardControlStatus = 'true';

  ngOnInit() {
    window.addEventListener('keydown', this.getKeyAndMove);
    localStorage.setItem('selectedDiv', '');
    localStorage.setItem('keyboardControlStatus', 'true');
  }

  addDiv() {
    const div = document.createElement('div');
    div.textContent = String(this.count);
    div.style.zIndex = String(this.count * 10);
    div.style.height = '35px';
    div.style.width = '35px';
    div.style.position = 'relative';
    div.style.textAlign = 'center';
    div.style.backgroundColor = '#666';
    div.style.color = '#fff';
    div.style.float = 'left';
    div.style.margin = '5px';
    div.style.top = '0px';
    div.style.left = '0px';
    div.id = String(this.count);
    div.addEventListener('click', this.divClick);
    document.getElementById('parent').append(div);
    this.count++;
  }

  getKeyAndMove(e) {
    const keyCode = e.keyCode;
    const div = document.getElementById(String(localStorage.getItem('selectedDiv')));
    if (div && localStorage.getItem('keyboardControlStatus') === 'true'){
      switch (keyCode) {
        case 37: // left arrow key
          if (parseInt(div.style.left) >= 5) {
            div.style.left = parseInt(div.style.left) - 5 + 'px';
          }
          else {
            div.style.left = '0px';
          }
          break;
        case 38: // up arrow key
          if (parseInt(div.style.top) >= 5) {
            div.style.top = parseInt(div.style.top) - 5 + 'px';
          }
          else {
            div.style.top = '0px';
          }
          break;
        case 39: // right arrow key
          if (parseInt(div.style.left) >= 0 && 450 - parseInt(div.style.left) > 0) {
            div.style.left = parseInt(div.style.left) + 5 + 'px';
          }
          else {
            div.style.left = parseInt(div.style.left) + 'px';
          }
          break;
        case 40: // down arrow key
          if (parseInt(div.style.top) >= 0 && 450 - parseInt(div.style.top) > 10) {
            div.style.top = parseInt(div.style.top) + 5 + 'px';
          }
          else {
            div.style.top = '450px';
          }
          break;
        case 46: // delete key
          if (localStorage.getItem('selectedDiv') !== ''){
            div.remove();
            localStorage.setItem('selectedDiv', '');
          }
          break;
      }
    }
  }

  divClick(e) {
    if (localStorage.getItem('selectedDiv') && localStorage.getItem('selectedDiv') !== '') {
      document.getElementById(String(localStorage.getItem('selectedDiv'))).style.backgroundColor = '#666';
    }
    localStorage.setItem('selectedDiv', e.target.id);
    document.getElementById(e.target.id).style.backgroundColor = '#202020';
  }

  changeKeyboardControlStatus(){
    let status = localStorage.getItem('keyboardControlStatus');
    localStorage.setItem('keyboardControlStatus', status === 'true' ? 'false' : 'true');
    this.keyboardControlStatus = localStorage.getItem('keyboardControlStatus');
  }
}
