const root = location.href.includes('github') ? '/dougs-guide/' : '/'

function Route(parent) {
    checkHash()
    window.addEventListener('hashchange', checkHash)

    async function checkHash() {
        const hash = location.hash || '#'
        const route = `${root}routes/${hash.replace('#', '')||'home'}.html`
        const html = await getHTML(route)
        parent.innerHTML = html
        runJS(route)
    }

    async function getHTML(route) {
        let res = await fetch(route)
        if (!res.ok) return await get404()
        return await res.text()
    }

    async function get404() {
        let res = await fetch(root + 'routes/404.html')
        return await res.text()
    }
    
    async function runJS(route) {
        route = route.replace('.html','.js')
        let res = await fetch(route)
        if (!res.ok) return
        const js = await import(route)
        js.default()
    }
}

export default Route