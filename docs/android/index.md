# Android安全开发规范手册
## manifest文件安全
### 禁止PermissionGroup的属性为空
PermissionGroup可以对permission进行一个逻辑上的分组。如果PermissionGroup的属性为空，会导致权限定义无效，且其他app无法使用该权限。

#### 开发建议
设置PermissionGroup属性值或者不使用PermissionGroup。

###  系统权限确认
App如果使用一些系统限制权限，诸如android.permission.WRITE_SECURE_SETTINGS和android.permission.INSTALL_PACKAGES，则该app应该是设备自带的系统或google自带的app，并且应该放置在/system/app目录下。否则就是一个恶意app。
App使用下述权限，则该app有较高权限，要谨慎使用。

```xml
android.permission.MOUNT\_FORMAT\_FILESYSTEMS,
android.permission.MOUNT\_UNMOUNT\_FILESYSTEMS,
android.permission.RESTART\_PACKAGES。
```
#### 开发建议
根据业务需求，如非必要，移除该权限。

###  protectionLevel属性设置
由于对app的自定义permission的protectionLevel属性设置不当，会导致组件（如：content provider）数据泄露危险。最好的权限设置应为signature或signatureOrSystem，进而避免被第三方应用利用。

#### 开发建议
注意使用signature或signatureOrSystem防止其他app注册或接受该app的消息，提高安全性。

###  合理设置sharedUserId权限
通过sharedUserId，可以让拥有同一个User Id的多个apk运行在同一个进程中，互相访问任意资源。将sharedUserId设置为android.uid.system，可以把app放到系统进程中，app将获得极大的权限。如果app同时有master key漏洞，容易导致被root。

#### 开发建议
合理设置软件权限。

### 设置allowBackup为false
当这个标志被设置成true或不设置该标志位时，应用程序数据可以备份和恢复，adb调试备份允许恶意攻击者复制应用程序数据。

#### 开发建议
设置AndroidManifest.xml的android:allowBackup标志为false。
#### 影响范围
API >= 8

###  禁止Debuggable为true
在AndroidManifest.xml中定义Debuggable项，如果该项被打开，app存在被恶意程序调试的风险，可能导致泄露敏感信息等问题。

#### 开发建议
显示的设置AndroidManifest.xml的debuggable标志为false。
## 组件安全
### 合理设置导出Activity、activity-alias、service、receiver
Activity、activity-alias、service、receiver组件对外暴露会导致数据泄露和恶意的dos攻击。

#### 开发建议

1. 最小化组件暴露。对不会参与跨应用调用的组件添加android:exported=false属性。
2. 设置组件访问权限。对跨应用间调用的组件或者公开的receiver、service、activity和activity-alias设置权限，同时将权限的protectionLevel设置为signature或signatureOrSystem。
3. 组件传输数据验证。对组件之间，特别是跨应用的组件之间的数据传入与返回做验证和增加异常处理，防止恶意调试数据传入，更要防止敏感数据返回。

###  Contentprovider信息泄露风险
provider组件导出可能会带来信息泄露隐患。api level在17以下的所有应用的android:exported属性默认值为true,17及以上默认值为false。

#### 开发建议

1. 最小化组件暴露。对不会参与跨应用调用的组件添加android:exported=false属性。
2. 设置组件访问权限。对导出的provider组件设置权限，同时将权限的protectionLevel设置为signature或signatureOrSystem。
3. 由于Contentprovider无法在2（API-8）申明为私有。故建议将min sdk设为8以上。

#### 影响范围
api level在17以下的所有应用的android:exported属性默认值为true,17及以上默认值为false。

### 严格过滤openFile对uri访问
该漏洞由于Content provider组件暴露，没有对Content provider组件访问权限进行限制且对Uri路径没有进行过滤，攻击者通过Content provider实现的OpenFile接口进行攻击，如通过../的方式访问任意的目录文件，造成隐私泄露。

#### 开发建议

