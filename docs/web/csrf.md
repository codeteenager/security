# CSRF
CSRF(Cross Site Request Forgery，跨站请求伪造，也叫 XSRF)，漏洞是由于未校验请求来源，导致攻击者可在第三方站点发起 HTTP 请求，并以受害者的目标网站登录态（cookie、session 等）请求，从而执行一些敏感的业务功能操作，比如更改密码、修改个人资料、关注好友。

## CSRF攻击原理
![](/web/2.png)
它的危害主要包括利用用户的登录态，而且用户并不知情，它可以完成业务请求，盗取用户资金(转账、消费)，甚至冒充用户发帖背锅。

## Cookies
Cookies它是前端的数据存储，它的数据存储在浏览器中，后端可以通过http头来设置Cookies的值，当发送请求时，浏览器在请求头中会带上相对应的Cookies，也就是在请求和响应中都会有Cookies。前端也可以通过JS来读写Cookies，它也遵守同源策略，只有同源的情况下才可以读写。

### Cookies的特性
1. 不同的域名下，Cookies是不能够混用的，只能够使用自己域名下的Cookies
2. 每个Cookies都有一个有效期，这个有效期决定Cookies多长时间内有效，一旦超过这个有效期，这个Cookies就会失效
3. 路径决定了Cookies作用于网站的哪一级，具体就是url上的层级，比如我可以为不同的url设置不同的层级，只有当这个层级的页面被访问的时候，这个层级的Cookies才可以被使用，如果是其他页面访问，则看不到该Cookies。
4. Cookies只可以被HTTP协议所使用，还可以通过JS来读写Cookies。
5. Cookies有secure，表示是否只能在HTTPS请求中使用。

### Cookies的作用
* 将个性化的设置存储在Cookies中
* 存储未登录时用户的唯一标识，生成唯一标识，区分未登录用户
* 存储已登录用户的凭证
* 存储其他业务数据

### 登录用户凭证
流程是前端提交用户名和密码，后端验证用户名和密码，后端通过http头设置用户凭证，后续访问时后端先验证用户凭证。
* 用户ID，登录后，提供一个用户ID返回给前端，将用户ID存放在Cookies中发送给后端
* 用户ID + 签名，将用户ID和ID的签名存放在Cookies中发送给后端进行校验
* SessionId，Cookies不存放用户数据，而存放SessionId随机字符串，将后端返回的SessionId存储到Cookies中发送到后端，然后通过SessionId获取用户信息

### XSS和Cookies的关系
XSS可能偷取Cookies，获取用户登录态，进而模拟用户登录。用http-only的Cookie不会被偷。

### CSRF和Cookies的关系
CSRF利用了用户的Cookies，当CSRF发起请求时带上了用户的Cookies，但是攻击站点是无法读取Cookies的，那么这时候就可以通过验证码和CSRF Token来防止CSRF。当然最好能阻止第三方网站使用Cookies，使用same-site但是兼容性不好。

### Cookies安全策略
* 签名防篡改
* 私有变换(加密)
* http-only(防止XSS)，只有http请求读取cookies，而js不能读取
* secure，只有在Https请求中才可以读取cookies
* same-site(防止CSRF)，兼容性不好

## CSRF攻击防御
* 由于是第三方网站带目标网站的cookie进行访问，导致用户身份被利用，那么可以禁止第三方网站携带cookie，使用same-site来管理cookie，目前只有chrome支持。
* 在前端页面加入验证信息，例如图形验证码，每一次都是随机的。加入token随机字符串，在提交请求的时候必须要带上token信息，才可以提交成功。不经过指定网站的页面获取不到这些验证信息。
* 验证referer，referer是HTTP协议的请求头，它包含了该请求是哪里这个信息，我们可以验证referer来禁止来自第三方网站的请求。