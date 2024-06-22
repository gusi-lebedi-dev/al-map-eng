document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll('[data-country]');
    elems.forEach((elem) => {
        elem.addEventListener('mouseenter', () => {
            const country = elem.getAttribute('data-country')
            elems.forEach((e) => {
                if (e.getAttribute('data-country') === country) {
                    e.classList.add('map-hover')
                }
            })
        })
        elem.addEventListener('mouseleave', () => {
            elems.forEach((e) => {
                e.classList.remove('map-hover')
            })
        })
        elem.addEventListener('click', () => {
            const country = elem.getAttribute('data-country')
            const total = elem.getAttribute('data-total')
            const number = elem.getAttribute('data-number')

            const countryBlock = document.querySelector('.country')
            const totalBlock = document.querySelector('.total')
            const numberBlock = document.querySelector('.number')

            const infoCountry = document.querySelector('.info-country')

            elems.forEach((e) => {
                e.classList.remove('active')
                if (e.getAttribute('data-country') === country) {
                    e.classList.add('active')
                }
            })

            function abbreviateNumber(number) {
                number = number * 1000
                if (number === 0) return '0';

                if (number >= 1e9) {
                    // Если число больше или равно миллиарду
                    result = (number / 1e6).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                } else if (number >= 1e6) {
                    // Если число больше или равно миллиону
                    result = (number / 1e6).toFixed(1);
                } else {
                    // Если число меньше миллиона
                    result = (number / 1e6).toFixed(1);
                }

                if (result.indexOf('.') > -1) {
                    result = result.replace(/\.0$/, '');
                }

                return number < 0 ? `-${result}` : result;
            }
            let textMil = '';
            function getFirstThreeDigits(number) {
                if (number >= 1e9) {
                    // Если число больше или равно миллиарду
                    result = (number / 1e6).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    textMil = ' млн. человек'
                } else if (number >= 1e6) {
                    // Если число больше или равно миллиону
                    result = (number / 1e6).toFixed(1);
                    textMil = ' млн. человек'
                } else {
                    // Если число меньше миллиона
                    result = (number / 1e3).toFixed(0);
                    textMil = ' тыс. человек'
                }

                if (result.indexOf('.') > -1) {
                    result = result.replace(/\.0$/, '');
                }

                return number < 0 ? `-${result}` : result;
            }

            function strEng(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            infoCountry.classList.add('open-info-country')
            countryBlock.innerHTML = "Location: " + "<span class='text-green'>" + country + "</span>"
            totalBlock.innerHTML = "Total Population: " + "<span class='text-green'>" + abbreviateNumber(total) + " million</span>"
            numberBlock.innerHTML = "Number of prevalent cases: "
                + "<span class='text-green'>" + strEng(number) + textMil + "</span>"
        })
    })
})

