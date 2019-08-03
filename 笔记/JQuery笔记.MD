    jQuery 写法
    [ .click() ] =[ .onclick= function(){}  ]
    $("button").click(function(){
        //.html()  =  .innerHTML  ,
        // .siblings() 为这个元素的所有兄弟元素，可在括号内传入参数，指定兄弟元素种类
        $("#box2").html($("#box1").html()).siblings("div").html("");
    })
    
     属性选择器   
     $("input[value*=user]").css("color","red")   ;   *= 表示 属性中包含该内容的全被选中！ 划重点！
     $("input[value^=user]").css("color","red")   ;   ^= 表示所有属性中以该内容开头的全被选中！
     $("input[value$=user]").css("color","red")   ;   $= 表示所有属性中以该内容结尾的全被选中！
     
     选择器过滤
     $("li:first").css("color","red"); li:first 表示选择第一个
     $("li:last").css("color","red"); li:last 表示选择最后一个
     $("li:even").css("color","red"); li:even 表示选择下标为偶数的元素
     $("li:odd").css("color","red"); li:odd 表示选择下标为奇数的元素
     $("li:eq(2)").css("color","red"); li:eq(2) 表示选择下标等于2的元素
     $("li:lt(2)").css("color","red"); li:lt(2) 表示选择下标小于2的元素
     $("li:gt(2)").css("color","red"); li:gt(2) 表示选择下标大于2的元素
     $("li:not(li:eq(2))").css("color","red"); li:not(li:eq(2)) 表示选择不等于括号内元素的元素
     
     jQuery方法（函数）
     1、添加类/删除类/切换类
         $(function(){
             $("button:first").click(function(){
                 //添加类addClass()
                 $("#box1").addClass("red");
             })
             $("button:last").click(function(){
                 //删除类removeClass()
                 $("#box1").removeClass("red");
             })
             //切换类(toggelClass())
             $("button:eq(1)").click(function () {
                 $("#box1").toggleClass("red");
             })
         })
         
     2、html()和text() 表示获取或设置内容，如果括号内传值，则为设置内容
                                           如果括号内为空，则为获取内容
     3、css()获取或设置css样式，可传入数组{"background":"red","color":"white"};
     4、$(data).each(function(index,item){})、index为下标，item为对象，有多少数组，function()就会执行多少次
     5、attr 循环获取或者设置属性  prop()同样用来设置属性
     两者区别：具有true和false的属性用prop() 如，checked,selected,disable等，
                其他用attr()，
        removeattr 删除属性
     6、val()表示获取或设置input内容，如果传入内容表示设置，如果为空表示获取
     7、和DOM操作相关方法：
        1、append
        2、appendTo
        3、prepend
        4、prependTo
        特点：两个元素之间为父子关系，没有加To 理解为 在……里面添加元素，  加To，把……添加到……
        5、after
        6、insertAfter
        7、before
        8、insertBefore
        特点：两个元素之间为兄弟关系，没有insert，在……后/前面添加；有insert，把……插入到前/后面
        
        index()获取当前元素下标，
        get()获取到集合中的某个元素，括号内填写元素下标，获取到的是原生对象
        可以使用这个方法将元素转换成为原生对象
        
        .prev()获取到上一个元素的兄弟元素，返回为jQuery对象
        .prevAll("p") 上面元素中的所有兄弟元素，可以传入过滤条件
        .next()获取到下一个兄弟元素，返回为jQuery对象
        .nextAll("div")获取下面所有的兄弟元素，也可传入过滤条件
        .siblings()获取到所有的兄弟元素
        $("#wrap).find("p") === $("#wrap p")  find()查找更高效
        .closest("tr") 查找最近父级元素中的tr，常用来点击删除后删除该条元素
        
        .on("click",function(){})  事件绑定，一次性可对同一元素绑定多个事件
        .off("事件名称") 表示删除事件