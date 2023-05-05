import{_ as n,c as l,C as s,t as p,V as a,o}from"./chunks/framework.1f99f08c.js";const e="/security/web/1.png",b=JSON.parse('{"title":"XSS","description":"","frontmatter":{},"headers":[],"relativePath":"web/xss.md","filePath":"web/xss.md","lastUpdated":1683282608000}'),t={name:"web/xss.md"},r=a('<h1 id="xss" tabindex="-1">XSS <a class="header-anchor" href="#xss" aria-label="Permalink to &quot;XSS&quot;">​</a></h1><p>XSS 即（Cross Site Scripting）中文名称为：跨站脚本攻击，按理应该简称为 CSS，但为了与层叠样式表（CSS）区分开，特意改为 XSS 。</p><p>XSS 漏洞，通常指的是网站对用户输入数据未做有效过滤，攻击者可以将恶意脚本注入网站页面中，达到执行恶意代码的目的。攻击者只需要诱使受害者打开特定的网址，就可以在受害者的浏览器中执行被注入的恶意代码，从而窃取用户身份，执行一些敏感操作，或是进行其他的危害行为。</p><h2 id="xss攻击原理" tabindex="-1">XSS攻击原理 <a class="header-anchor" href="#xss攻击原理" aria-label="Permalink to &quot;XSS攻击原理&quot;">​</a></h2><p>程序+数据=结果，然而当我们数据中包含程序的时候，结果就会改变了。 <img src="'+e+`" alt=""></p><h2 id="scripting脚本能干啥" tabindex="-1">Scripting脚本能干啥 <a class="header-anchor" href="#scripting脚本能干啥" aria-label="Permalink to &quot;Scripting脚本能干啥&quot;">​</a></h2><ol><li>获取页面数据，通过DOM节点拿到页面的数据</li><li>获取Cookies，通过document.cookies来获取cookie的内容</li><li>劫持前端逻辑，比如将某个按钮的点击事件更换</li><li>发送请求，页面中的脚本可以发送服务器请求，这样实现资料的盗取</li><li>偷取网站任意数据，用户资料，用户密码和登录态</li><li>欺骗用户</li></ol><h2 id="xss攻击分类" tabindex="-1">XSS攻击分类 <a class="header-anchor" href="#xss攻击分类" aria-label="Permalink to &quot;XSS攻击分类&quot;">​</a></h2><p>XSS攻击分类分为两种类型：</p><ul><li>反射型：反射型指的是url参数直接注入，网站不存在这样的代码，攻击者将这段代码从url带过来，然后页面直接显示这段代码，导致产生XSS攻击。</li><li>存储型：存储型攻击指的是代码存储到数据库中，然后其他用户读取这段代码，显示到页面上产生攻击。</li><li>DOM 型 XSS</li></ul><p>一般来说反射型攻击危害较小，更明显。</p><h2 id="xss攻击注入点" tabindex="-1">XSS攻击注入点 <a class="header-anchor" href="#xss攻击注入点" aria-label="Permalink to &quot;XSS攻击注入点&quot;">​</a></h2><ul><li>HTML节点内容：如果一个节点的内容是动态的，里面包含用户输入的信息，那么这个输入的信息可能包含脚本</li><li>HTML属性：HTML属性有可能是用户输入的数据组成的，这个属性可能包含脚本</li><li>JavaScript代码：代码包含后台注入的变量，或者包含用户输入的信息，有可能会改变JS代码的逻辑导致XSS攻击</li><li>富文本：是指一大段HTML格式文本，既要保留HTML格式，也要去除XSS攻击的代码</li></ul><h3 id="html节点内容" tabindex="-1">HTML节点内容 <a class="header-anchor" href="#html节点内容" aria-label="Permalink to &quot;HTML节点内容&quot;">​</a></h3><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #{content}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>以上的内容有可能会输出以下结果</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="html属性" tabindex="-1">HTML属性 <a class="header-anchor" href="#html属性" aria-label="Permalink to &quot;HTML属性&quot;">​</a></h3><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#{image}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onerror</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">alert</span><span style="color:#C3E88D;">(</span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="javascript代码" tabindex="-1">JavaScript代码 <a class="header-anchor" href="#javascript代码" aria-label="Permalink to &quot;JavaScript代码&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var data = &quot;#</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var data = &quot;hello&quot;;alert(1);&quot;&quot;; //可能会生成这样的</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="富文本" tabindex="-1">富文本 <a class="header-anchor" href="#富文本" aria-label="Permalink to &quot;富文本&quot;">​</a></h3><p>富文本需要保留HTML，HTML有XSS攻击风险，</p><h2 id="xss-漏洞挖掘" tabindex="-1">XSS 漏洞挖掘 <a class="header-anchor" href="#xss-漏洞挖掘" aria-label="Permalink to &quot;XSS 漏洞挖掘&quot;">​</a></h2><p>XSS 漏洞挖掘的方法可以按有无源码的情况分为黑盒测试和白盒测试。</p><ul><li>黑盒测试主要是通过发送特意构造攻击字符串来验证漏洞，比如 <code>&lt;script&gt; alert(1)&lt;/script&gt;</code>。请求后看是否会弹框，若会则代表存在 XSS，反之则不存在。</li><li>白盒测试是通过分析源代码来检测 XSS 漏洞，根据不同的编程语言采取不同的词法、语法分析方式，然后通过污点分析(追踪用户的输入数据是否达到特定的漏洞触发函数)的思路来检测漏洞。</li></ul><h2 id="xss防御" tabindex="-1">XSS防御 <a class="header-anchor" href="#xss防御" aria-label="Permalink to &quot;XSS防御&quot;">​</a></h2><ol><li><p>浏览器自带防御，X-XSS-Protection设置，它防御的是反射型的XSS 目前该属性被所有的主流浏览器默认开启XSS保护。该参数是设置在响应头中目的是用来防范XSS攻击的。它有如下几种配置： 值有如下几种：默认为1，0：禁用XSS保护。1：启用XSS保护。</p></li><li><p>字符的转义，转义<code>&lt;&amp;lt;</code>和<code>&gt;&amp;gt</code>，对于HTML节点内容，例如用户输入的评论，只希望是文字，并不希望是标签，那么久可以对字符进行转义成实体。</p></li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> escapeHtml </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&lt;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;lt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&gt;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&amp;gt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="3"><li>字符的转义，转义<code>&quot;&quot;</code>成<code>&amp;quto;</code>，对于HTML的属性需要做这类转义，避免新增新的属性。</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> escapeHtmlProperty </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&amp;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&amp;amp;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&amp;quto;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&amp;#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&amp;#32;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>JS的转义</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> escapeForJS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\\\\\\\</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="4"><li>富文本就是一大段的HTML，那么它的防御策略一般就是过滤，过滤的思路有两种，一种是按照黑名单、比如将<code>script</code>标签和onerror属性去除，一种是按照白名单保留部分标签和属性，比如只允许什么样的标签，以及标签的属性。黑名单的实现相对简单，按照正则表达式的实现过滤即可，但是HTML标签和属性较多，易容易产生漏洞。而白名单相对比较彻底，相对比较麻烦，他需要将将html解析成数据结构，然后对数据结构进行过滤，然后再组装成HTML。</li></ol><p>例如黑名单过滤处理：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> xssFilter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">html</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">&lt;\\s</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">\\/</span><span style="color:#89DDFF;">?</span><span style="color:#C3E88D;">script\\s</span><span style="color:#89DDFF;">*</span><span style="color:#C3E88D;">&gt;</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">javascript:</span><span style="color:#89DDFF;">[^</span><span style="color:#C3E88D;">&#39;&quot;</span><span style="color:#89DDFF;">]*/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">onerror\\s</span><span style="color:#89DDFF;">*</span><span style="color:#C3E88D;">=\\s</span><span style="color:#89DDFF;">*[</span><span style="color:#C3E88D;">&#39;&quot;</span><span style="color:#89DDFF;">]?[^</span><span style="color:#C3E88D;">&#39;&quot;</span><span style="color:#89DDFF;">]*[</span><span style="color:#C3E88D;">&#39;&quot;</span><span style="color:#89DDFF;">]?/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>而白名单过滤过程就是将富文本允许的标签和属性列出来，除了这些允许的内容之外，其他的全部过滤掉，首先使用cheerio将HTML解析成树状结构，然后对DOM树进行遍历，查看是否是我们允许的标签和属性，如果不是则去除掉。例如开源库<a href="https://github.com/leizongmin/js-xss" target="_blank" rel="noreferrer">js-xss</a></p><ol start="5"><li>CSP(Content Security Policy)内容安全策略，它用于指定哪些内容可执行，它是一个HTTP的头，他用来限制哪些可以执行，例如：</li></ol><ul><li><code>child-src</code>(页面子内容：iframe、webworker)、<code>connect-src</code>(网络连接：ajax)、<code>default-src</code>(当其他的没有指定的时候回去找default)</li><li><code>font-src</code>、<code>frame-src</code>、<code>img-src</code></li><li><code>manifest-src</code>、<code>media-src</code>、<code>object-src</code></li><li><code>script-src</code>、<code>style-src</code>、<code>worker-src</code></li><li><code>&lt;host-source&gt;</code> <code>&lt;scheme-source&gt;</code> <code>self</code></li><li><code>unsafe-inline</code> <code>unsafe-eval</code> <code>none</code></li><li><code>nonce-&lt;base64-value&gt;</code> <code>&lt;hash-source&gt;</code></li><li><code>strict-dynamic</code></li></ul><h2 id="基于vue搭建的网站如何防范xss攻击" tabindex="-1">基于VUE搭建的网站如何防范XSS攻击 <a class="header-anchor" href="#基于vue搭建的网站如何防范xss攻击" aria-label="Permalink to &quot;基于VUE搭建的网站如何防范XSS攻击&quot;">​</a></h2>`,40),c=s("li",null,"对用V-HTML和INNERHTML加载的客户信息进行转义",-1),F=a('<p>如果显示内容里面有html片段，一定需要用v-html或者innerHTML加载，例如：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-html</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">`&lt;span&gt;${message}&lt;/span&gt;`</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>里面的message是客户自己输入的信息，如果此时是恶意的dom片段肯定会引起XSS攻击。此时我们可以对“&lt;”，&quot;&gt;&quot;转译成“&lt;”，“&gt;”。然后再输入到页面。</p><ol start="3"><li>在入口页面的META中使用CSP，在入口文件的head添加meta标签</li></ol><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Content-Security-Policy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">script-src &#39;self&#39;;style-src &#39;self&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>上面的CSP设置表示，script脚本资源和style样式资源只能加载当前域名下的资源。这样子可以避免外部恶意的脚本的加载和执行。</p><p>一般会用下面的CSP配置：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Content-Security-Policy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">script-src &#39;self&#39; &#39;unsafe-eval&#39;;style-src &#39;self&#39; &#39;unsafe-inline&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4"><li>针对特殊场景，选择性过滤XSS标签 在项目中，XSS的安全漏洞很容易出现，例如在聊天模块和富文本模块很容易出现。</li></ol><p>有时候你想实现富文本编辑器里编辑html内容的业务。可是又担心XSS恶意脚本的注入。此时可以使用一个xss工具。网址：<a href="https://github.com/leizongmin/js-xss%E3%80%82" target="_blank" rel="noreferrer">https://github.com/leizongmin/js-xss。</a></p><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><ul><li><a href="https://v2.cn.vuejs.org/v2/guide/security.html" target="_blank" rel="noreferrer">Vue安全</a></li><li><a href="https://tech.meituan.com/2018/09/27/fe-security.html" target="_blank" rel="noreferrer">前端安全系列（一）：如何防止XSS攻击？</a></li><li><a href="https://tech.meituan.com/2018/10/11/fe-security-csrf.html" target="_blank" rel="noreferrer">前端安全系列（二）：如何防止CSRF攻击？</a></li></ul>',12);function i(D,y,u,d,C,m){return o(),l("div",null,[r,s("ol",null,[s("li",null,"对于从接口请求的数据，尽量使用"+p()+"加载，而不是V-HTML。 vue中的大括号会把数据解释为普通文本。通常如果要解释成html代码则要用v-html。而此指令相当于innerHTML。虽然像innerHTML一样不会直接输出script标签，但也可以输出img，iframe等标签。",1),c]),F])}const A=n(t,[["render",i]]);export{b as __pageData,A as default};