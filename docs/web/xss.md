# XSS
XSS 即（Cross Site Scripting）中文名称为：跨站脚本攻击，按理应该简称为 CSS，但为了与层叠样式表（CSS）区分开，特意改为 XSS 。

XSS 漏洞，通常指的是网站对用户输入数据未做有效过滤，攻击者可以将恶意脚本注入网站页面中，达到执行恶意代码的目的。攻击者只需要诱使受害者打开特定的网址，就可以在受害者的浏览器中执行被注入的恶意代码，从而窃取用户身份，执行一些敏感操作，或是进行其他的危害行为。

## XSS攻击原理
程序+数据=结果，然而当我们数据中包含程序的时候，结果就会改变了。
![](/web/1.png)

## Scripting脚本能干啥
1. 获取页面数据，通过DOM节点拿到页面的数据
2. 获取Cookies，通过document.cookies来获取cookie的内容
3. 劫持前端逻辑，比如将某个按钮的点击事件更换
4. 发送请求，页面中的脚本可以发送服务器请求，这样实现资料的盗取
5. 偷取网站任意数据，用户资料，用户密码和登录态
6. 欺骗用户

## XSS攻击分类
XSS攻击分类分为两种类型：
* 反射型：反射型指的是url参数直接注入，网站不存在这样的代码，攻击者将这段代码从url带过来，然后页面直接显示这段代码，导致产生XSS攻击。
* 存储型：存储型攻击指的是代码存储到数据库中，然后其他用户读取这段代码，显示到页面上产生攻击。
*  DOM 型 XSS

一般来说反射型攻击危害较小，更明显。

## XSS攻击注入点
* HTML节点内容：如果一个节点的内容是动态的，里面包含用户输入的信息，那么这个输入的信息可能包含脚本
* HTML属性：HTML属性有可能是用户输入的数据组成的，这个属性可能包含脚本
* JavaScript代码：代码包含后台注入的变量，或者包含用户输入的信息，有可能会改变JS代码的逻辑导致XSS攻击
* 富文本：是指一大段HTML格式文本，既要保留HTML格式，也要去除XSS攻击的代码

### HTML节点内容
```html
<div>
    #{content}
</div>
```
以上的内容有可能会输出以下结果
```html
<div>
    <script>
    </script>
</div>
```

### HTML属性
```html
<img src="#{image}"/>
<img src="1" onerror="alert(1)"/> 
```

### JavaScript代码
```js
<script>
    var data = "#{data}";
    var data = "hello";alert(1);""; //可能会生成这样的
</script>
```

### 富文本
富文本需要保留HTML，HTML有XSS攻击风险，

## XSS 漏洞挖掘
XSS 漏洞挖掘的方法可以按有无源码的情况分为黑盒测试和白盒测试。
* 黑盒测试主要是通过发送特意构造攻击字符串来验证漏洞，比如 `<script> alert(1)</script>`。请求后看是否会弹框，若会则代表存在 XSS，反之则不存在。
* 白盒测试是通过分析源代码来检测 XSS 漏洞，根据不同的编程语言采取不同的词法、语法分析方式，然后通过污点分析(追踪用户的输入数据是否达到特定的漏洞触发函数)的思路来检测漏洞。

## XSS防御
1. 浏览器自带防御，X-XSS-Protection设置，它防御的是反射型的XSS
目前该属性被所有的主流浏览器默认开启XSS保护。该参数是设置在响应头中目的是用来防范XSS攻击的。它有如下几种配置：
值有如下几种：默认为1，0：禁用XSS保护。1：启用XSS保护。

2. 字符的转义，转义`<&lt;`和`>&gt`，对于HTML节点内容，例如用户输入的评论，只希望是文字，并不希望是标签，那么久可以对字符进行转义成实体。
```js
var escapeHtml = function(str){
    if(!str) return '';
    str = str.replace(/</g,'&lt;');
    str = str.replace(/>/g,'&gt;');
    return str;
}
```

