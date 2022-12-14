# 密码安全

密码的作用主要在于比对，将输入的密码与存储的密码进行比对。密码存储一般存储在数据库。

## 密码的泄露
密码的泄露主要包括以下几个方面：
* 数据库被偷
* 服务器被入侵
* 通讯过程被窃听
* 内部人员泄露数据

## 密码的存储
* 严禁密码的明文存储(防泄漏)
* 单向变换(防泄漏)，每一个密码对应一个密文，密文跟原文不同，而且拿到密文无法获取到原文。
* 变换负责度要求(防猜解)，虽然无法通过密文拿到原文，但是如果是简单的123456密码，可能会有数据库存储原文和相对应的密文，查询会找到对应的原文。
* 密码复杂度要求(防猜解)
* 加盐(防猜解)

## 哈希算法(信息摘要算法)
它是指根据一段信息从中提取它的特征摘要，他有几个特征：
* 明文和密文一一对应
* 雪崩效应，只要原文有一点点不一样，那么它的密文就完全不一样
* 密文到原文无法反推的
* 密文是固定长度的，一般是32位字符串
* 常见哈希算法：md5、sha1、sha256

常用密码加密方式：md5(明文)、md5(md5(明文))、md5(sha1(明文))、md5(sha256(sha1(明文)))

提高密码复杂度保障安全：例如用复杂密码对抗彩虹表，如果密码简单可以使用加盐帮助用户增加复杂度，然后再变换。

## 密码传输的安全性
保障传输过程中的安全时，主要考虑三点：
1. 传输过程很容易被人探测并分析，因此在传输过程中密码必须加密传输，避免形成中间人攻击
2. 采用HTTPS传输加密，普通的 HTTPS 有单向认证与双向认证两种情况：其中单向认证的特点是仅用户端按照密钥要求进行加密后传输，服务器端并不针对用户端进行校验。这样容易导致利用SSL劫持方式窃取到密码，双向 HTTPS 认证会在服务器及用户端处均进行认证，这样可避免传输过程中以 SSL 剥离的方式对内容进行抓取。

## 密码的暴力破解
暴力破解就是利用数学领域的穷举法实现对信息的破解，简单来说就是将密码进行逐个推算直到找出真正的密码为止。

针对用户名／密码可被爆破的问题，有效的解决手段有以下几种：
1. 限制用户名／密码验证速率
2. 连续三次输入错误后采用验证码等手段进行限制
3. 提升用户密码强度及位数(例如使用大写、小写、特殊字符、数字中至少3种，并且要求密码长度在8位以上)
4. 定期修改密码


## 解密工具
彩虹表
* https://www.cmd5.com/
* http://www.xmd5.com/


