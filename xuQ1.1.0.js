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
        }
    };
    xuQ.fn.init.prototype = xuQ.fn;

    window.xuQ = window.x$=xuQ;
}(window,undefined));