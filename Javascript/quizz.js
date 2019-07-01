var question_repondu = 0;
var image_element_resultat;
var nom_element_resultat;
var description_element_resultat;
var containeurs_question;
var btn_soumettre_recommencer;

var information_score_quizz = {
    Air : { nom : "Air", score : 0 },
    Feu : { nom : "Feu", score : 0 },
    Éléctricité : { nom : "Éléctricté", score : 0 },
    Eau : { nom : "Eau", score : 0 },
    Terre : { nom :  "Terre", score : 0 },
    Énergie : { nom : "Énergie", score : 0 }
};

var information_sur_elements = {
    Air : { lien_img: "https://media2.giphy.com/media/dTfRgwOhX8jIY/giphy.gif", nom: "Air", text: "Un élément calme qui contrairement au feu est loin de ses émotions."},
    Feu : { lien_img: "https://media.giphy.com/media/AHeTfHgVFPHgs/giphy.gif", nom: "Feu", text: "Ceux qui ont comme élément le feu, on souvent le coeur sur la main. Il n'ont pas peur de dire ce qui leur pass par l'esprit."},
    Éléctricité : { lien_img: "https://media.giphy.com/media/Ta1MVGKCG2GFq/giphy.gif", nom: "Éléctricité", text: "L'élément le plus relax qu'il soit. On se demande souvent s'ils savent ce qu'être sérieux est."},
    Eau : { lien_img: "https://thumbs.gfycat.com/PossibleSnoopyHalicore-small.gif", nom: "Eau", text: "Un élément qui va essayé d'épouser ce qui l'entour"},
    Terre : { lien_img: "https://media3.giphy.com/media/aqjck3KGKs5pu/giphy.gif", nom: "Terre", text: "Un élément immouvable. Tétu et dure à faire changer d'opinion"},
    Énergie : {lien_img: "https://i.pinimg.com/originals/9d/a0/02/9da0022d312e5011270c3c19c5feac83.gif", nom: "Énergie", text: "L'énergie ne s'occupe pas rééllement de ce qui se passe autours de lui. Il est dans son propre monde."}
};

var infromation_question = {
    1 : { question: "", reponses : 
                        { 1 : "",
                          2 : "" } }
}

window.addEventListener("load", function() {
    var btn_quizz =  document.getElementsByClassName("btn-quizz");

    image_element_resultat = document.getElementById("udris-image-resultat");
    nom_element_resultat = document.getElementById("udris-resultat-nom");
    description_element_resultat = document.getElementById("udris-description-element");
    containeurs_question = document.getElementsByClassName("containeur-question");
    btn_soumettre_recommencer = document.getElementById("btn-soumettre-recommencer-questionnaire");

    for (var i = 0; i < btn_quizz.length; i++) {
        
        btn_quizz[i].addEventListener("click", function() {
            this.parentElement.classList.toggle("montrer");
        });
    }

    btn_soumettre_recommencer.addEventListener("click", function() {
        SoumettreReponse();
    })
});

function SoumettreReponse() {

    var question = containeurs_question[question_repondu];

    if (question) {

        var questionChoisi = false;

        var choix_de_reponse = question.getElementsByTagName("input");

        for (var i = 0; i < choix_de_reponse.length; i++) {
            
            if (choix_de_reponse[i].checked) {
                questionChoisi = true;

                var valeur_reponse_choisi = choix_de_reponse[i].value.split(",");

                for (var j = 0; j < valeur_reponse_choisi.length; j++) {
                
                    var element_score = valeur_reponse_choisi[j].split(":");
                    information_score_quizz[element_score[0]]["score"] +=  parseInt(element_score[1]);

                }
            }

        }

        if (questionChoisi) {
            question.classList.remove("montrer");

            setTimeout(function() {
                question.nextElementSibling.appendChild(btn_soumettre_recommencer);
                question.nextElementSibling.classList.add("montrer");

                if (question_repondu == containeurs_question.length-1) {
                    btn_soumettre_recommencer.textContent = "Soumettre";
                }
    
                else if (question_repondu == containeurs_question.length) {
                    btn_soumettre_recommencer.textContent = "Recommencer";
    
                    CalculerResultatQuiz();
                }

            }, 1000);

            question_repondu++;
        }

    }

    else {
        
        RecommencerQuiz();

    }

}

function CalculerResultatQuiz() {

    var resultat = "";
    var resultat_occurence = 0;

    for (element in information_score_quizz) {

        var score = information_score_quizz[element]["score"];

        if (score > resultat_occurence) {
            resultat_occurence = score;
            resultat = element;
        }
    }

    image_element_resultat.src = information_sur_elements[resultat]["lien_img"];
    nom_element_resultat.textContent = information_sur_elements[resultat]["nom"];
    description_element_resultat.textContent = information_sur_elements[resultat]["text"];

}

function RecommencerQuiz() {
    
    for (element in information_score_quizz)
        information_score_quizz[element]["score"] = 0;

    question_repondu = 0;
    
    var reponses = document.getElementsByTagName("input");

    for (var i = 0; i < reponses.length; i++) {
        reponses[i].checked = false;
    }

    document.getElementsByClassName("containeur-resultat-quiz")[0].classList.remove("montrer");

    setTimeout(function() {

        containeurs_question[0].classList.add("montrer");
        btn_soumettre_recommencer.textContent = "soumettre";
        containeurs_question[0].appendChild(btn_soumettre_recommencer);
    
    }, 1000);


}