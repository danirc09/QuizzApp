window.onload = function() {
    openTrivia();
}
var correctas = 0;
var preguntas = 0;

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function openTrivia() {
    numQuestion = 0;
    correctAnswers = 0;
    results = {}; // Parte del JSON devuelto que contiene las preguntas...

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=18", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            results = respuesta.results;
            /* console.log(results[0]["question"]); */
            pregunta();
        }
    }
    ajax.send();
}

function pregunta() {
    var div = document.getElementById('conex');
    var recarga = '';
    if (preguntas == 10) {
        recarga += '<p>Haz acertado ' + correctas + '/10!!</p>'
        recarga += '<button class="btn btn-dark btn-lg btn-block" onclick="openTrivia()">Volver a jugar</button>'
        div.innerHTML = recarga;
    } else {
        recarga += '<p>Quizz</p>'
        recarga += '<p>' + (preguntas + 1) + '/10</p>'
        recarga += '<p>' + results[0]["question"] + '</p>';
        /*  recarga += '<button class = "btn btn-primary btn-lg btn-block" id="correct" onclick="correct_answer()">' + results[0]["correct_answer"] + '</button><br>'; */
        array_inco = results[0]["incorrect_answers"];
        var array_resp = [];
        array_resp.push(results[0]["correct_answer"]);
        for (let i = 0; i < array_inco.length; i++) {
            array_resp.push(array_inco[i]);
            /* recarga += '<button class = "btn btn-primary btn-lg btn-block incorrect" id="incorrect' + i + '" onclick="correct_answer(' + i + ')"">' + array_inco[i] + '</button><br>'; */
        }
        console.log(array_resp);
        array_random = array_resp.sort(function() { return Math.random() - 0.5 });
        console.log(array_random);
        for (let i = 0; i < array_random.length; i++) {
            recarga += '<button class = "btn btn-primary btn-lg btn-block" id="pregunta' + i + '" onclick="correct_answer(this)">' + array_random[i] + '</button><br>';
        }
        recarga += '<button class="btn btn-dark btn-lg btn-block" onclick="openTrivia()">Next Question</button>'
        div.innerHTML = recarga;
    }
}

function correct_answer(valor) {
    preguntas++;
    var correcta = results[0]["correct_answer"];
    if (correcta == valor.innerHTML) {
        correctas++;
        valor.style.backgroundColor = 'green';
        valor.style.borderColor = 'green';
        clase = document.getElementsByClassName("btn btn-primary btn-lg btn-block");
        for (let i = 0; i < clase.length; i++) {
            clase[i].disabled = true;
        }
        console.log(correctas)
    } else {
        valor.style.backgroundColor = 'red';
        valor.style.borderColor = 'red';
        clase = document.getElementsByClassName("btn btn-primary btn-lg btn-block");
        for (let i = 0; i < clase.length; i++) {
            clase[i].disabled = true;
        }
    }

    /* document.getElementById('correct').style.backgroundColor = 'green';
    document.getElementById('correct').style.borderBlockColor = 'green';
    document.getElementById('incorrect' + i).style.backgroundColor = 'red';
    document.getElementById('incorrect' + i).style.borderBlockColor = 'red'; */
}