module.exports = {
    title: 'Web安全',
    description: 'Web安全',
    base: '/security/',
    markdown: {
        lineNumbers: true, //显示代码行数
    },
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/security/favicon.ico' }]
    ],
    themeConfig: {
        nav: [
            {
                text: 'Web安全',
                link: "/web/index"
            }
        ],
        outlineTitle: '在本页面',
        lastUpdatedText: '最近更新时间',
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present codeteenager'
        },
        socialLinks: [{ icon: "github", link: "https://github.com/codeteenager/security" }],
        sidebar: {
            "/web/": [

                {
                    text: "基础",
                    items: [
                        {
                            text: "介绍",
                            link: "/web/index",
                        },
                        {
                            text: "XSS攻击",
                            link: "/web/xss",
                        },
                        {
                            text: "CSRF攻击",
                            link: "/web/csrf",
                        },
                    ],
                }
            ],
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        }
    }
}