1. 将不必要导出的Content provider设置为不导出
2. 由于Android组件Content provider无法在Android 2.2（即API Level 8）系统上设为不导出，因此如果应用的Content provider不必要导出，阿里聚安全建议声明最低SDK版本为8以上版本；
3. 由于API level 在17以下的所有应用的android:exported属性默认值都为，因此如果应用的Content provider不必要导出，阿里聚安全建议显示设置注册的Content provider组件的android:exported属性为false；
4. 去除没有必要的penFile()接口
5. 如果应用的Content provider组件没有必要实现penFile()接口，阿里聚安全建议移除该Content provider的不必要的penFile()接口。
6. 过滤限制跨域访问，对访问的目标文件的路径进行有效判断
7. 使用decode()先对Content Query Uri进行解码后，再过滤如可通过../实现任意可读文件的访问的Uri字符串；
8. 设置权限来进行内部应用通过Content provider的数据共享
9. 使用签名验证来控制Content provider共享数据的访问权限，如设置protectionLevel=signature或signatureOrSystem；
10. 公开的content provider确保不存储敏感数据
11. 提供asset文件时注意权限保护

###  使用显式Intent 调用bindService()
创建隐式Intent 时，Android 系统通过将Intent 的内容与在设备上其他应用的清单文件中声明的Intent 过滤器进行比较，从而找到要启动的相应组件。如果Intent 与Intent 过滤器匹配，则系统将启动该组件，并将其传递给对象。如果多个Intent 过滤器兼容，则系统会显示一个对话框，支持用户选取要使用的应用。

为了确保应用的安全性，启动Service 时，请始终使用显式Intent，且不要为服务声明Intent 过滤器。使用隐式Intent 启动服务存在安全隐患，因为您无法确定哪些服务将响应Intent，且用户无法看到哪些服务已启动。从Android 5.0（API 级别21）开始，如果使用隐式Intent 调用bindService()，系统会抛出异常。

#### 开发建议
为了确保应用的安全性，启动 Service 时，请始终使用显式 Intent，且不要为服务声明 Intent 过滤器。使用隐式 Intent 启动服务存在安全隐患，因为您无法确定哪些服务将响应Intent，且用户无法看到哪些服务已启动。从 Android 5.0（API 级别 21）开始，如果使用隐式 Intent 调用 bindService()，系统会抛出异常。

#### 影响范围
全部。从Android 5.0（API 级别21）开始，如果使用隐式Intent 调用bindService()，系统会抛出异常。
###  合理处理Intent Scheme URL
Intent Scheme URI是一种特殊的URL格式，用来通过Web页面启动已安装应用的Activity组件，大多数主流浏览器都支持此功能。

Android Browser的攻击手段——Intent Scheme URLs攻击。这种攻击方式利用了浏览器保护措施的不足，通过浏览器作为桥梁间接实现Intend-Based攻击。相比于普通Intend-Based攻击，这种方式极具隐蔽性，

如果在app中，没有检查获取到的load_url的值，攻击者可以构造钓鱼网站，诱导用户点击加载，就可以盗取用户信息。所以，对Intent URI的处理不当时，就会导致基于Intent的攻击。

如果浏览器支持Intent Scheme URI语法，一般会分三个步骤进行处理：

1. 利用parseUri解析uri，获取原始的intent对象；
2. 对intent对象设置过滤规则；
3. 通过startActivityIfNeeded或者startActivity发送intent；其中步骤2起关键作用，过滤规则缺失或者存在缺陷都会导致Intent Schem URL攻击。

#### 关键点
`Intent.parseUri`函数，通过扫描出所有调用了`Intent.parseUri`方法的路径，并检测是否使用如下的策略。
比较安全的使用`Intent Scheme URI`方法是：

如果使用了`Intent.parseUri`函数，获取的intent必须严格过滤，intent至少包含addCategory(android.intent.category.BROWSABLE)，setComponent(null)，setSelector(null)3个策略。

所以，在检的时候只要根据Intent.parseUri函数返回的Intent对象有没有按照以下方式实现即可做出判断：
```java
// convert intent scheme URL to intent object

Intent intent = Intent.parseUri(uri);

 // forbid launching activities without BROWSABLE category

intent.addCategory(android.intent.category.BROWSABLE);

// forbid explicit call

intent.setComponent(null);

 // forbid intent with selector intent  intent.setSelector(null);

// start the activity by the intent

context.startActivityIfNeeded(intent, -1)
```
#### 开发建议
如果使用了Intent.parseUri函数，获取的intent必须严格过滤，intent至少包含addCategory(android.intent.category.BROWSABLE)，setComponent(null)，setSelector(null)3个策略。除了以上做法，最佳处理不要信任任何来自网页端的任何intent，为了安全起见，使用网页传过来的intent时，要进行过滤和检查

