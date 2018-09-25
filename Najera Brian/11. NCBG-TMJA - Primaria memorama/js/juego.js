var cnt = 0;
var last;

window.addEventListener('load', main);

function main() {

  var list = document.querySelectorAll('div[cl^="card"]');

  for(var i=0;i<list.length;i++)
    list[i].addEventListener('click', function() {
      if(this.className == 'cardBlack') {
        this.className = this.getAttribute('cl');
        if(cnt == 1)
          if(last.className == this.className) {
            alert("OK");
          } else {
            setTimeout(function() {
              last.className = this.className = "cardBlack";
            }.bind(this), 500);
          }
        else
          last = this;
        cnt = 1 - cnt;
      }
    }, false);

}
