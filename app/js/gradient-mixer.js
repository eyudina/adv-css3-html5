//
// Gradient Mixer
//

const radioButtons = document.querySelectorAll('[data-radio]')
const colorPickers = document.querySelectorAll('[data-color-picker]')
const gradientOutputs = document.querySelectorAll('.g-output')
const sliders = document.querySelectorAll('.g-slider')
const degOutputs = document.querySelectorAll('.g-input__number-field')
const inputButtonsLeft = document.querySelectorAll('.g-input__button--left')
const inputButtonsRight = document.querySelectorAll('.g-input__button--right')

degOutputs.forEach(item => {
    const output = item.closest('.gradient-mixer').querySelector('.g-output__text--value')
    item.addEventListener('input', function () {
        updateDegreeValue(item)
    })
    item.addEventListener('mouseup', function () {
        hideSliderValue(output)
    })
    item.addEventListener('keyup', function () {
        hideSliderValue(output)
    })
})

sliders.forEach(item => {
    const output = item.closest('.gradient-mixer').querySelector('.g-output__text--value')
    item.addEventListener('input', function () {
        updateDegreeValue(item)
        updateGradientFor(item)
    })
    item.addEventListener('mouseup', function () {
        hideSliderValue(output)
    })
})

const updateDegreeValue = (item) => {
    const container = item.closest('.gradient-mixer')
    const output = container.querySelector('.g-input__number-field')
    const slider = container.querySelector('.g-slider')
    const value = parseInt(output.value)
    const max = parseInt(output.max)
    const min = parseInt(output.min)
    if (output.value === '') {
        output.value = min
        slider.value = min
    } else if (value > max) {
        output.value = max
        slider.value = max
    } else {
        output.value = item.value
        slider.value = item.value
    }
    showSliderValue(item)
}

const showSliderValue = (item) => {
    const container = item.closest('.gradient-mixer')
    const output = container.querySelector('.g-output__text--value')
    output.innerHTML = `${item.value}&deg;`
    output.style.opacity = '1'
    output.style.transition = 'none'
}

const hideSliderValue = (output) => {
    output.style.opacity = '0'
    output.style.transition = 'opacity 0.7s ease-in'
}

inputButtonsLeft.forEach(item => {
    const output = item.closest('.gradient-mixer').querySelector('.g-output__text--value')
    item.addEventListener('click', function (e) {
        e.preventDefault()
    })
    item.addEventListener('mousedown', function () {
        const input = item.parentElement.querySelector('.g-input__number-field')
        if (parseInt(input.value) > parseInt(input.min)) {
            input.stepDown()
        }
        updateDegreeValue(input)
    })
    item.addEventListener('mouseup', function () {
        hideSliderValue(output)
    })
})

inputButtonsRight.forEach(item => {
    const output = item.closest('.gradient-mixer').querySelector('.g-output__text--value')
    item.addEventListener('click', function (e) {
        e.preventDefault()
    })
    item.addEventListener('mousedown', function () {
        const input = item.parentElement.querySelector('.g-input__number-field')
        if (parseInt(input.value) < parseInt(input.max)) {
            input.stepUp()
        }
        updateDegreeValue(input)
    })
    item.addEventListener('mouseup', function () {
        hideSliderValue(output)
    })
})

const updateGradientFor = (target) => {
    const container = target.closest('.gradient-mixer')
    const currentColorPickers = container.querySelectorAll('[data-color-picker]')
    const colors = Array.from(currentColorPickers).map(item => item.value)
    const radio = document.forms.namedItem('gradient-mixer-form').elements.namedItem('gradient-type').value
    const showHideContainer = container.querySelector('.g-show-hide')
    const gradientOutput = container.querySelector('.g-output')
    const degreeValue = container.querySelector('.g-slider').value

    gradientOutput.style.background = radio === 'linear-gradient' ?
        `${radio}(${degreeValue}deg, ${colors[0]}, ${colors[1]})` : `${radio}(${colors[0]}, ${colors[1]})`
    showHideContainer.style.display = radio === 'linear-gradient' ? 'block' : 'none'
}

gradientOutputs.forEach(item => {
    const copyBtn = item.querySelector('.g-output__button--copy')
    item.addEventListener('click', function () {
        const style = item.style.background
        navigator.clipboard.writeText(style)
        console.log(navigator.clipboard.readText())
        copyBtn.innerHTML = 'Copied!'
    })
    copyBtn.addEventListener('transitionend', () => {
        if (getComputedStyle(copyBtn).opacity === "0") {
            copyBtn.innerHTML = 'Copy'
        }
    })
})

colorPickers.forEach(item => {
    item.addEventListener('input', function () {
        item.parentElement.querySelector('label').innerHTML = item.value
        updateGradientFor(item)
    })
})

radioButtons.forEach(item => {
    item.addEventListener('change', function () {
        updateGradientFor(item)
    })
})

document.addEventListener('DOMContentLoaded', function() {
    colorPickers.forEach(item => {
        item.dispatchEvent(new Event('input'))
    })
    radioButtons.forEach(item => {
        item.dispatchEvent(new Event('change'))
    })
    sliders.forEach(item => {
        item.dispatchEvent(new Event('mouseup'))
    })
})
