**、let 块级变量定义**。
**2、const** 
   ①定义常量的关键字，不会被改变的量。
   ②const定义的时候必须赋值，无法重复定义。
   ③const也是块级作用域生效
   ④如果const定义一个对象，可以进行添加对象，在指定内存地址添加内容，无法重新覆盖对象
**3、解构赋值：**
本质上为赋值操作， 把一种结构解散重构，然后进行赋值。
是一种模式的匹配，关键点：一一对应关系。
注意：1、解构不成功时，返回undefined； 如：let [a,b] = [10];
      2、可以设置默认值 如 let [a,b=20] = [10]; 
      3、可以使用扩展运算符（...），值比变量多的时候
      举例：let [a,b,...c] = [1,2,3,4,5,6,7];
      返回 a=1，b=2  c=(Array)[3,4,5,6,7];
对象的解构赋值：
赋值符号左右两边为对象。如：let{a,b} = {a:"hello",b:"word"};
注意1：对象的解构赋值的一一对应关系是根据key，不是根据数值的位置；
注意2：如果左边的对象key和value是同名的， 可以简写，正常写法为let{a:m,b:n} = {a:"hello",b:"word"}; console.log(m,n);返回的也是与上面相同；
注意3：对象的解构赋值是可以嵌套的
        举例：let {a,[b,c],d} = {1,[2,3],4};        
 //JSON的数据提取 十分常用！
    let jsonData = {
        a:20,
        b:30,
        c:40
    }
    let [a,b,c] = jsonData;
    console.log(a,b,c); 
    
**4、数组相关新增**   
1、扩展运算符（...） 把数组展开以逗号分隔，
如let arr=[1,2,3]  console.log(...arr) //返回1,2,3
还可以使用此方法进行传参
function fn(a,b,c){console.log(a,b,c)};   fn(...arr);
使用方法进行赋值操作
let arr1=[1,2,3];  let arr2 = [...arr1] ;即可，不会产生对象引用的错误；
数组合并:let arr1=[1,2,3];let arr2=[4,5,6];console.log([...arr1,...arr2]);
数组生成：let [a,b,...arr] = [1,2,3,4,5,5,6,7] ; 则arr=[3,4,5,5,6,7];
**闭包**
用处1：可以读取函数内部的变量，2、让这些变量始终处于内存当中
简单样式
function A(){ var b = 1;  return function(){ console.log(b)}};
(function(){})();
应用场景：
    1、封闭作用于， 可以解决变量重名的问题
**数组扩展方法**
1、Array.from 把伪数组转换成为真正的数组
2、Array.of 可以创建出数组 、为了弥补Array方法的不足， 
不足：行为不统一，传入的参数不同，这个函数的功能不同。
比如 Array(4) 表示规定这个数组的长度为4 ，而不是里面有一个元素4
3、copyWithin   在数组的内部拷贝一些元素放到数组的指定位置。
arr.copyWithin(0,1,4);//意思为 从下标为1的元素开始到第四个元素中间的所有元素 复制到从0开始的位置，不包含下标为4的元素
4、fill  填充元素 一般用于初始化数组 arr2.fill(0);
5、entries、keys、values 配合for...of 结构去遍历数组;
    for(let index of arr.entries()){} //表示打印出值和下标
    for(let index of arr.keys()){} //表示打印出数组的下标
    for(let index of arr.values()){} //表示打印出数组的值
6、find和findIndex  //find用于查找元素，返回第一个符合条件的元素，findIndex 用法与find相同，只不过一个是返回的是值，一个返回的是下标
 let v = arr.find(function(v,i,a){
        //v 为数组元素， i为元素下标，a为整个数组
        console.log(v,i,a);
        return v>3 ; //返回4
    })
7、includes 检查元素 是否在数组里 返回 true or false

二、
es6中函数的简写
1、没有参数时：
let f = () => console.log(111);
2、只有一个参数时
let f = (n) => console.log(n);
3、有两个参数时 
let f = (n,m) => console.log(n,m);
4、有多条语句时
let f = (a,b) =>{
    let c = a+b;
    console.log(c);
}
**注意：**
1、箭头函数没有自己的this，它内部的this，并不是调用调用时候指向的对象
而是定义的时候指向的对象。
举例：document.onclick = ()=>{console.log(this)}//返回window
document.onclick = function(){ let f = ()=>{console.log(this)}}
//上面的语句返回的是 document；因为生成时在document里；
2、箭头函数不能用于构造函数，不能用new关键字
3、 箭头函数内部没有arguments对象。
4、箭头函数里不能使用yield命令，因为箭头函数不能作Generator函数

1、ES6中 key和value如果相同，可以简写， 举例：let [name,value] = ["xiaoli",12] , let obj = { name,value };
2、方法的简写：let obj = { showName(){ alert(1)}};
3、ES6中属性表达式的属性可以支持变量 let [a,b]=["name","age"];let obj = { [a]:"xiaoqiang",[b+"1"]:12}; //返回name:xiaoqiang,age1:12   