### 本地拒绝服务
Android系统提供了Activity、Service和Broadcast Receiver等组件，并提供了Intent机制来协助应用间的交互与通讯，Intent负责对应用中一次操作的动作、动作涉及数据、附加数据进行描述，Android系统则根据此Intent的描述，负责找到对应的组件，将Intent传递给调用的组件，并完成组件的调用。Android应用本地拒绝服务漏洞源于程序没有对Intent.GetXXXExtra()获取的异常或者畸形数据处理时没有进行异常捕获，从而导致攻击者可通过向受害者应用发送此类空数据、异常或者畸形数据来达到使该应用Crash的目的，简单的说就是攻击者通过Intent发送空数据、异常或畸形数据给受害者应用，导致其崩溃。

对导出的组件传递一个不存在的序列化对象，若没有try...catch捕获异常就会崩溃
```java
ComponentName cn = new ComponentName(com.test, com.test.TargetActivity)

Intent i = new Intent()

i.setComponentName(cn)

i.putExtra(key, new CustomSeriable())

startActivity(i)

**public class DataSchema implements Serializable {**

        public DataSchema() {

                super();

        }

}
```
### NullPointerException 异常导致的拒绝服务
源于程序没有对getAction()等获取到的数据进行空指针判断，从而导致了空指针异常导致应用崩溃
#### 风险代码：
```java
Intent i = new Intent();

if (i.getAction().equals(TestForNullPointerException)) {

    Log.d(TAG, Test for Android Refuse Service Bug);

}
```

### ClassCastException 异常导致的拒绝服务
源于程序没有对getSerializableExtra()等获取到的数据进行类型判断而进行强制类型转换，从而导致类型转换异常导致拒绝服务漏洞

#### 风险代码：
```java
Intent i = getIntent();

String test = (String) i.getSerializableExtra(serializable\_key);

**IndexOutOfBoundsException 异常导致拒绝服务漏洞**
```
源于程序没有对getIntegerArrayListExtra()等获取到的数据数组元素大小判断，导致数组访问越界而造成拒绝服务漏洞
#### 风险代码：
```java
Intent intent = getIntent();

ArrayList<Integer> intArray = intent.getIntegerArrayListExtra(user\_id);

if (intArray != null) {

    for (int i = 0; i < 10; i++) {

        intArray.get(i);

    }

}
```
### ClassNotFoundException 异常导致的拒绝服务漏洞
```java
Intent i = getIntent();

getSerializableExtra(key);
```

#### 开发建议

将比不要导出的组建设置为不导出

在处理Intent数据时，进行捕获异常，通过getXXXExtra()获取的数据时进行以下判断，以及用try catch方式捕获所有异常，防止出现拒绝服务漏洞，包括：空指针异常、类型转换异常、数组越界访问异常、类未定义异常、其他异常

```java
try{

    ....

xxx.getXXXExtra()

....

}Catch Exception{

**   **  **// 为空即可**

}
```

### 合理定义android.intent.category.BROWSABLE
在AndroidManifest文件中定义了android.intent.category.BROWSABLE属性的组件，可以通过浏览器唤起，这会导致远程命令执行漏洞攻击

#### 开发建议

1. APP中任何接收外部输入数据的地方都是潜在的攻击点，过滤检查来自网页的参数
2. 不要通过网页传输敏感信息，有的网站为了引导已经登录的用户到APP上使用，会使用脚本动态的生成URL Scheme的参数，其中包括了用户名、密码或者登录态token等敏感信息，让用户打开APP直接就登录了。恶意应用也可以注册相同的URL Sechme来截取这些敏感信息。Android系统会让用户选择使用哪个应用打开链接，但是如果用户不注意，就会使用恶意应用打开，导致敏感信息泄露或者其他风险。

###  删除Debug和Test信息
一些app在正式发布前，为了方便调试app，都会在app里集成一些调试或测试界面。这些测试界面可能包含敏感的信息。

