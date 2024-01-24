
import Component from "./Component.js"
import Route from './router.js'

const navItems = [
    {
        title: 'HTML',
        items: [
            {
                title: 'Elements',
            },
            {
                title: 'Attributes'
            },
            {
                title: 'Block vs. Inline',
                path: 'block_vs_inline'
            }
        ]
    },
    {
        title: 'CSS',
        items: [
            {
                title: 'Selectors'
            },
            {
                title: 'Combinators'
            }
        ]
    },
    {
        title: 'JavaScript',
        items: [
            {
                title: 'console.log()',
                path: 'console_log'
            },
            {
                title: 'Callbacks'
            },
            {
                title: 'Higher-order array methods',
                path: 'hoam'
            }
        ]
    }
]

const DOM = defineNodes({
    main: 'main',
    nav: 'aside nav'
})

Route(DOM.main)

function defineNodes(obj) {
    const result = {}
    Object.entries(obj).forEach(([varName, selector]) => {
        const el = document.querySelector(selector)
        if (!el) {
            console.warn(`Invalid selector: ${selector}`)
        }
        result[varName] = el
    })
    return result
}

String.prototype.toLowerCaseWith = function(str) {
    return this.toLowerCase().replaceAll(' ', str)
}

navItems.forEach((cat, i) => {
    new Component({
        tagname: 'div',
        parent: DOM.nav,
        attr: {
            class: 'nav-item'
        },
        children: [
            {
                tagname: 'button',
                props: {
                    innerText: cat.title
                },
                attr: {
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': `#nav-menu-${i}`,
                    'class': 'btn rounded bg-light m-2 w-75'
                }
            },
            {
                tagname: 'ul',
                attr: {
                    class: 'collapse',
                    id: `nav-menu-${i}`
                },
                children: cat.items.map(item => {
                    let href = `#${cat.title.toLowerCaseWith('_')}/${item.path || item.title.toLowerCaseWith('_')}`
                    return {
                        tagname: 'li',
                        children: [{
                            tagname: 'a',
                            props: {
                                innerText: item.title,
                                href
                            }
                        }]
                    }
                })
            }
        ]
    })
})

