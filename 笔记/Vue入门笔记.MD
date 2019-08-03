** 1、Vue第一课**
  let vm = new Vue({
        el:"#app",//el表示把id为app的div作为这个应用的根节点，不管#app里有什么 都可以通过vue操作
        data:{
            //所有的数据都存储在data上
            message:"hello"
        }
    })
    //vm是vue的实例对象，这个实例对象上的一些属性和方法都是以"$"开头的;
    console.log(vm.$el);
//    通过vm实例，它的$data属性可以访问数据对象
    console.log(vm.$data === vm.message);
    //强调：vm代理了数据对象；vm.$data === vm.message
//    只要放在data数据对象里的数据， 都是响应式的。 响应式：数据变化的话 视图也会跟随着变化,数据被监听改变后 会相应到相应的地方
//    总结：1、必须有一个根节点， 放在$el中  ；
//          2、响应式数据必须写在data里面；
//          3、一个页面中可以创建多个vue实例。

**事件响应**
    <button v-on:click="say('hello')">点击</button>
    new Vue({
            el:"#app",
            //在vue中用methods定义上述触发的事件函数
            //如果需要传参 则按照如下形式
            methods:{
                say(msg){
                    alert(msg);
                },
                say2(){
                    alert(2);
                }
            }
        })
 **事件修饰符**
 <div id="inner" v-on:click.stop="inner"></div>
     //1、事件修饰符，帮助我们处理事件相关细节的，比如 防止事件冒泡 阻止默认行为
    // 在v-on:click 后加入
     // stop修饰符 可以阻止事件冒泡
     //prevent修饰符可以阻止默认行为
     //capture修饰符表示事件捕获，捕获是从外到里 ，冒泡是从里到外需要注意
     //self修饰符 当事件源是自己的时候，才能触发，不会被冒泡触发
     //once修饰符 表示只触发一次
     
 **按键修饰符**
 <!--    这里是一个搜索框，按回车执行搜索-->
     <input type="text" v-on:keyup.enter="fn">
    //表示操作的按键对象，比如keyup.enter 表示当回车抬起的时候触发函数
    //常用的按键修饰符
    //1.enter回车
    // 2.tab tab键盘
    // 3. delete (捕获“删除”和"退格"键)
    // 4.esc esc键
    // 5. up  down  left right 等方向键
    // 6.space 空格
    
**系统修饰符**
    //系统修饰符
    //shift 表示按住shift后操作才判定有效
    //还有ctrl alt 等，
    //注意：meta 在mac键盘上是对应的command键 windows上表示 window键
    
**指令相关**
    //v-text 和 {{message}}的区别：当页面加载较慢 或者vue还没有被创建时  message不会显示到页面 但是 {{message}}会显示到页面
    //v-html 会解析html
    // v-show同样也是模块隐藏/展示，不过是只改变dispaly的属性，并不会标签元素删除
    //v-if 会把标签删除
    //加载区别：v-show在页面加载时会渲染，v-if加载时不会渲染 是惰性的
    //v-show适合频繁切换时使用
    //v-if类似于if语句，直接添加在标签上使用，当引号内条件为真时，显示模块，反之删除
 ** <p v-if="num>=90">优秀</p>
    <p v-else-if="num>=80">及格</p>
    <p v-else-if="num>=70">奈斯</p>
    <p v-else>不及格</p>**
    //v-for写在哪个元素身上，就循环哪个元素
    //v-for可打印数组下标v-for="(item,index) in arr" ;item表数组内容，index表下标
    //v-for可以循环对象，v-for="(value,key) in obj" 可以循环出对象的key:value
    //v-for 可以控制循环的次数
    //如果要页面跟随数据变化 渲染也跟着变化，需要使用vue中的变异方法，如push pop等
    
**变异方法:**
//1.push 往数组后面添加一个元素
//this.arr.push(111);
//console.log(arr) //返回[1,2,3,111]

//2.pop() 删除最后一个元素
// this.arr.pop();//pop方法的返回值就是被删除掉的元素
//console.log(this.arr.pop()) //返回 3
//console.log(arr) //返回[1,2]

//3.shift() 删除数组第一个元素
//this.arr.shift() 同pop 返回的是第一个被删除的元素

//4.unshift() 在第一个元素前添加一个元素,与push相对
// this.arr.unshift(999);

//5.splice() 删除或添加元素，第一个参数表示从什么位置开始， 第二个参数表示删除多少个，不写第二个参数表示全部删除
// this.arr.splice(0,2)
//表示从第0个位置开始，删除2个元素后，添加333和444两个元素，从第三个参数开始表示添加的元素
// this.arr.splice(0,2,333,444);

//6.sort() 排序 需要传入排序规则（函数） 不传参是默认以字符编码进行排序
//升序
// this.arr.sort((a,b)=>{return a>b});
//降序
// this.arr.sort((a,b)=>{return a<b});

//7.reverse() 反转
// this.arr.reverse() ; //反转数组

**数组相关方法**
//arr.filter()过滤
//let arr=[1,2,3,4]; let arr2=arr.filter((item,i)=>{ return i>1});//输出下标大于1的数组
// filter中的匿名函数 item返回数组值，i返回数组下标
//arr.every() 判断如果数组中的所有元素符合条件，则返回true，只要有一个不符合，返回false
//括号中间是函数
// arr.every( (item)=>item.checked)
//forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
//注意: forEach() 对于空数组是不会执行回调函数的。
//this.goods.forEach((item)=>item.checked=newValue);

