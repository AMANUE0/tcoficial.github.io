document.querySelectorAll(".reactive").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".reactive").forEach(btn => {
            btn.classList.remove("active", "wrong", "selected");
        });

        button.classList.add("selected");
    });
});

let header = document.querySelector("header");
class Pregunta {
    constructor(ask, answerCorrect, option1, option2, option3) {
        this.ask = ask;
        this.answerCorrect = answerCorrect;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.element = null;
    }

    create() {
        const content = document.createElement("section");
        const question = document.createElement("h3");
        const options = document.createElement("ul");
        const answerONE = document.createElement("button");
        const answerTWO = document.createElement("button");
        const answerTHREE = document.createElement("button");
        const answerFOUR = document.createElement("button");

        options.classList.add("options");
        question.classList.add("question");
        content.classList.add("contentQuestion");
        question.textContent = this.ask;
        answerONE.textContent = this.answerCorrect;
        answerTWO.textContent = this.option1;
        answerTHREE.textContent = this.option2;
        answerFOUR.textContent = this.option3;

        answerONE.dataset.correct = "true";
        answerTWO.dataset.correct = "false";
        answerTHREE.dataset.correct = "false";
        answerFOUR.dataset.correct = "false";

        const buttons = [answerONE, answerTWO, answerTHREE, answerFOUR];
        this.shuffleArray(buttons);

        buttons.forEach(button => {
            button.classList.add("reactive");
            button.addEventListener("click", () => {
                buttons.forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
            });
            options.appendChild(button);
        });

        content.appendChild(question);
        content.appendChild(options);

        this.element = content;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

function calificarExamen() {
    let puntaje = 0;
    document.querySelectorAll(".preguntas section").forEach(section => {
        const selected = section.querySelector(".selected");
        const correctAnswer = section.querySelector("[data-correct='true']");
        if (selected) {
            if (selected.dataset.correct === "true") {
                puntaje += 4.35;
                selected.classList.add("correct");
            } else {
                selected.classList.add("incorrect");
                correctAnswer.classList.add("correct");
            }
        }
    });

    const resultado = document.createElement("div");
    resultado.classList.add("resultado");
    resultado.textContent = `Tu calificación es: ${puntaje} / 100`;
    document.body.appendChild(resultado);

    // Desplazar la página a la sección de resultado
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });

    document.querySelectorAll(".reactive").forEach(button => {
        button.disabled = true;
    });
    document.querySelector(".finish").disabled = true;
}


function reiniciarExamen() {
    document.querySelector(".preguntas").innerHTML = "";
    document.querySelectorAll(".resultado").forEach(res => res.remove());
    document.querySelector(".finish").disabled = false;

    shuffleArray(preguntas);
    preguntas.forEach(pregunta => pregunta.create());
    preguntas.forEach(pregunta => document.querySelector(".preguntas").appendChild(pregunta.element));
    header.scrollIntoView({ behavior: "smooth", block: "start" });

}

