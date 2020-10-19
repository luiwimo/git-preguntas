class Game {

    constructor(countries) {
        this.countries = countries;
        this.isOk = false; //Valida resultado correcto
        this.selectedCountries = [];
        this.winner = null;
    }

    generateRandomNumber(length) { //Genera número random

        return Math.floor(Math.random() * length)
    }

    get oneCountry() { //Devuelve país

        const random = this.generateRandomNumber(this.countries.length)
        return this.countries[random]
    }

    choiceCountries() { //Regresa 3 paises

        for (var i = 0; i < 3; i++) {
            const pais = this.oneCountry
            this.selectedCountries.push(pais)
        }
        return this.selectedCountries;
    }

    get choiceWinner() { //Selecciona ganador

        const random = this.generateRandomNumber(this.selectedCountries.length)
        return this.selectedCountries[random]
    }

    buildFlag(info, cb) { //Info: info del pais
        //cb CalBack para ejecutar listener
        const img = document.createElement('img');
        img.setAttribute('src', info.flag)
        img.setAttribute('id', info.name)
        img.addEventListener('click', cb)
        return img;
    }

    start() {//Se encarga de cargar el juego
        this.choiceCountries();
        this.winner = this.choiceWinner;
        const banderas = document.querySelector('.flags')
        const respuesta = document.getElementById('answer')
        const poblacion = document.getElementById('population')
        const capital = document.getElementById('capital')
        const textoPais = document.getElementById('country-name')

        banderas.innerHTML = "";
        respuesta.innerHTML = "";
        poblacion.innerHTML = "";
        capital.innerHTML = "";
        textoPais.innerHTML = this.winner.translations.es;

        const clickFlag = (event) => {
            if (this.winner.name === event.target.id) {
                //Correcto
                respuesta.innerHTML = "Correcto"
                poblacion.innerHTML = "Población: " + this.winner.population
                capital.innerHTML = "Capital: " + this.winner.capital

            } else {
                respuesta.innerHTML = 'Incorrecto'
                location.reload();
            }
        }

        this.selectedCountries.forEach(country => {
            const flag = this.buildFlag(country,clickFlag)
            banderas.appendChild(flag);
        });
    }
}

export default Game;