3. 字符的转义，转义`""`成`&quto;`，对于HTML的属性需要做这类转义，避免新增新的属性。
```js
var escapeHtmlProperty = function(str){
    if(!str) return '';
    str = str.replace(/&/g,"&amp;");
    str = str.replace(/"/g,"&quto;");
    str = str.replace(/'/g,"&#39;");
    str = str.replace(/ /g,"&#32;");
    return str;
}
```
JS的转义
```js
var escapeForJS = function (str){
    str = str.replace(/\\/g,'\\\\');
    str = str.replace(/"/g,'\\"');
    return str;
}
```
4. 富文本就是一大段的HTML，那么它的防御策略一般就是过滤，过滤的思路有两种，一种是按照黑名单、比如将`script`标签和onerror属性去除，一种是按照白名单保留部分标签和属性，比如只允许什么样的标签，以及标签的属性。黑名单的实现相对简单，按照正则表达式的实现过滤即可，但是HTML标签和属性较多，易容易产生漏洞。而白名单相对比较彻底，相对比较麻烦，他需要将将html解析成数据结构，然后对数据结构进行过滤，然后再组装成HTML。

例如黑名单过滤处理：
```js
var xssFilter = function(html){
    if(!html) return '';
    html = html.replace(/<\s*\/?script\s*>/g,'');
    html = html.replace(/javascript:[^'"]*/g,'');
    html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g,'');
    return html;
}
```

而白名单过滤过程就是将富文本允许的标签和属性列出来，除了这些允许的内容之外，其他的全部过滤掉，首先使用cheerio将HTML解析成树状结构，然后对DOM树进行遍历，查看是否是我们允许的标签和属性，如果不是则去除掉。例如开源库[js-xss](https://github.com/leizongmin/js-xss)

5. CSP(Content Security Policy)内容安全策略，它用于指定哪些内容可执行，它是一个HTTP的头，他用来限制哪些可以执行，例如：

* `child-src`(页面子内容：iframe、webworker)、`connect-src`(网络连接：ajax)、`default-src`(当其他的没有指定的时候回去找default)
* `font-src`、`frame-src`、`img-src`
* `manifest-src`、`media-src`、`object-src`
* `script-src`、`style-src`、`worker-src`
* `<host-source>` `<scheme-source>` `self`
* `unsafe-inline` `unsafe-eval` `none`
* `nonce-<base64-value>` `<hash-source>`
* `strict-dynamic`

## 基于VUE搭建的网站如何防范XSS攻击
1. 对于从接口请求的数据，尽量使用{{}}加载，而不是V-HTML。
vue中的大括号会把数据解释为普通文本。通常如果要解释成html代码则要用v-html。而此指令相当于innerHTML。虽然像innerHTML一样不会直接输出script标签，但也可以输出img，iframe等标签。
2. 对用V-HTML和INNERHTML加载的客户信息进行转义

如果显示内容里面有html片段，一定需要用v-html或者innerHTML加载，例如：
```html
<div v-html="`<span>${message}</span>`"></div>
```
里面的message是客户自己输入的信息，如果此时是恶意的dom片段肯定会引起XSS攻击。此时我们可以对“<”，">"转译成“&lt;”，“&gt;”。然后再输入到页面。

3. 在入口页面的META中使用CSP，在入口文件的head添加meta标签
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self';style-src 'self'">
```
上面的CSP设置表示，script脚本资源和style样式资源只能加载当前域名下的资源。这样子可以避免外部恶意的脚本的加载和执行。

一般会用下面的CSP配置：
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';style-src 'self' 'unsafe-inline'">
```
4. 针对特殊场景，选择性过滤XSS标签
在项目中，XSS的安全漏洞很容易出现，例如在聊天模块和富文本模块很容易出现。

有时候你想实现富文本编辑器里编辑html内容的业务。可是又担心XSS恶意脚本的注入。此时可以使用一个xss工具。网址：https://github.com/leizongmin/js-xss。

## 相关文章
* [Vue安全](https://v2.cn.vuejs.org/v2/guide/security.html)
* [前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
* [前端安全系列（二）：如何防止CSRF攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)





