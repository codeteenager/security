# sql注入
SQL 注入产生的原因是由于开发对用户的输入数据未做有效过滤，直接引用 SQL 语句执行，导致原本的数据被当作 SQL 语句执行。通常来说，SQL 注入分为数字型和字符型注入，我们主要通过注入参数类型来判断。

它和xss攻击有点像，数据变成了程序。
例如：
```sql
select * from table where id = ${id};
//用户传入的id为 1 or 1 = 1，最终sql为select * from table where id =  1 or 1 = 1 这就形成了sql注入
```

## sql注入的危害
* 猜解密码
* 获取数据
* 删库删表
* 拖库

## sql注入防御
* 关闭错误输出，不要将sql错误返回给浏览器
* 检查数据类型
* 对数据进行转义 
* 使用参数化查询
* 使用ORM(对象关系映射)