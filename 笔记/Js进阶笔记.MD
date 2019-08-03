1、引用类型的特点：对象引用的时候，会相互影响，举例：
var arr1 = [1,2,3];
var arr2 = arr1;
arr2.push(4);
此时arr1也会变为[1,2,3,4]
造成此现象的原因是因为 引用类型为指针指向内存空间，而基本类型对象为开辟空间存储内容
1、推荐使用原型去创建对象
   a 先定义一个构造函数  b 把公用的方法放到prototype上
套路：
    1、先把面向过程的代码整理一遍，把具体的功能封装成函数，不要出现函数嵌套函数
    2、再去改写成面向对象的形式
        1、全局变量就是属性
        2、函数就是方法
        3、既不是函数也不是全局变量的代码，单独封装成一个初始化方法。
    3、bug修复
    
    
1、hasOwnProperty 用来查看对象本身是否含有该属性，
2、constructor 用来查看构造函数。
    可以使用 f1.constructor or Fn1.prototype.constructor 查看
    可用于判断，举例：
    var arr = [];
    if(arr.constructor === Array){ console.log("是数组")};
    
    constructor注意事项：
    1、constructor是自动生成的，可以被修改的，注意尽量避免修改constructor；
    2、prototype中的某些属性是无法通过 for in 循环出来的 如constructor；
    
3、instanceof 用来检测一个对象在其原型链中是否存在一个构造函数的prototype属性，
            严格来说是运算符，
    1、作用：检测对象和构造函数是否有关系，可以用于简单的判断
     function Fn1(){}   ; var f1 = new Fn1();
     console.log(f1 instanceof Fn1) ;返回True

4、toString() 是一个方法，把对象转换成为字符串，
   toString的位置，如果是内置对象，如Array等，toString方法在原型上和Object的原型上都存在
   如果是自定义对象，在原型上默认是没有的，在最外层prototype上存在。
   可以使用该方法将数字转换成为相应的进制，举例：var num =255; console.log(num.toString(16));
   也可用于判断类型，目前已知判断对象类型方法有以下三种:
   var arr = [];
   console.log(arr.constructor == Array);//返回true
   console.log(arr instanceof Array);//返回true
   //call方法——改变内部的this指向
   console.log(Object.prototype.toString.call(arr))//返回[object Array];
   console.log(Object.prototype.toString.call(arr) === "[object Array]")//返回True
  
3、面向对象中的属性和方法
    hasOwnProperty 判断某个对象上是否有某个属性
    constructor 查看构造函数
    instanceof 运算符、和typeof类似，查看对象和构造函数是否有关系
    toString 1、要清楚该方法的位置在哪里 2、作用是什么 3、 功能是什么。
    
4、继承
使用call()/apply()方法进行属性的继承
function Parent(name,age){
    this.name = name;
    this.age = age;
}
function Child(name.age){
    Parent.call(this,name,age)    
};
使用自定义函数extend()来进行方法的继承
Parent.prototype.showAge = function(){ alert(this.age)};
function extend(Child,Parent){
    for(var attr in Parent){
        Child[attr] = Parent[attr]   
    }
}