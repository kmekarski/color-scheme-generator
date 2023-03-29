

const form = document.getElementById('scheme-form')
const seedColorInput = document.getElementById('seed-color')
const schemeModeInput = document.getElementById('scheme-mode')

let colors = [
    '#F55A5A',
    '#2B283A',
    '#FBF3AB',
    '#AAD1B6',
    '#A626D3'
]

document.addEventListener('click', e => {
    navigator.clipboard.writeText(e.target.dataset.color);
    console.log(e.target.dataset.color)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const seedColor = seedColorInput.value.replace('#', '')
    const schemeMode = schemeModeInput.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${schemeMode}`)
        .then(res => res.json())
        .then(data => {
            colors = data.colors.map((color) => color.hex.value)
            renderColors()
        })
})

renderColors()

function renderColors() {
    let colorsHtml = ''
    let footerHtml = ''
    colors.forEach(color => {
        colorsHtml += `
            <div class="color-stripe" style="background-color: ${color}" data-color="${color}"></div>
        `
        footerHtml += `
            <div class="color-hex" data-color="${color}">${color}</div>
        `
    })
    document.querySelector('.colors-container').innerHTML = colorsHtml
    document.querySelector('.hexes-container').innerHTML = footerHtml
}