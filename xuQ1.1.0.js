(function(window,undefined){
    var xuQ = function(){
        return new xuQ.fn.init();
    };
    xuQ.fn = xuQ.prototype = {
        init:function(){
            this.name = "xuQuery";
            this.alias = "xuQ";
            this.version = "version1.1.0";
            this.describe = "this is my own javascript util just like jquery ";
            this.regExps = {
                searchIP:/(?<![\d.])(([01]?\d\d?\|2[0-4]\d|25[0-5])\.){4}(?![\d.])/,
                isIP:/^(([01]?\d\d?\|2[0-4]\d|25[0-5])\.){4}$/,
                searchPath:/(((.*)\/([^/.]*)|([^/]*))\.(txt|js|css|html))/,//查询带扩展名的比较好
                isPath:/^(.*)\/([^/]*)|[^/]*]$/,
                oneDeepkuohao:/(\([^()]*(\([^()]*\))[^()]*\))]/, //查找一层嵌套的括号匹配问题,$1=外层括号内容，$2=内层括号内容
                txtInSeperator:/"([\\.]|[^\\"])*"/,//匹配分隔符内的内容，以“”为分隔符为例,转义的双引号也可以匹配
                telphone:/^13\d{9}|15[036789]\d{8}|18[89]\d{8}]$/   //
            }
        },
        addEventHandler:function(element,type,handler){
            if(element.addEventListener){//非IE
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){//IE
                element.attachEvent("on"+type,handler);
            }else{//都不支持
                element["on"+type]=handler;
            }
        },
        removeEventHandler:function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if (element.detachEvent){
                element.detachEvent("on"+type,handler);
            }else{
                element["on"+type] = null;
            }
        },
        getEvent:function(event){
            return event?event:window.event;
        },
        getTarget:function(event){
            var event = xuQ.getEvent(event);
            return event.target?event.target:event.srcElement;
        },
        getCurrentTarget:function(){
            var event =xuQ.getEvent(event);
            return event.currentTarget?event.currentTarget:window.el;//?
        },
        createXHR:function(){//ajax相关
            if(typeof XMLHttpRequest !="undefined"){//IE7+,Firefox,chrome
                return new XMLHttpRequest();
            }else if(typeof arguments.callee.activeXString!='string'){//说明是第一次调用（IE7之前版本）
                    var  versions=["MSXML2.XMLHttp.3.0","MSXML2.XMLHttp","MSXML2.XMLHttp.6.0"];//简单优化，把最新的放在最后，然后从最后遍历
                    var i;
                    for(i=versions.length-1;i>=0;i--){
                        try{
                           new ActiveXObject(versions[i]);
                           arguments.calleee.activeXString=versions[i];
                            break;
                        }catch(e){

                        }
                    }

                return new ActiveXObject(arguments.callee.activeXString);
            }else{
                throw new Error("No XHR object available!");
            }
        },
        createDocument:function(){
            if(typeof XMLHttpRequest !="undefined"){//IE7+,Firefox,chrome
                return new XMLHttpRequest();
            }else if(typeof arguments.callee.activeXString!='string'){//说明是第一次调用（IE7之前版本）
                var  versions=["MSXML2.DOMDocument","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument.6.0"];//简单优化，把最新的放在最后，然后从最后遍历
                var i;
                for(i=versions.length-1;i>=0;i--){
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.calleee.activeXString=versions[i];
                        break;
                    }catch(e){

                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            }else{
                throw new Error("No XHR object available!");
            }
        },
        parseXml:function(xml){//反序列化xml
            var xmlDom =null;
            if(typeof DOMParser !="undefined"){
                xmlDom = (new DOMParser()).parseFromString(xml,"text.xml");
                var errors = xmlDom.getElementsByTagName("parsererror");//居然是parsererror而不是parseerror/找不到是返回undefined么？
                if(errors.length){
                    throw new Error("XML parsing error:"+errors[0].textContent);
                }
            }else if(typeof ActiveXObject !="undefined"){
                xmlDom = createDocument();
                xmlDom.loadXML(xml);
                if(xmlDom.parseError!=0){
                    throw new Error("XML parsing Error:"+xmlDom.parseError.reason);
                }
            }else{
                throw new Error("No XML parse available.");
            }
            return xmlDom;
        },
        serializeXml:function(xmlDom){
            if(typeof DOMParser !="undefined"){
                return (new XMLSerializer()).serializeToString(xmlDom);
            }else if(typeof xmlDom.xml!="undefined"){
                return xmlDom.xml;
            }else{
                throw new Error("Can not serialize XML Dom");
            }
        },
        //计算小工具
        //计算数字数组的最大值，
        maxArrayUseEval:function (inArray){
            var s = inArray.join();
            return	eval('Math.max('+s+')');
        },
        maxArrayUseApply:function (inArray){
            return Math.max.apply(null,inArray);
        },
        //转化一个数字数组为function数组（每个function都弹出相应的数字）
        transArrayToFunctionArray:function (inArray){
            if(inArray.length){

                var i =0;
                for(i=0;i<inArray.length;i++){
                    inArray[i]=function(num){
                        return function(){
                            alert(num);
                        }
                    }(inArray[i]);
                }

            }else{
                return false;
            }
        },
        //给object数组进行排序（排序条件是每个元素对象的属性个数）
        sortObject:function (objArray){
        count(objArray);
        var i=0;
        objArray.sort(function(a,b){
            return b.count-a.count;
        });
        function count(objArray){
            var i = 0,
            count=0;
            if(objArray.length){
                for(i=0;i<objArray.length;i++){
                    for(el in objArray[i]){
                        count++;
                    }
                    objArray[i].count=count;
                    count=0;
                }
              }
            }
         },
        Fibonacci:function fb(n){//用匿名函数表达式实现递归
            if(n==0) return 0;
            if(n==1) return 1;
            return fb(n-1)+fb(n-2);
        },
        //三个数相加的add语法糖：var a = add(2)(3)(4); //9
        add:function (a){
            return function(b){
                return function(c){
                    return a+b+c;
                }
            }
        },
        //任意个数相加的语法糖，方法不是很好
        addAny:function Add(n){
            Add.sum=Add.sum?Add.sum+n:n;
            Add.toString=function(){return Add.sum;}
            Add.valueOf=function(){return Add.sum;}
            return arguments.callee;
        }





    };
    xuQ.fn.init.prototype = xuQ.fn;

    window.xuQ = window.x$=xuQ;
}(window,undefined));