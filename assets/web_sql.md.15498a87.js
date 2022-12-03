import{_ as s,c as l,o as a,a as n}from"./app.089fa358.js";const D=JSON.parse('{"title":"sql\u6CE8\u5165","description":"","frontmatter":{},"headers":[{"level":2,"title":"sql\u6CE8\u5165\u7684\u5371\u5BB3","slug":"sql\u6CE8\u5165\u7684\u5371\u5BB3","link":"#sql\u6CE8\u5165\u7684\u5371\u5BB3","children":[]},{"level":2,"title":"sql\u6CE8\u5165\u9632\u5FA1","slug":"sql\u6CE8\u5165\u9632\u5FA1","link":"#sql\u6CE8\u5165\u9632\u5FA1","children":[]}],"relativePath":"web/sql.md","lastUpdated":1670077213000}'),e={name:"web/sql.md"},o=n(`<h1 id="sql\u6CE8\u5165" tabindex="-1">sql\u6CE8\u5165 <a class="header-anchor" href="#sql\u6CE8\u5165" aria-hidden="true">#</a></h1><p>SQL \u6CE8\u5165\u4EA7\u751F\u7684\u539F\u56E0\u662F\u7531\u4E8E\u5F00\u53D1\u5BF9\u7528\u6237\u7684\u8F93\u5165\u6570\u636E\u672A\u505A\u6709\u6548\u8FC7\u6EE4\uFF0C\u76F4\u63A5\u5F15\u7528 SQL \u8BED\u53E5\u6267\u884C\uFF0C\u5BFC\u81F4\u539F\u672C\u7684\u6570\u636E\u88AB\u5F53\u4F5C SQL \u8BED\u53E5\u6267\u884C\u3002\u901A\u5E38\u6765\u8BF4\uFF0CSQL \u6CE8\u5165\u5206\u4E3A\u6570\u5B57\u578B\u548C\u5B57\u7B26\u578B\u6CE8\u5165\uFF0C\u6211\u4EEC\u4E3B\u8981\u901A\u8FC7\u6CE8\u5165\u53C2\u6570\u7C7B\u578B\u6765\u5224\u65AD\u3002</p><p>\u5B83\u548Cxss\u653B\u51FB\u6709\u70B9\u50CF\uFF0C\u6570\u636E\u53D8\u6210\u4E86\u7A0B\u5E8F\u3002 \u4F8B\u5982\uFF1A</p><div class="language-sql line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">table</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> \${id};</span></span>
<span class="line"><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;">\u7528\u6237\u4F20\u5165\u7684id\u4E3A </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">\uFF0C\u6700\u7EC8sql\u4E3Aselect </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">table</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> \u8FD9\u5C31\u5F62\u6210\u4E86sql\u6CE8\u5165</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="sql\u6CE8\u5165\u7684\u5371\u5BB3" tabindex="-1">sql\u6CE8\u5165\u7684\u5371\u5BB3 <a class="header-anchor" href="#sql\u6CE8\u5165\u7684\u5371\u5BB3" aria-hidden="true">#</a></h2><ul><li>\u731C\u89E3\u5BC6\u7801</li><li>\u83B7\u53D6\u6570\u636E</li><li>\u5220\u5E93\u5220\u8868</li><li>\u62D6\u5E93</li></ul><h2 id="sql\u6CE8\u5165\u9632\u5FA1" tabindex="-1">sql\u6CE8\u5165\u9632\u5FA1 <a class="header-anchor" href="#sql\u6CE8\u5165\u9632\u5FA1" aria-hidden="true">#</a></h2><ul><li>\u5173\u95ED\u9519\u8BEF\u8F93\u51FA\uFF0C\u4E0D\u8981\u5C06sql\u9519\u8BEF\u8FD4\u56DE\u7ED9\u6D4F\u89C8\u5668</li><li>\u68C0\u67E5\u6570\u636E\u7C7B\u578B</li><li>\u5BF9\u6570\u636E\u8FDB\u884C\u8F6C\u4E49</li><li>\u4F7F\u7528\u53C2\u6570\u5316\u67E5\u8BE2</li><li>\u4F7F\u7528ORM(\u5BF9\u8C61\u5173\u7CFB\u6620\u5C04)</li></ul>`,8),p=[o];function t(r,c,C,i,A,y){return a(),l("div",null,p)}const F=s(e,[["render",t]]);export{D as __pageData,F as default};