#### 开发建议
在正式发布前移除所有的测试组件
###  Intent不安全反射风险
通过Intent接收的Extra参数来构造反射对象会导致从不受信任的源加载类。攻击者可以通过巧妙地构造达到加载其它类的目的
两个关键函数，分别是：getIntent()和Class.forName(....)
```java
public class SecondActivity extends Activity {

        @Override

            protected void onCreate(Bundle savedInstanceState) {

                super.onCreate(savedInstanceState);

                setContentView(R.layout.activity\_second);

                Intent intent = getIntent();

                String className = intent.getStringExtra(className);

                String methodName = intent.getStringExtra(methodName);

                try {

                        Class<?> clz = null;

                        clz = Class.forName(className);

                        Date object = (Date) clz.newInstance();

                        Method method = clz.getMethod(methodName);

                        Toast.makeText(getApplicationContext(), method.invoke(object, null) + ======, Toast.LENGTH\_LONG).show();

                } catch (Exception e) {

                        e.printStackTrace();

                }

        }

}
```

逆向后对应的smali代码如下：
```java
invoke-virtual {p0}, Lcom/bug/intent/reflection/SecondActivity;->getIntent()Landroid/content/Intent;

invoke-static {v0}, Ljava/lang/Class;->forName(Ljava/lang/String;)Ljava/lang/Class;
```

#### 开发建议

1. 不要通过Intent接收的Extra传播的反射函数
2. 将接受反射的组件设置为非导出组件

## webview组件安全
###  WebView远程执行漏洞
和WebView远程代码执行相关的漏洞主要有CVE-2012-6336,CVE-2014-1939,CVE-2014-7224, 这些漏洞中最核心的漏洞是CVE-2012-6336，另外两个CVE只是发现了几个默认存在的接口。

Android API < 17之前版本存在远程代码执行安全漏洞，该漏洞源于程序没有正确限制使用addJavaScriptInterface(CVE-2012-6636)方法，攻击者可以通过Java反射利用该漏洞执行任意Java对象的方法，导致远程代码执行安全漏洞除。
#### 开发建议
1. API等于高于17的Android系统。出于安全考虑，为了防止Java层的函数被随意调用，Google在2版本之后，规定允许被调用的函数必须以@JavascriptInterface进行注解。
2. API等于高于17的Android系统。建议不要使用addJavascriptInterface接口，以免带来不必要的安全隐患，如果一定要使用该接口：
3. 如果使用https协议加载url，应用进行证书校验防止访问的页面被篡改挂马
4. 如果使用http协议加载url，应进行白名单过滤、完整性校验等防止访问的页面被篡改
5. 如果加载本地html，应将html文件内置在apk中，以及进行对html页面完整性的校验
6. 使用removeJavascriptInterface移除Android系统内部的默认内置接口：searchBoxJavaBridge_、accessibility、accessibilityTraversal

#### 范围：
* CVE-2012-6636

Android API 16.0及之前的版本中存在安全漏洞，该漏洞源于程序没有正确限制使用WebView.addJavascriptInterface方法。远程攻击者可通过使用Java Reflection API利用该漏洞执行任意Java对象的方法
Google Android <= 4.1.2 (API level 16) 受到此漏洞的影响。
* CVE-2014-1939

java/android/webkit/BrowserFrame.java
使用addJavascriptInterface API并创建了SearchBoxImpl类的对象。攻击者可通过访问searchBoxJavaBridge_接口利用该漏洞执行任意Java代码。

Google Android <= 4.3.1 受到此漏洞的影响
* CVE-2014-7224

香港理工大学的研究人员发现当系统辅助功能中的任意一项服务被开启后，所有由系统提供的WebView都会被加入两个JS objects，分别为是accessibility和accessibilityTraversal。恶意攻击者就可以使用accessibility和accessibilityTraversal这两个Java Bridge来执行远程攻击代码.

Google Android < 4.4 受到此漏洞的影响。

### WebView潜在XSS攻击
允许WebView执行JavaScript(setJavaScriptEnabled)，有可能导致XSS攻击。

#### 开发建议
应尽量避免使用。如果一定要使用：
1. API等于高高于17的Android系统。出于安全考虑，为了防止Java层的函数被随意调用，Google在2版本之后，规定允许被调用的函数必须以@JavascriptInterface进行注解。
2. API等于高高于17的Android系统。建议不要使用addJavascriptInterface接口，一面带来不必要的安全隐患，如果一定要使用该接口：
3. 如果使用https协议加载url，应用进行证书校验防止访问的页面被篡改挂马
4. 如果使用http协议加载url，应进行白名单过滤、完整性校验等防止访问的页面被篡改
5. 如果加载本地html，应将html文件内置在apk中，以及进行对html页面完整性的校验
6. 使用removeJavascriptInterface移除Android系统内部的默认内置接口：searchBoxJavaBridge_、accessibility、accessibilityTraversal

