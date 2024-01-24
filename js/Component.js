class Component {
    static ce = document.createElement.bind(document)
    static all = []

    constructor(options) {
        this.options = options
        Component.all.push(this)
        this.render()
    }

    render() {
        const C = Component
        const O = this.options
        const main = C.ce(O.tagname)
        const parent = O.parent

        Object.entries((O.attr||{})).forEach(([k,v]) => {
            main.setAttribute(k, v)
        })

        Object.entries((O.props||{})).forEach(([k,v]) => {
            main[k] = v
        })

        if (O.children) {
            O.children.forEach(child => {
                new Component({...child, parent: main})
            })
        }

        parent.append(main)
    }
}

export default Component