const preguntas = [
    new Pregunta("¿Por qué nació la justicia?", 
        "Por la necesidad de mantener la armonía entre personas.", 
        "Para imponer normas estrictas sin excepciones.", 
        "Para beneficiar solo a un grupo social.", 
        "Para castigar a los infractores sin juicio."),
    
    new Pregunta("¿Qué es la justicia?", 
        "Un conjunto de pautas y criterios que regulan relaciones entre personas e instituciones.", 
        "Un sistema que solo protege a los ciudadanos con recursos.", 
        "Un mecanismo de control gubernamental absoluto.", 
        "Un conjunto de normas que rigen solo en situaciones excepcionales."),
    
    new Pregunta("¿Qué son los 'Derechos Humanos'?", 
        "Normas que reconocen y protegen la dignidad de todos los seres humanos.", 
        "Reglas que varían según cada país y pueden ser ignoradas.", 
        "Leyes opcionales dependiendo del gobierno en turno.", 
        "Derechos que aplican solo en ciertos continentes."),
    
    new Pregunta("¿Cómo rigen los 'Derechos Humanos' las relaciones en la sociedad?", 
        "Establecen principios sobre cómo las personas se relacionan entre sí y con el Estado.", 
        "Son recomendaciones sin obligación de cumplimiento.", 
        "Regulan solo los asuntos económicos de los ciudadanos.", 
        "Aplican solo en caso de conflictos internacionales."),
    
    new Pregunta("¿Qué significa que los derechos humanos sean universales e inalienables?", 
        "Todas las personas tienen derecho a ellos sin excepciones.", 
        "Pueden ser eliminados si el gobierno lo decide.", 
        "Aplican solo a quienes cumplan ciertos requisitos.", 
        "Son revocables dependiendo del contexto político."),
    
    new Pregunta("¿Qué implica la indivisibilidad de los derechos humanos?", 
        "No pueden ser fragmentados ni priorizados unos sobre otros.", 
        "Solo algunos derechos son esenciales y deben cumplirse.", 
        "Pueden ser otorgados de manera parcial.", 
        "Dependen exclusivamente del contexto económico."),
    
    new Pregunta("¿Qué significa la interdependencia de los derechos humanos?", 
        "El cumplimiento de un derecho depende, en parte, del cumplimiento de otros.", 
        "Cada derecho puede ser ejercido de manera aislada.", 
        "No es necesario garantizar todos los derechos al mismo tiempo.", 
        "Un derecho puede eliminar a otro si es más importante."),
    
    new Pregunta("¿Qué garantiza la participación e inclusión en los derechos humanos?", 
        "Que todas las personas puedan participar activamente en la sociedad.", 
        "Que solo las personas educadas tengan voz en la política.", 
        "Que el gobierno decida quién puede o no participar.", 
        "Que las personas se limiten a cumplir las leyes sin opinar."),
    
    new Pregunta("¿Cuál es el deber de los Estados respecto a los derechos humanos?", 
        "Respetar y garantizar los derechos humanos conforme a las normas jurídicas.", 
        "Aplicarlos únicamente cuando sean convenientes.", 
        "Ignorar las denuncias si afectan la estabilidad política.", 
        "Limitar el acceso a ciertos derechos por razones de seguridad."),
    
    new Pregunta("¿Qué establece el artículo 17 de la Constitución Mexicana?", 
        "Toda persona tiene derecho a que se le administre justicia por tribunales expeditos.", 
        "Los juicios pueden demorarse indefinidamente según el caso.", 
        "Solo ciertos grupos tienen acceso a una defensa legal rápida.", 
        "La justicia puede ser denegada por falta de recursos."),
    
    new Pregunta("¿Qué derecho menciona el artículo 8 de la Convención Americana sobre Derechos Humanos?", 
        "Toda persona tiene derecho a ser oída con garantías y dentro de un plazo razonable.", 
        "Solo quienes tengan abogados pueden ser escuchados en juicio.", 
        "El tiempo del juicio depende exclusivamente del juez.", 
        "Los testigos deciden si una persona tiene derecho a defensa."),
    
    new Pregunta("¿Qué es la justicia expedita?", 
        "La impartida por jueces y tribunales sin obstáculos burocráticos.", 
        "Un sistema judicial sin normas preestablecidas.", 
        "Una justicia limitada solo a los delitos menores.", 
        "Un derecho que depende de la disponibilidad de recursos."),
    
    new Pregunta("¿Cuál es el aspecto formal de la justicia expedita?", 
        "La obligación de las autoridades de dar respuestas prontas e imparciales.", 
        "Que los jueces tomen decisiones sin pruebas suficientes.", 
        "Que los procesos sean largos y complejos.", 
        "Que las sentencias sean negociadas entre las partes."),
    
    new Pregunta("¿Cuál es el aspecto material de la justicia expedita?", 
        "La obligación de las autoridades de hacer cumplir sus resoluciones.", 
        "Permitir que las resoluciones se cumplan solo si hay presión mediática.", 
        "Que las resoluciones sean optativas según el caso.", 
        "Que solo se cumplan resoluciones favorables al Estado."),
    
    new Pregunta("¿Qué son los métodos alternos de solución de conflictos?", 
        "Mecanismos para resolver disputas sin llegar a tribunales.", 
        "Estrategias para ignorar los problemas hasta que desaparezcan.", 
        "Formas de negociación solo entre gobiernos.", 
        "Maneras de evadir la justicia formal."),
    
    new Pregunta("¿Qué es un problema en términos de conflictos?", 
        "Un estado de tensión o malestar entre dos o más personas.", 
        "Un desacuerdo sin consecuencias relevantes.", 
        "Un debate intelectual sin impacto en la realidad.", 
        "Una situación sin posibilidad de resolución."),
    
    new Pregunta("¿Qué caracteriza un conflicto?", 
        "Una situación donde ambas partes creen tener la razón.", 
        "Un problema siempre provocado por una sola persona.", 
        "Una disputa sin opciones de solución.", 
        "Un enfrentamiento basado en diferencias de idioma."),
    
    new Pregunta("¿Cómo se define un conflicto latente?", 
        "Es un conflicto que existe, pero las personas implicadas no son conscientes de él.", 
        "Es un conflicto que estalla de manera inmediata.", 
        "Es un problema que solo afecta a una persona.", 
        "Es una situación sin importancia real."),
    
    new Pregunta("¿Qué es un conflicto explícito o manifiesto?", 
        "Un conflicto evidente y reconocido por las partes implicadas.", 
        "Un desacuerdo interno sin impacto externo.", 
        "Un problema que solo se percibe con el tiempo.", 
        "Una discusión sin relevancia en la sociedad."),
    
    new Pregunta("¿Qué es un conflicto intrapersonal?", 
        "Un conflicto que ocurre dentro de una persona, relacionado con valores o emociones.", 
        "Un enfrentamiento entre dos personas desconocidas.", 
        "Un problema legal entre empresas.", 
        "Un desacuerdo entre naciones."),
    
    new Pregunta("¿Qué es un conflicto interpersonal?", 
        "Un conflicto que surge entre dos personas, a veces por intervención de una tercera.", 
        "Una disputa sin impacto en la relación entre las partes.", 
        "Un problema que solo se da en el ámbito laboral.", 
        "Un conflicto que solo involucra a desconocidos."),
    
    new Pregunta("¿Qué es un conflicto intragrupal?", 
        "Un enfrentamiento entre subgrupos dentro de un grupo mayor.", 
        "Un conflicto entre dos países con culturas similares.", 
        "Un problema que surge entre empresas distintas.", 
        "Un desacuerdo que solo ocurre en redes sociales."),
    
    new Pregunta("¿Qué es un conflicto intergrupal?", 
        "Un conflicto que ocurre entre dos grupos claramente definidos.", 
        "Un desacuerdo interno dentro de una misma comunidad.", 
        "Una disputa sin importancia entre dos sectores empresariales.", 
        "Un problema que solo se da en grupos familiares.")
];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(preguntas);
preguntas.forEach(pregunta => pregunta.create());
preguntas.forEach(pregunta => document.querySelector(".preguntas").appendChild(pregunta.element));

const botonFinalizar = document.createElement("button");
botonFinalizar.classList.add("finish");
botonFinalizar.textContent = "Calificar";

botonFinalizar.addEventListener("click", calificarExamen);
document.body.appendChild(botonFinalizar);

const botonReiniciar = document.createElement("button");
botonReiniciar.classList.add("restart");
botonReiniciar.textContent = "Reintentar";
botonReiniciar.addEventListener("click", reiniciarExamen);
document.body.appendChild(botonReiniciar);