#### 影响范围
Android api <17

###  WebView File域同源策略绕过
应用程序一旦使用WebView并支持File域，就会受到该漏洞的攻击。该漏洞源于：JavaScript的延时执行能够绕过file协议的同源检查，并能够访问受害应用的所有私有文件，即通过WebView对Javascript的延时执行和将当前Html文件删除掉并软连接指向其他文件就可以读取到被符号链接所指的文件，然后通过JavaScript再次读取HTML文件，即可获取到被符号链接所指的文件。

大多数使用WebView的应用都会受到该漏洞的影响，恶意应用通过该漏洞，可在无特殊权限下盗取应用的任意私有文件，尤其是浏览器，可通过利用该漏洞，获取到浏览器所保存的密码、Cookie、收藏夹以及历史记录等敏感信息，从而造成敏感信息泄露。

#### 开发建议

1. 将不必要导出的组件设置为不导出

如果应用的组件不必要导出，建议显式设置所注册组件的android:exported属性为false；

2. 如果需要导出组件，禁止使用File域

如果应用的需要导出包含WebView的组件，建议禁止使用File域协议：

myWebView.getSettings. setAllowFileAccess(false);

3. 如果需要使用File协议，禁止File协议调用JavaScript

如果应用的WebView需要使用File域协议，建议禁止File域协议调用JavaScript：

myWebView.getSettings. setJavaScriptEnabled(false);

###  禁止webview密码明文存储
webview的保存密码功能默认设置为true。Webview会明文保存网站上的密码到本地私有文件databases/webview.db中。对于可以被root的系统环境或者配合其他漏洞（如webview的同源绕过漏洞），攻击者可以获取到用户密码。

#### 开发建议
显示设置webView.getSetting().setSavePassword(false)

###  主机名弱校验漏洞
自定义HostnameVerifier类，却不实现verify方法验证域名，导致中间人攻击漏洞。

#### 开发建议
自定义HostnameVerifier类并实现verify方法验证域名。

###  证书弱校验漏洞
App在实现X509TrustManager时，默认覆盖google默认的证书检查机制方法：checkClientTrusted、checkServerTrusted和getAcceptedIssuers，会导致中间人攻击漏洞。

#### 开发建议
如果自己创建X509Certificate，则在覆盖checkClientTrusted、checkServerTrusted和getAcceptedIssuers后要进行校验。

###  中间人攻击漏洞
App调用setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER)，信任所有主机名，会导致中间人攻击。

#### 开发建议
查找所有设置了ALLOW_ALL_HOSTNAME_VERIFIER字段属性的方法路径；对信任的主机严格认证

### WebView不校验证书漏洞
Android WebView组件加载网页发生证书认证错误时，会调用WebViewClient类的onReceivedSslError方法，如果该方法实现调用了handler.proceed()来忽略该证书错误，则会受到中间人攻击的威胁，可能导致隐私泄露。

自定义实现的WebViewClient类在onReceivedSslError是否调用proceed()方法。
#### 开发建议
当发生证书认证错误时，采用默认的处理方法handler.cancel()，停止加载问题页面当发生证书认证错误时，采用默认的处理方法handler.cancel()，停止加载问题页面

### WebView组件系统隐藏接口未移除
android webview组件包含3个隐藏的系统接口：searchBoxJavaBridge_,accessibilityTraversal以及accessibility，恶意程序可以利用它们实现远程代码执行。

#### 风险代码：
```java
const-string v3, searchBoxJavaBridge\_

invoke-virtual {v1, v3}, Landroid/webkit/WebView;->removeJavascriptInterface(Ljava/lang/String;)V

const-string v3, accessibility

invoke-virtual {v1, v3}, Landroid/webkit/WebView;->removeJavascriptInterface(Ljava/lang/String;)V

const-string v3, accessibilityTraversal

invoke-virtual {v1, v3}, Landroid/webkit/WebView;->removeJavascriptInterface(Ljava/lang/String;)V
```

#### 开发建议
使用了WebView，那么使用WebView.removeJavascriptInterface(String name) API，显示的移除searchBoxJavaBridge_、accessibility、accessibilityTraversal这三个接口

