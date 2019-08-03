function changeBtn (){
    let newPanel = document.getElementById("news-panel")
    let oBtn = newPanel.getElementsByTagName("button")
    let nowIndex = 0;
}
changeBtn.prototype.init = function(){
    let that = this
    for(let i in that.oBtn){
        this.oBtn[i].onmouseover = function(){
            that.oBtn[nowIndex].style.backgroundColor = "transparent";
            that.style.backgroundColor = "white"
            that.nowIndex = i;
        }
    }

}
changeBtn.prototype.mouse

let d1 = new changeBtn();
d1.init();