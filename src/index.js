import axios from 'axios'; //Similar a request, axios usa promesas
import './styles/main.scss';

function init() {
    //LLamar API
    const pregunta = document.querySelector(".pregunta")
    const respuesta = document.querySelector(".respuesta")
    const categoria = document.getElementById("categoria")
    const dificultad = document.getElementById("dificultad")
    const tipo = document.getElementById("tipo")
    const generar = document.getElementById("generar")


    generar.addEventListener('click', function () {
        
        pregunta.innerHTML=""

        axios.get('https://opentdb.com/api.php?amount=10&category=' + categoria.value + '&difficulty=' + dificultad.value + '&type=' + tipo.value)
            .then((response) => {
                //Obtengo data
                //console.log(response.data); //data guarda info
                const arr = response.data.results;
                for (let i = 0; i < arr.length; i++) {
                    const output = document.createElement('div')
                    output.classList.add('output')
                    if(tipo.value == 'multiple'){
                    output.innerHTML = '<label for="">' + arr[i].question + '</label>'
                        + '<select name="resumen" id="resumen" required>'
                        + '<option value="0" selected disabled>------Selecione una respuesta-----</option >'
                        + '<option value="1" >' + arr[i].correct_answer + '</option >'
                        + '<option value="0">' + arr[i].incorrect_answers[0] + '</option>'
                        + '<option value="0">' + arr[i].incorrect_answers[1] + '</option>'
                        + '<option value="0">' + arr[i].incorrect_answers[2] + '</option>'
                     }else{
                        output.innerHTML = '<label for="">' + arr[i].question + '</label>'
                        + '<select name="resumen" id="resumen" required>'
                        + '<option value="0" selected disabled>------Selecione una respuesta-----</option >'
                        + '<option value="1" >' + arr[i].correct_answer + '</option >'
                        + '<option value="0">' + arr[i].incorrect_answers[0] + '</option>'
                     }
                   + '</select>'
                   pregunta.appendChild(output)

                }
                respuesta.innerHTML ='<button id="enviar">Enviar Respuestas</button>'
                
                const enviar = document.getElementById("enviar")
                enviar.addEventListener('click', function () {
                   
                    const resumen = document.getElementById('resumen');
                    const contador = resumen.options[resumen.selectedIndex].value;
                    console.log(contador);
                    alert('Respuestas enviadas')
                 
                    location.reload();
                })

            })
            .catch((err) => {
                console.log('Error al llamar data')
            })

    })



}

init();