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
            var event = xuQ().getEvent(event);
            return event.target?event.target:event.srcElement;
        },
        getCurrentTarget:function(){
            var event =xuQ().getEvent(event);
            return event.currentTarget?event.currentTarget:window.el;//?
        }
    };
    xuQ.fn.init.prototype = xuQ.fn;

    window.xuQ = window.x$=xuQ;
}(window,undefined));