#### 影响范围
4.0~4.4(不包含)

## sqlite安全
### SQLite sql注入漏洞
SQLite做为android平台的数据库，对于数据库查询，如果开发者采用字符串链接方式构造sql语句，就会产生sql注入。

#### 开发建议
1. provider不需要导出，请将export属性设置为false
2. 若导出仅为内部通信使用，则设置protectionLevel=signature
3. 不直接使用传入的查询语句用于projection和selection，使用由query绑定的参数selectionArgs
4. 完备的SQL注入语句检测逻辑

### Databases任意读写漏洞
APP在使用openOrCreateDatabase创建数据库时，将数据库设置了全局的可读权限，攻击者恶意读取数据库内容，获取敏感信息。在设置数据库属性时如果设置全局可写，攻击者可能会篡改、伪造内容，可以能会进行诈骗等行为，造成用户财产损失。

#### 开发建议
1. 用MODE_PRIVATE模式创建数据库
2. 使用sqlcipher等工具加密数据库
3. 避免在数据库中存储明文和敏感信息

## 网络通信安全
###  SSL不安全组件
SSLCertificateSocketFactory#getInsecure方法无法执行SSL验证检查，使得网络通信遭受中间人攻击。

#### 开发建议
移除SSLCertificateSocketFactory#getInsecure方法。

###  HttpHost安全
HttpHost target = new HttpHost(uri.getHost(), uri.getPort(), HttpHost.DEFAULT_SCHEME_NAME);
HttpHost.DEFAULT_SCHEME_NAME默认是http，不安全。

#### 开发建议
改成使用https
###  HttpURLConnection漏洞
在Android 2.2版本之前，HttpURLConnection一直存在着一些令人厌烦的bug。比如说对一个可读的InputStream调用close()方法时，就有可能会导致连接池失效了。

#### 开发建议
判断Android版本，并设置http.keepAlive为false。
```java
private void disableConnectionReuseIfNecessary() {

        // Work around pre-Froyo bugs in HTTP connection reuse.

        if (Integer.parseInt(Build.VERSION.SDK) < Build.VERSION\_CODES.FROYO) {

                System.setProperty(http.keepAlive, false);

        }

}
```
#### 影响范围
2.2版本之前

## 弱加密风险检测
### 禁止使用弱加密算法
安全性要求高的应用程序必须避免使用不安全的或者强度弱的加密算法，现代计算机的计算能力使得攻击者通过暴力破解可以攻破强度弱的算法。例如，数据加密标准算法DES(密钥默认是56位长度、算法半公开、迭代次数少)是极度不安全的，使用类似EFF（Electronic Frontier Foundaton）Deep Crack的计算机在一天内可以暴力破解由DES加密的消息。

使用DES弱加密算法，样例
#### 风险代码：
```java
SecretKeySpec key = new SecretKeySpec(rawKeyData, DES);

Cipher cipher = Cipher.getInstance(DES/ECB/PKCS5Padding);

cipher.init(Cipher.DECRYPT\_MODE, key);
```

#### 开发建议
建议使用安全性更高的AES加密算法

### 不安全的密钥长度风险
在使用RSA加密时，密钥长度小于512bit，小于512bit的密钥很容易被破解，计算出密钥。

#### 风险代码：
```java
public static KeyPair getRSAKey() throws NoSuchAlgorithmException {

        KeyPairGenerator keyGen = KeyPairGenerator.getInstance(RSA);

        keyGen.initialize(512);

        KeyPair key = keyGen.generateKeyPair();

        return key;

      }
```
#### 开发建议
使用RSA加密时，建议密钥长度大于1024bit

### AES/DES弱加密风险（ECB）
AES的ECB加密模式容易遭到字典攻击，安全性不够。

#### 风险代码：
```java
SecretKeySpec key = new SecretKeySpec(keyBytes, AES);

**Cipher cipher = Cipher.getInstance(AES/ECB/PKCS7Padding, BC);**

cipher.init(Cipher.ENCRYPT\_MODE, key);
```

#### 开发建议
避免使用ECB模式，建议使用CBC。

