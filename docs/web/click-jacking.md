# 点击劫持
点击劫持（Click Jacking）是一种视觉上的欺骗手段，攻击者通过使用一个透明的iframe，覆盖在一个网页上，然后诱使用户在该页面上进行操作，通过调整iframe页面的位置，可以使得伪造的页面恰好和iframe里受害页面里一些功能重合（按钮），以达到窃取用户信息或者劫持用户操作的目的。

![](/web/3.png)

点击劫持它是由用户亲手操作的，但是用户不知情，它如果被嵌入的是银行的网站，那就有可能盗取用户资金，去做转账和消费。也能获取用户敏感信息。

## 点击劫持防御
* javascript禁止内嵌：点击劫持前提是目标网站会被iframe嵌入到自己网站中，那么我们可以使用javascript禁止内嵌，判断`top.location===window.location`，如果不等于则将`top.location = window.location`。
* X-FRAME-OPTIONS禁止内嵌：浏览器提供了X-FRAME-OPTIONS这样的HTTP头，X-Frame-Options可以说是为了解决ClickJacking而生的，它有三个可选的值：DENY：浏览器会拒绝当前页面加载任何frame页面。SAMEORIGIN：frame页面的地址只能为同源域名下的页面。ALLOW-FROM origin：允许frame加载的页面地址；