**对象属性的添加删除**
//属性的添加 必须使用Vue.$set()的方式添加，不然不会出发 视图的更新
//属性的删除 使用Vue.$delete()

**Vue中的其他常用方法**
<!-- 1、v-on：为事件名称， 绑定事件，可以简写成 “@+事件名称”-->
    <button @click="fn">点击</button>
<!-- 2、v-bind 绑定属性   v-bind="表达式" 如果直接添加内容 需要用单引号括住-->
<!-- v-bind 同样也可以简写    :属性=""-->
<!--    v-bind可以实现切换class 示例如下 使用哪个class 具体取决于:后面的值-->
    <div   class="static"
           v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
    <a v-bind:href="'http://www.baidu.com'">百度一下</a>
    <a v-bind:href="href">百度两下</a>
    <a :href="href">百度三下</a>

<!-- 3、数据的双向绑定 v-model -->
<!--    数据的双向绑定：不管是data中还是input中的val变化，其余的都会跟随变化-->
    <button @click ="add">增加</button>
    <input type="text" v-model="val">
    <p>{{val}}</p>
<!--    4、v-pre 跳过编译 加了此指令后不会编译内容-->
<!--    <p>{{href}}</p>-->
<!--    <p v-pre>{{href}}</p>-->
<!--    5、v-cloak 配合CSS：display:none 使用解决闪烁问题，当Vue还没有被创建时，标签不会显示-->
<!--    注意：当所需要隐藏的内容较多时，使用v-cloak，较少时使用v-text-->
<!--    6、v-once 表示只渲染一次-->

**Class、style的绑定**
<div id="app">
<!--    注意：v-bind:class ="变量名" 冒号中需要填写变量名-->
<!--    1、绑定单个class-->
    <div :class="cBox"></div>
<!--    2、绑定多个class ;   :class="[变量名1，变量名2]"-->
    <div :class="[cBox,cBox2]"></div>
<!--    3、控制类的展示隐藏-->
<!--    注意：控制时冒号内需要填写的是对象，而不是数组-->
<!--          且对象中类名不可以使用变量，需要填写具体的类名-->
    <hr>
    <button @click = "fn">点击</button>
    <div :class="{box3:isActive}"></div>
<!--    //绑定多个style也是使用数组+变量的形式-->
    <div :style="[divStyle,divStyle2]"></div>
    
总结：
    1. class     :class="变量名"    ; :class=[变量1，变量2。。。]   ;  :class="{具体类名:布尔值}"
    2、style  :style = "变量名" 所有的样式都写在变量中，其中复合样式 需要把“-” 去掉  后面首字母大写
                                举例：backgroundColor等

**表单输入绑定**
<!--    1、当v-model存在时 input中的value属性无效  text textarea同样如此-->
    <input type="text" value="111"  v-model="hello">
    <textarea v-model="hello" cols="30" rows="10"></textarea>

    <hr>
<!--2、单选框中 选择后会将选中的value存在picked变量中，可直接使用-->
    <input type="radio" v-model="picked" value="难">
    <input type="radio" v-model="picked" value="女">
    {{picked}}
    <hr>
<!--    3、复选框 返回的是数组，所以v-model中传入的变量需是数组-->
    <input type="checkbox" v-model="ced" value="react">
    <input type="checkbox" v-model="ced" value="vue">
    <input type="checkbox" v-model="ced" value="angular">
    {{ced}}
    <hr>
<!--    4、修饰符-->
<!--    v-model的赋值结果为字符串类型，需要使用修饰符.number转换为数字-->
    <input type="text" v-model.number="num">+
    <input type="text" v-model.number="num2">
    结果：{{num+num2}}
<!--    去除两边空格 .trim-->
    <input type="text" v-model.trim="num3">
    长度：{{num3.length}}          

**计算属性**
    //计算属性：以属性的形式来调用，实际上内部是逻辑内容，如obj.fn 不用括号直接调用
    //表面上的区别：
    // 1、计算属性是不用加（）调用的，方法需要
    // 2、计算属性可以被缓存，渲染一次后被缓存，方法则每次渲染都会重新执行，故可以提高性能，它会随着它依赖的变量变化
    // 相同点：内部都是逻辑代码
 
 **注册组件**
     // Vue.component("组件名字",{逻辑})
     Vue.component("button-a",{
         //注意：data一定要写成方法的样式，加括号且return obj
         data(){
             return {num:0}
         },
         methods:{
             fn(){
                 this.num++
             }
         },
         template:`<button @click = "fn">点击我自动+1 : {{num}}</button>`
     })
 **父子组件传值**
//使用props:[""],在div内获取属性 赋值给props中的变量，再在组件中使用
<div id="app">
    <input type="text" v-model="title">
    <dialog-component :dtitle="title"></dialog-component>
</div>
<script>
    Vue.component("dialog-component",{
        template:"<div :style='box'><div :style='boxTitle'>{{dtitle}}</div></div>",
        props: ["dtitle"]
    })
    new Vue({
        el:"#app",
        data:{
            title:'登录',
        }
    })
</script>
**子组件向父组件传值**
<div id="app">
    <button-modules v-on:test="say"></button-modules>
</div>
<template id = "button-modules">
<!--    $emit 触发当前实例上的事件。附加参数都会传给监听器回调-->
    <button @click="$emit('test','lllllslllll')">点击</button>
</template>