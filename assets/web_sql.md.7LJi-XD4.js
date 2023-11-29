import{_ as s,o as i,c as a,R as l}from"./chunks/framework.djJUHdSG.js";const y=JSON.parse('{"title":"sql注入","description":"","frontmatter":{},"headers":[],"relativePath":"web/sql.md","filePath":"web/sql.md","lastUpdated":1683282608000}'),t={name:"web/sql.md"},e=l('<h1 id="sql注入" tabindex="-1">sql注入 <a class="header-anchor" href="#sql注入" aria-label="Permalink to &quot;sql注入&quot;">​</a></h1><p>SQL 注入产生的原因是由于开发对用户的输入数据未做有效过滤，直接引用 SQL 语句执行，导致原本的数据被当作 SQL 语句执行。通常来说，SQL 注入分为数字型和字符型注入，我们主要通过注入参数类型来判断。</p><p>它和xss攻击有点像，数据变成了程序。 例如：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${id};</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">//</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">用户传入的id为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，最终sql为select </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 这就形成了sql注入</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="sql注入的危害" tabindex="-1">sql注入的危害 <a class="header-anchor" href="#sql注入的危害" aria-label="Permalink to &quot;sql注入的危害&quot;">​</a></h2><ul><li>猜解密码</li><li>获取数据</li><li>删库删表</li><li>拖库</li></ul><h2 id="sql注入防御" tabindex="-1">sql注入防御 <a class="header-anchor" href="#sql注入防御" aria-label="Permalink to &quot;sql注入防御&quot;">​</a></h2><ul><li>关闭错误输出，不要将sql错误返回给浏览器</li><li>检查数据类型</li><li>对数据进行转义</li><li>使用参数化查询</li><li>使用ORM(对象关系映射)</li></ul>',8),h=[e];function n(k,p,r,d,o,c){return i(),a("div",null,h)}const q=s(t,[["render",n]]);export{y as __pageData,q as default};