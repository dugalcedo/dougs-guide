function Route(parent) {
    checkHash()
    window.addEventListener('hashchange', checkHash)

    async function checkHash() {
        const hash = location.hash || '#'
        const route = `/routes/${hash.replace('#', '')||'home'}.html`
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
        let res = await fetch('/routes/404.html')
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