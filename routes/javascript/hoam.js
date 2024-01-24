const arrayMethods = [
    {
        name: {
            simple: 'forEach',
            full: 'Array.forEach',
            withParams: 'Array.forEach(cb)'
        },
        
    }
]

export default function hoam() {
    const methodCells = [...document.querySelectorAll('tr > td:first-child')].filter(td => td.innerText.includes('Array'))
    methodCells.forEach(td => td.classList.add('method'))
}