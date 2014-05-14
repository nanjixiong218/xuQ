(function(window,undefined){
    //为防止覆盖，与别的框架兼容，用于noConflict()
    var _jquery = window.jquery;
    var _$ = window.$;

    var jquery = window.jquery = window.$=function(selector,context){//我们编程时用到的$就是这样一个简单的函数

        return new jquery.fn.init(selector,context);//算是一种工厂模式
    };
    var quickExpr = new RegExp();  //定义了对选择器(selector)过滤的正则
    var isSimple = new RegExp();

    //接下来是对这个函数进行扩充，通过什么呢，自然是神奇的prototype啦

    jquery.fn = jquery.prototype ={
        init:function(selector,context){//真正的构造方法

        },
        version:'',//版本属性也在原型上，所以所有的jquery对象都能访问version
        size:function(){
            return this.length;
        },
        length:0,//实际上jquery对象也算是一个功能强大的类数组，自己维护了length属性
        get:function(){

        },
        set:function(){

        },
        pushStack:function(){

        },
        setArray:function(){

        },
        each:function(){

        },
        index:function(){

        },
        attr:function(){

        },
        css:function(){

        },
        text:function(){

        },
        wrapAll:function(){

        },
        wrapInner:function(){

        },
        wrap:function(){

        },
        append:function(){

        },
        prepend:function(){

        },
        before:function(){

        },
        after:function(){

        },
        end:function(){

        },
        find:function(){

        },
        clone:function(){

        },
        filter:function(){

        },
        not:function(){

        },
        add:function(){

        },
        is:function(){

        },
        hasClass:function(){

        },
        val:function(){

        },
        html:function(){

        },
        replaceWith:function(){

        },
        eq:function(){

        },
        slice:function(){

        },
        andSelf:function(){

        },
        data:function(){

        },
        removeData:function(){

        },
        domMainip:function(){

        }
    };

    jquery.fn.init.prototype = jquery.fn;//这句话很牛逼，让jquery的结构通过原型链形成了一种嵌套循环，
    // 也就是init的原型同时又指向init的所属对象（即jquery的原型），这样init的原型也有了init属性，
    // init原型的init的属性又指向了jquery的原型……，其实就是一个圈。

    //两个内部私有方法
    function evalScript(){

    }
    function now(){

    }

    //jquery最牛逼的扩展方法
    jquery.extend = jquery.fn.extend = function(){

    };

    jquery.extend();//用这个方法扩展了jquery的强大功能


})(window,undefined);