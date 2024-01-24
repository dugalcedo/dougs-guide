class DugCode extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
            '<code>' +
            this.innerHTML
            .replaceAll('<','&lt;')
            .replaceAll('>','&gt;')
            + '</code>'
    }
}

customElements.define('dug-code', DugCode)

class DugCodeMultiLine extends HTMLElement {
    connectedCallback() {
        const lines = this.innerHTML.split('\n').map(line => line.trim())
        console.log(lines)
        this.innerHTML = ""
        lines.forEach((line, i) => {
            if (!line) return
            this.innerHTML += 
                '<code>' +
                line
                .replaceAll('<','&lt;')
                .replaceAll('>','&gt;')
                + '</code>'
            if (i < lines.length-1) this.innerHTML += '<br>'
        })
    }
}

customElements.define('dug-code-m', DugCodeMultiLine)

class DugPre extends HTMLElement {
    connectedCallback() {
        this.style.display = 'block'
        let lines = this.innerHTML.split('\n')
        lines = lines.slice(1, lines.length-1)
        let firstTabAmt = 0
        for (let i = 0; i < lines[0].length; i++) {
            let char = lines[0][i]
            if (char === ' ') {
                firstTabAmt++
            } else break
        }
        let spaces = (' ').repeat(firstTabAmt)
        lines = lines.map(line => line.replace(spaces, '').replaceAll(' ','&nbsp;').replaceAll('<','&lt;').replaceAll('>','&gt;'))
        this.innerHTML = 
            '<code>' +
            lines.join('<br>') +
            '</code>'
    }
}

customElements.define('dug-pre', DugPre)