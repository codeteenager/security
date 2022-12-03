# 介绍
安全大致有两个方面的理解，一个是私密性，即你的资料不被非法获取和利用， 只有授权才可以访问。另一个是可靠性，即你的资料不会丢失不会损坏，也不会被篡改。

Web安全主要有以下几个层面的内容：
1. 代码层面，代码是安全的没有漏洞的。
2. 架构层面，Web设计的时候从架构层面避免安全风险，从根源上保障安全
3. 运维层面，开发完成后，在运营过程中保证项目不被入侵

关注的安全问题主要有：
* 用户的身份是否被盗用
* 用户的密码是否泄露，其他人能否能拿到你网站的密码
* 用户的资料是否被盗取，比如用户的手机号和身份证号
* 网站的数据库是否泄露，泄露后有什么样的后果

安全的重要性：
* Web安全是直面用户，挑战是很严峻的，用户可以直接访问你的网站，间接访问你网站的数据库，包括服务器
* 网站的安全和用户的安全都是Web的生命性
* 如果出现安全事故，则会威胁企业生产、口碑甚至是生存，可能会导致公司倒闭

Web 漏洞包含哪一些主流的漏洞类型，最佳的参考就是 [OWASP](http://www.owasp.org.cn/) Top 10，不过它在 2017 年之后就停止更新维护了。以下是当前的官方统计结果，按顺序排名。

1. 注入：SQL、NoSQL 数据库注入，还有命令注入和 LDAP 注入等。
2. 失效的身份认证和会话管理：比如攻击者破解密码、窃取密钥、会话令牌或其他漏洞去冒充他人的身份。
3. 跨站脚本（XSS）：XSS 允许攻击者在受害者的浏览器上执行恶意脚本，从而劫持用户会话、钓鱼欺骗等等。
4. 失效的访问控制：比如越权访问其他用户的个人资料、查看敏感文件、篡改数据等。
5. 安全配置错误：比如服务器的不安全配置，导致敏感信息泄露。
6. 敏感信息泄露：比如账号密码未加密存储、敏感数据传输时未加密保护，最终造成数据泄露。
7. 攻击检测与防护不足：比如 WAF、主机入侵检测等防御系统部署不全，这块偏向漏洞防御本身。
8. 跨站请求伪造（CSRF）：攻击者诱使其他登录用户访问恶意站点，以冒用对方的身份执行一些敏感操作。
9. 使用含有已知漏洞的组件：比如一些第三方的开源库、框架等，尤其是已公开漏洞的旧版本，比如名燥一声的 Struts2 漏洞，因频繁出现漏洞被许多开发者弃用。 
10. 未受有效保护的 API：比如浏览器和移动 App 中的 JavaScript API，常常因其提供的特殊功能未受有效保护而被滥用，造成不同等级的危害程度。

OWASP Top 10 也不完全属于具体的 Web 漏洞类型，比如第 7、9 点，但其他涉及的主流漏洞类型

## 网站推荐
* FreeBuf：https://www.freebuf.com
* 安全客：https://www.anquanke.com
* Seebug Paper：https://paper.seebug.org
* 安全 RSS 订阅：http://riusksk.me/media/riusksk_RSS_20190330.xml
* CTFTime Writeups：https://ctftime.org/writeups
* 安全脉搏：https://www.secpulse.com
* SecWiki：https://www.sec-wiki.com
* 玄武每日安全：https://sec.today/pulses
* 学术论文检索：https://arxiv.org/search/cs
* Exploit-db：https://www.exploit-db.com
* Github：https://github.com
* 信息安全知识库：https://vipread.com
* 先知社区：https://xz.aliyun.com

## 其他资料
* HackerOne Hacktivity：https://hackerone.com/hacktivity
* 乌云公开漏洞、知识库搜索：https://wooyun.x10sec.org
* 1000 个 PHP 代码审计案例：https://github.com/Xyntax/1000php
* 知道创宇研发技能表：https://blog.knownsec.com/Knownsec_RD_Checklist/index.html
* 网络安全从业者书单推荐：https://github.com/riusksk/secbook




  