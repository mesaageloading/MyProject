function changeBtn() {
    this.bodyDay = document.getElementById("body-day")
    this.bodyMoney = document.getElementById("body-money")
    this.btnDay = document.getElementById("btn-day")
    this.btnMoney = document.getElementById("btn-money")
}

changeBtn.prototype.init = function(){
    let that =this
    console.log(that.btnDay)
    this.btnDay.onmousedown = function () {
        that.btnMoney.style.backgroundColor = "transparent"
        that.bodyMoney.style.display = "none"
        that.bodyDay.style.display = "block"
        that.btnDay.style.backgroundColor = "white"
    };

    this.btnMoney.onmousedown = function (){
        that.btnDay.style.backgroundColor = "transparent"
        that.bodyDay.style.display = "none"
        that.bodyMoney.style.display = "block"
        that.btnMoney.style.backgroundColor = "white"

    }
}


let d1 = new changeBtn();
d1.init();
