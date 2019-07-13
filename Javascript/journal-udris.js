var present_page_recto;
var containeur_livre_udris;
var livre_udris;
var body;

var ua = window.navigator.userAgent;
var isIE = /MSIE|Trident/.test(ua);

var question_repondu = 0;
var image_element_resultat;
var nom_element_resultat;
var description_element_resultat;
var containeurs_question;
var btn_soumettre_recommencer;

var liens_button_quiz_image = {
    Suivant : "Documents/Images/btn_suivant.png",
    Soumettre : "Documents/Images/btn_soumettre.png",
    Recommencer : "Documents/Images/btn_recommencer.png"
}

var information_score_quizz = {
    Air : { nom : "Air", score : 0 },
    Feu : { nom : "Feu", score : 0 },
    Éléctricité : { nom : "Éléctricté", score : 0 },
    Eau : { nom : "Eau", score : 0 },
    Terre : { nom :  "Terre", score : 0 },
    Énergie : { nom : "Énergie", score : 0 }
};

var information_sur_elements = {
    Air : { lien_img: "https://media2.giphy.com/media/dTfRgwOhX8jIY/giphy.gif", nom: "Air", text: "L'air un élément paisible. Habituellement calme dans la majorité des situations, il prend l'habitude d'analyser tout ce qui l'entoure avant d'agir. Mais faites attention une brise légère peut cacher une tempête."},
    Feu : { lien_img: "https://media.giphy.com/media/AHeTfHgVFPHgs/giphy.gif", nom: "Feu", text: "Si on joue avec le feu ont peu se brûler et il en est de même avec ceux qui ont cet élément. Ils sont reconnus pour leur franchise et cela parce qu'ils sont très proches de leur émotion et ne se gêne pas de dire ce qu'ils pensent."},
    Éléctricité : { lien_img: "https://media.giphy.com/media/Ta1MVGKCG2GFq/giphy.gif", nom: "Éléctricité", text: "Ceux qui ont pour élément l'électricité sont reconnus pour leur vitesse de réaction dans toutes les situations et pour leur énergie qui offre dans groupe. Ils sont souvent relax et prennent les choses à la légère."},
    Eau : { lien_img: "https://thumbs.gfycat.com/PossibleSnoopyHalicore-small.gif", nom: "Eau", text: "Ceux de l'eau s'adaptent à leur environnement et font de leur mieux pour ne pas être mal vu par leur paire. Ils sont souvent à la recherche d'une manière de rendre tous ceux qui les entours heureux et sont souvent des médiateurs."},
    Terre : { lien_img: "https://media3.giphy.com/media/aqjck3KGKs5pu/giphy.gif", nom: "Terre", text: "La terre est ce qui tient tout en place en plus d'être indéplaçable et celui qui a cet élément en fera de même. Il s'agit d'un élément qui une fois une décision prise, il sera difficile de la changer."},
    Énergie : {lien_img: "https://i.pinimg.com/originals/9d/a0/02/9da0022d312e5011270c3c19c5feac83.gif", nom: "Énergie", text: "Le seul élément qui n'a pas de trait de personnalité comme les autres. Ils ont habituellement leur propre manière de penser et deux personnes ayant cet élément pourraient agir de manière complètement opposée."}
};

var infromation_question = {
    1 : { question: "", reponses : 
                        { 1 : "",
                          2 : "" } }
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
    screen.height > screen.width && screen.width < 768 || screen.width > screen.height && screen.height < 768 ) {
        window.location.replace("./mobile-index.html");
}

function TournerLesPages(page_cliquer) {

    if (document.getElementsByClassName("page-qui-tourne").length > 0) {
        return;
    }

    
    if (page_cliquer.classList.contains("recto")) {
        
        present_page_recto.classList.add("page-qui-tourne");
        present_page_recto.classList.remove("recto");
        present_page_recto.classList.add("verso");

        if (livre_udris.classList.contains("page-couverture"))
            livre_udris.classList.remove("page-couverture");

        if (present_page_recto.previousElementSibling == null)
            livre_udris.classList.add("plat-verso");
        
        setTimeout(function () {
            
            present_page_recto.classList.remove("page-qui-tourne");
            present_page_recto.classList.add("page-en-cours-de-lecture");
            
            if (present_page_recto.nextElementSibling != null) {
                present_page_recto.nextElementSibling.classList.remove("page-en-cours-de-lecture");
            }

            if (present_page_recto.previousElementSibling != null) {
                present_page_recto = present_page_recto.previousElementSibling;
            }
            
        }, 500);

    }

    else {
        
        if (present_page_recto.classList.contains("recto")) {
            present_page_recto = present_page_recto.nextElementSibling;

            if (present_page_recto.nextElementSibling == null)
                livre_udris.classList.add("page-couverture");
        }
        else {
            livre_udris.classList.remove("plat-verso");
            containeur_livre_udris.classList.add("ouvert");
        }
        
        present_page_recto.classList.remove("verso");
        present_page_recto.classList.add("page-qui-tourne", "recto");
        
        if (present_page_recto.nextElementSibling != null) {
            present_page_recto.nextElementSibling.classList.add("page-en-cours-de-lecture");
        }
        
        present_page_recto.classList.remove("page-en-cours-de-lecture");
        
        setTimeout(function () {
            
            present_page_recto.classList.remove("page-qui-tourne");
        
        }, 500);

    }
    

}

function RajouterEvenement() {

    if ( isIE ) {
        document.getElementById("containeur-changer-navigateur").style.display = "flex";
    }

    var pages = document.getElementsByClassName("page");

    livre_udris = document.getElementsByClassName("livre-udris")[0];
    containeur_livre_udris = document.getElementById("containeur-livre-udris");

    image_element_resultat = document.getElementById("udris-image-resultat");
    nom_element_resultat = document.getElementById("udris-resultat-nom");
    description_element_resultat = document.getElementById("udris-description-element");
    containeurs_question = document.getElementsByClassName("containeur-question");
    btn_soumettre_recommencer = document.getElementById("containeur-soumettre-recommencer-questionnaire");

    btn_soumettre_recommencer.addEventListener("click", function() {
        SoumettreReponse();
    })

    window.addEventListener("resize", function() { RedimensionnerLivre() });
    
    for (var i = 0; i < pages.length; i++) {

        if (i == pages.length - 1) {
            present_page_recto = pages[i];
        }

        pages[i].classList.add("recto");

        pages[i].addEventListener("click", function(e) { 

            if (e.target.closest(".containeur-questionaire"))
                return;

            TournerLesPages(this);

        });
    }
}

function RedimensionnerLivre() {
    var scale, origin;

    scale = Math.min(
        containeur_livre_udris.offsetWidth / livre_udris.offsetWidth,
        containeur_livre_udris.offsetHeight / livre_udris.offsetHeight
        );
    
    scale = Math.round(scale * 100) / 100;

    livre_udris.style.transform = "scale(" + scale + ")";
}

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
                    btn_soumettre_recommencer.firstElementChild.src = liens_button_quiz_image.Soumettre;
                }
    
                else if (question_repondu == containeurs_question.length) {
                    btn_soumettre_recommencer.firstElementChild.src = liens_button_quiz_image.Recommencer;
    
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

        if (score >= resultat_occurence) {
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
        btn_soumettre_recommencer.firstElementChild.src = liens_button_quiz_image.Suivant;
        containeurs_question[0].appendChild(btn_soumettre_recommencer);
    
    }, 1000);


}

window.addEventListener("load", function() {
    RajouterEvenement();
    RedimensionnerLivre();
});