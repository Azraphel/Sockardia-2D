var page_courante;
var containeur_livre_udris;
var livre_udris;
var pages;
var body;
var div_orientation_telephone;

var point_de_commencement_x,
    point_de_commencement_y,
    distance_traverser,
    temps_alloue = 500,
    distance_minimum = 50,
    temps_ecoule,
    temps_debut;


var question_repondu = 0,
    image_element_resultat,
    nom_element_resultat,
    description_element_resultat,
    containeurs_question,
    btn_soumettre_recommencer;

var information_score_quizz = {
    Air : { nom : "Air", score : 0 },
    Feu : { nom : "Feu", score : 0 },
    Électricité : { nom : "Éléctricté", score : 0 },
    Eau : { nom : "Eau", score : 0 },
    Terre : { nom :  "Terre", score : 0 },
    Énergie : { nom : "Énergie", score : 0 }
};

var liens_button_quiz_image = {
    Suivant : "Documents/Images/btn_suivant.png",
    Soumettre : "Documents/Images/btn_soumettre.png",
    Recommencer : "Documents/Images/btn_recommencer.png"
}

var information_sur_elements = {
    Air : { lien_img: "https://media2.giphy.com/media/dTfRgwOhX8jIY/giphy.gif", nom: "Air", text: "L'air un élément paisible. Habituellement calme dans la majorité des situations, il prend l'habitude d'analyser tout ce qui l'entoure avant d'agir. Mais faites attention une brise légère peut cacher une tempête."},
    Feu : { lien_img: "https://media.giphy.com/media/AHeTfHgVFPHgs/giphy.gif", nom: "Feu", text: "Si on joue avec le feu ont peu se brûler et il en est de même avec ceux qui ont cet élément. Ils sont reconnus pour leur franchise et cela parce qu'ils sont très proches de leur émotion et ne se gêne pas de dire ce qu'ils pensent."},
    Électricité : { lien_img: "https://media.giphy.com/media/Ta1MVGKCG2GFq/giphy.gif", nom: "Électricité", text: "Ceux qui ont pour élément l'électricité sont reconnus pour leur vitesse de réaction dans toutes les situations et pour leur énergie qui offre dans groupe. Ils sont souvent relax et prennent les choses à la légère."},
    Eau : { lien_img: "https://thumbs.gfycat.com/PossibleSnoopyHalicore-small.gif", nom: "Eau", text: "Ceux de l'eau s'adaptent à leur environnement et font de leur mieux pour ne pas être mal vu par leur paire. Ils sont souvent à la recherche d'une manière de rendre tous ceux qui les entours heureux et sont souvent des médiateurs."},
    Terre : { lien_img: "https://media3.giphy.com/media/aqjck3KGKs5pu/giphy.gif", nom: "Terre", text: "La terre est ce qui tient tout en place en plus d'être indéplaçable et celui qui a cet élément en fera de même. Il s'agit d'un élément qui une fois une décision prise, il sera difficile de la changer."},
    Énergie : {lien_img: "https://i.pinimg.com/originals/9d/a0/02/9da0022d312e5011270c3c19c5feac83.gif", nom: "Énergie", text: "Le seul élément qui n'a pas de trait de personnalité comme les autres. Ils ont habituellement leur propre manière de penser et deux personnes ayant cet élément pourraient agir de manière complètement opposée."}
};

var infromation_question = {
    1 : { question: "", reponses : 
                        { 1 : "",
                          2 : "" } }
}

function TournerLesPages(direction) {

    if (document.getElementsByClassName("page-en-cours-de-lecture").length > 1)
        return;

    if (direction == 'droite') {

        if (page_courante == pages.length - 1) {
            return;
        }

        pages[page_courante+1].classList.add("page-suivante");

        setTimeout(function() {
            pages[page_courante+1].classList.add("page-en-cours-de-lecture");
            pages[page_courante].classList.add("page-precedente");
            pages[page_courante+1].classList.remove("page-suivante");
        }, 50)

        setTimeout(function() {

            pages[page_courante].classList.remove("page-en-cours-de-lecture");
            page_courante++;

        }, 575);

    }

    else {

        if (page_courante == 0) {
            return;
        }

        pages[page_courante-1].classList.add("page-precedente");

        setTimeout(function() {
            pages[page_courante-1].classList.add("page-en-cours-de-lecture");
            pages[page_courante].classList.add("page-suivante");
            pages[page_courante-1].classList.remove("page-precedente");
        }, 50);

        setTimeout(function() {

            pages[page_courante].classList.remove("page-en-cours-de-lecture");
            page_courante--;

        }, 575);
    }

}

function RajouterEvenement() {
    div_orientation_telephone = document.getElementById("containeur-demande-de-changement-dorientation");
    containeur_livre_udris = document.getElementById("containeur-livre-udris");
    livre_udris = document.getElementById("livre-udris");
    pages = document.getElementsByClassName("page");
    page_courante = 0;

    image_element_resultat = document.getElementById("udris-image-resultat");
    nom_element_resultat = document.getElementById("udris-resultat-nom");
    description_element_resultat = document.getElementById("udris-description-element");
    containeurs_question = document.getElementsByClassName("containeur-question");
    btn_soumettre_recommencer = document.getElementById("containeur-soumettre-recommencer-questionnaire");

    btn_soumettre_recommencer.addEventListener("click", function() {
        SoumettreReponse();
    })

    for (var i = 1; i < pages.length; i++) {
        
        pages[i].classList.add("page-suivante");
    }

    window.addEventListener("orientationchange", function() {ManageurDeRotationDeTelephone()});
    window.addEventListener("resize", function() { RedimensionnerLivre() });
    document.getElementById("btn-precedent").addEventListener("click", function() {TournerLesPages('gauche')});
    document.getElementById("btn-suivant").addEventListener("click", function() {TournerLesPages('droite')});
    window.addEventListener("touchstart", function (e) {InformationDebutToucher(e)});
    window.addEventListener("touchend", function (e) {InformationFinToucher(e)});
    
    ManageurDeRotationDeTelephone();
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

function ManageurDeRotationDeTelephone() {
    switch(window.orientation) {
        case -90:
        case 90:
            div_orientation_telephone.style.display = "flex";
            break;
            
            default:
            div_orientation_telephone.style.display = "none";
            break;
    }
}

function InformationDebutToucher(e) {
    var touchee = e.changedTouches[0];
        distance_traverser = 0;
        point_de_commencement_x = touchee.pageX;
        point_de_commencement_y = touchee.pageY;
        temps_debut = new Date().getTime();
}

function InformationFinToucher(e) {
    var touchee = e.changedTouches[0];
    distance_traverser = touchee.pageX - point_de_commencement_x;
    temps_ecoule = new Date().getTime() - temps_debut;

    if (Math.abs(distance_traverser) >= distance_minimum && temps_ecoule <= temps_alloue) {
        TournerLesPages((distance_traverser > 0 ? 'gauche' : 'droite'));
    }
}

function SoumettreReponse() {

    var question = containeurs_question[question_repondu];

    if (question) {

        var questionChoisi = false;

        var choix_de_reponse = question.getElementsByTagName("input");

        if (choix_de_reponse.length == 0)
            questionChoisi = true;

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
        btn_soumettre_recommencer.firstElementChild.src = liens_button_quiz_image.Suivant;
        containeurs_question[0].appendChild(btn_soumettre_recommencer);
    
    }, 1000);

}

window.addEventListener("load", function() {
    RajouterEvenement();
    RedimensionnerLivre();
});