### IVParameterSpec不安全初始化向量
使用IVParameterSpec函数，如果使用了固定的初始化向量，那么密码文本可预测性高得多，容易受到字典攻击等。
#### 风险代码：
```java
byte[] iv = { 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00 };

IvParameterSpec ips = new IvParameterSpec(iv)
```
#### 开发建议
IVParameterSpec初始化时，不使用常量vector。
###  RSA中不使用Padding风险
使用RSA公钥时通常会绑定一个padding，原因是为了防止一些依赖于no padding时对RSA算法的攻击。
#### 风险代码：
```java
Cipher rsa = null;

try {

  rsa = javax.crypto.Cipher.getInstance(RSA/NONE/NoPadding);

}catch (java.security.NoSuchAlgorithmException e) {}

catch (javax.crypto.NoSuchPaddingException e) {}

SecretKeySpec key = new SecretKeySpec(rawKeyData, RSA);

Cipher cipher = Cipher.getInstance(RSA/NONE/NoPadding);

cipher.init(Cipher.DECRYPT\_MODE, key);
```

#### 开发建议
建议使用Padding模式。
###  KeyStore弱密码风险
keytool是一个Java数据证书的管理工具，Keytool将密钥(key，私钥和公钥配对)和证书(certificates)存在一个称为keystore的文件中，并通过密码保护keystore中的密钥。如果密码设置过于简单，例如：123456、android等，则会导致keystore文件的私钥泄露，从而导致一系列的信息泄露风险。

#### 开发建议
提高keystore保护密码的强度
## 数据安全
###  剪贴板敏感信息泄露风险
由于Android剪贴板的内容向任何权限的app开放，很容易就被嗅探泄密。同一部手机中安装的其他app，甚至是一些权限不高的app，都可以通过剪贴板功能获取剪贴板中的敏感信息。

#### 风险代码：
```java
clipBtn = (Button) findViewById(R.id.btn\_clip);

        clipBtn.setOnClickListener(new OnClickListener() {

            @Override

            public void onClick(View v) {

                ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD\_SERVICE);

                ClipData clip1 = ClipData.newPlainText(label,password=123456);

                clipboard.setPrimaryClip(clip1);

            }

        });
```
#### 开发建议
避免使用剪贴板敏文存储敏感信息或进行加密

### 密钥硬编码风险
在代码中禁止硬编码私钥等敏感信息，攻击者反编译代码，即可拿到。

### Intent敏感数据泄露
APP创建Intent传递数据到其他Activity，如果创建的Activity不是在同一个Task中打开，就很可能被其他的Activity劫持读取到Intent内容，跨Task的Activity通过Intent传递敏感信息是不安全的。

#### 开发建议
尽量避免使用包含FLAG_ACTIVITY_NEW_TASK标志的Intent来传递敏感信息。

### PendingIntent误用风险
使用pendingIntent时候，如果使用了一个空Intent，会导致恶意用户劫持Intent的内容。禁止使用空intent去构造pendingIntent。

#### 开发建议
禁止使用空intent去构造pendingIntent。
###  数据或程序(DEX、SO)加载、删除检查
程序在加载外部dex、so文件是否判断文件来源、是否存放可信区域；程序删除文件是否可篡改文件路劲

1. 是否加载公共区域程序，如sdcard、/data/local/tmp/、应用自创建但其他应用有读写权限的目录上
2. 是否从网络下载，检测方法包括：阅读代码、监听网路请求、见识存储区域文件读写、查看安装包
3. 升级包是否存在公共区域存储。

###  文件全局读写漏洞
在使用getDir、getSharedPreferences(SharedPreference)或openFileOutput时，如果设置了全局的可读权限，攻击者恶意读取文件内容，获取敏感信息。在设置文件属性时如果设置全局可写，攻击者可能会篡改、伪造内容，可能会进行诈骗等行为，造成用户财产损失。其中getSharedPreferences如果设置全局写权限，则当攻击app跟被攻击app具有相同的Android:sharedUserId属性时和签名时，攻击app则可以访问到内部存储文件进行写入操作。

#### 开发建议

1. 使用MODE_PRIVATE模式创建内部存储文件
2. 加密存储敏感数据
3. 避免在文件中存储明文敏感信息
4. 避免滥用Android:sharedUserId属性

如果两个appAndroid:sharedUserId属性相同，切使用的签名也相同，则这两个app可以互相访问内部存储文件数据

###  日志泄露风险
在APP的开发过程中，为了方便调试，通常会使用log函数输出一些关键流程的信息，这些信息中通常会包含敏感内容，如执行流程、明文的用户名密码等，这会让攻击者更加容易的了解APP内部结构方便破解和攻击，甚至直接获取到有价值的敏感信息。