**新增方法**
Object.is(1,1)； 类似于“===”为了修复NaN不等于自己的问题
合并对象：Object.assign(obj1,obj2,obj3)；

**Symbol用法**
定义：在ES6中新增的数据类型，用来表示独一无二的值，
    ES5中分为基本数据类型： 数字，字符串 布尔 undefined null Symbol
             引用数据类型：Object 
 注意事项：
 1、即使是相同的值，Symbol也不相等 举例  Symbol("1") === Symbol("1") ;//返回false
 2、不能使用new来调用 报错
 3、做类型转换时不能转换成为Number
 4、不能做任何的运算
 5、如果把Symbol对象作为对象的属性和方法，一定要用一个变量来存储
 举例：let name = Symbol('name'); let obj = { [name] : "11"};
 6、for in没有办法将内容遍历出来，如果需要遍历 可用Object.getOwnPropertySymbols(obj2)遍历内容//返回的是数组，数组中装的是Symbol属性
 **Set/Map**
     //1、set的特点：里面的元素不重复， 常用于去重操作；
         // 1、Map是ES6中新增的数据结构，类似于对象
         
 **重点：同步异步**
 1、同步代码 一起执行， 异步代码，执行有时间差
 异步嵌套函数过多导致不易阅读， 引入新方法 Promise
 Promise是一个构造函数，是异步编程解决方案 
  //将Promise对象进行封装，最后返回Promise对象
    function AsyncFn(){
        let p = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                //模拟加载图片
                console.log("图片加载成功");
                resolve();
            },1000)
        });
        return p;
    };
//    then方法,先执行AsynFn()中的代码，成功后执行then后的方法
//    then里面的第一个参数为函数块，会被传给Promise中的resolve();
    AsyncFn().then(()=>{
        //图片加载成功以后需要执行的业务逻辑
        console.log("图片已经被添加");
    })
//    **注意：Promise对象只要被创建，里面的异步代码会马上被执行，因为不希望被加载时直接被执行，**
//     所以封装成函数
**all方法**
//Promise中直接挂载了all方法，
//且Promise.all([p1,p2,p3])  括号中得传入数组，并且数组中的内容是Promise的实例
//应用场景：需要保证所有元素都正常运行才能执行下一步操作时，则可以使用all方法，
//all方法种，只要有一个实例报错，就会返回那个报错的error

**race方法**
 //Promise.race([p1,p2]);  p1 p2 谁运行的快 最后返回谁，可以用来执行图片超时的判定。
 
 **Iterator接口**
 用于遍历操作，依次去处理数据结构中的成员，是一种机制，为不同的数据结构提供统一的访问机制；
 应用场景举例：
 1、解构赋值时就是使用iterator遍历出数组中的内容 一一赋值
 2、扩展运算符也同样是使用iterator遍历出数组内容重组返回
 **注意**
 对象是不可以被迭代的  object.Symbol.iterator  = undefined;
 
 **Generator**
     //1、Generator是一个函数，是es6提供的一个异步编程解决方案，内部有各种状态
 //    可以把Generator理解成为状态机 生成器。
 //    定义的时候和普通的函数方式不一样 需要加* 使用yield关键字在内部定义各种状态
//     3、调用Generator函数后，返回的是一个迭代器对象。
//     补充：当Generator函数内部，遇到yield关键字就会停止。下一次调用才会从下一次开始
**class**
    //1、class 一个定义类的关键字，面向对象的基础知识
    // ES6中class写法如下
        class Person{
            constructor(name,age){
                this.name = name;
                this.age = age;
            }
            showName(){
                alert(this.name);
            }
        }
            //constructor是构造方法
            //当对象被new实例化时， constructor 会直接被执行。

**继承**
    class Child extends Person{
        constructor(name,age,sex){
            super(name,age);  //super方法表示获取到父类身上的constructor ，需要先调用父类的constructor，才能写自己的属性
            this.sex = sex;
        }
    }
 
 **模块化写法ES5**
     //1、匿名函数自执行,需要用大括号将匿名函数框住，再后面加()自执行
     // (function (){
     //     alert(1)
     // })();
     //ES5中模块化写法
 //    核心：一个文件就是一个模块，一般情况下单独创建文件写模块
    var module = (function (){
         //私有变量
         var name = 'aaa';
         function fn1(){
             alert(1);
         }
         function fn2(){
             alert(2)
         };
         return {
             fn1:fn1,
             fn2:fn2
         }//返回的是一个对象
     })()
     console.log(module);//控制台显示Object
     module.fn1();
     console.log(module.name); //返回undefined ；因为name是私有变量
     
     
 **模版字符串**
 用反引号 `` 定义  波浪键  增强版的字符串
 模版字符串中嵌入字符串样式： 
 let s = "xxx";
 let s1 = `这里是增强${s}字符串`;
 console.log(s1) ;//output 这里是增强xxx字符串;
 只需要在模版字符串中添加 ${变量}即可
 模版字符串中可以解析变量
     //应用1，循环输出减少错误提升效率
     //应用2：添加元素时可直接用模版字符串，不需要转义也不需要双引号加号