#### 开发建议
禁止打印敏感信息

## 其他风险
###  谨慎使用高风险函数
在程序需要执行系统命令等函数，需要谨慎使用，严格控制命令来源，防止黑客替换命令攻击。

#### 风险代码：
```java
Example Java code:

  Runtime rr = Runtime.getRuntime();

  Process p = rr.exec(ls -al);

Example Bytecode code:

  const-string v2, ls -al

  invoke-virtual {v1, v2}, Ljava/lang/Runtime;->exec(Ljava/lang/String;)Ljava/lang/Process;
```
#### 开发建议
严格按照要求使用

### Fragment注入漏洞(CVE-2013-6271)
在api level 小于19的app，所有继承了PreferenceActivity类的activity并将该类置为exported的应用都受到Fragment注入漏洞的威胁。

Google在Android 4.4 KitKat 里面修正了该问题，引入了PreferenceActivity.isValidFragment函数，要求用户重写该函数验证Fragment来源正确性。

#### 开发建议

1. 当Android api >=19时，要覆盖每一个PreferenceActivity类下的isValidFragment方法以避免异常抛出；
2. 当Android api < 19时，如果在PreferenceActivity内没有引用任何fragment，建议覆盖isValidFragment并返回false

#### 影响范围
小于Android 4.4（API level 19）
### SQLite数据库日志泄露漏洞(CVE-2011-3901)
Android SQLite数据库journal文件可被所有应用程序读取，所有目录对应程序数据库目录拥有执行权限，意味着应用程序数据目录全局访问，/data/data//databases目录以[rwxrwx--x]权限创建，可导致全局读写。数据库目录下创建的journal文件以[-rw-r--r--]权限创建，可被所有app读取。

#### 开发建议
升级到Android4.0.1以上版本或者使用SQLCipher或其他库加密数据库和日志信息。
#### 影响范围
Android2.3.7版本存在该漏洞，其他版本可能也受到影响，4.0.1不受影响
###  随机数生成漏洞
SecureRandom的使用不当会导致生成的随机数可被预测，该漏洞存在于Android系统随机生成数字串安全密钥的环节中。该漏洞的生成原因是对SecureRandom类的不正确使用方式导致生成的随机数不随机。

#### 风险代码：
```java
SecureRandom secureRandom = new SecureRandom();

        byte[] b = new byte[] { (byte) 1 };

        secureRandom.setSeed(b);

        // Prior to Android 4.2, the next line would always return the same number!

        Log.v(wgc,-------------------------------);

        Log.v(wgc,Test1: + secureRandom.nextInt());

        SecureRandom secureRandom2 = new SecureRandom(new byte[] { (byte) 1 });

        Log.v(wgc,Test2: + secureRandom2.nextInt());

        SecureRandom secureRandom3 = new SecureRandom();

        secureRandom3.setSeed(10L);

        Log.v(wgc,Test3: + secureRandom3.nextInt())

        SecureRandom secureRandom4 = new SecureRandom();

        secureRandom4.nextBytes(b);

        secureRandom4.setSeed(10L);

        Log.v(wgc,Test4: + secureRandom4.nextInt());

        SecureRandom secureRandom5 = new SecureRandom();

        Log.v(wgc,Test5: + secureRandom4.nextInt());
```

#### 开发建议

1. 不要使用自定义随机源代替系统默认随机源（推荐）除非有特殊需求，在使用SecureRandom类时，不要调用以下函数:SecureRandom类下SecureRandom(byte[]seed)、setSeed(long seed)和setSeed(byte[]seed)方法。
2. 在调用setSeed方法前先调用任意nextXXX方法。具体做法是调用setSeed方法前先调用一次SecureRandom#nextBytes(byte[]bytes)方法，可以避免默认随机源被替代，详细见参考资料。

#### 影响范围
Android 4.2之前，Android API 17以后SecureRandom的默认实现方式从Cipher.RSA换到了OpenSSL。SecureRandom新的实现方式不能将自己的seed替换掉系统的seed。

### 发布版本需加固
发布的软件，应对app进行加固，防止攻击者获取app代码、业务逻辑、API接口等，对业务和公司声誉造成一定影响，防止app被破解二次打包，导致损失。
#### 开发建议 
APP加固
