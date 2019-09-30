var page_courante;
var containeur_livre_udris;
var livre_udris;
var pages;
var body;
var containeur_information;

var point_de_commencement_x,
    point_de_commencement_y,
    distance_traverser,
    temps_alloue = 500,
    distance_minimum = 50,
    temps_ecoule,
    temps_debut;


var question_repondu = 0;

var container_explication_questionnaire;

var containeurs_question_et_reponse;
var question;
var choix_reponse_oui;
var choix_reponse_non;

var container_objRepondantCaracteristique;
var image_element_resultat;
var nom_element_resultat;
var description_element_resultat;

var btn_soumettre_recommencer;

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
    containeur_information = document.getElementById("containeur-information");
    containeur_livre_udris = document.getElementById("containeur-livre-udris");
    livre_udris = document.getElementById("livre-udris");
    pages = document.getElementsByClassName("page");
    page_courante = 0;

    container_explication_questionnaire = document.getElementById("containeur-explication-questionnaire");

    containeurs_question_et_reponse = document.getElementById("containeur-question-reponse");
    question = document.getElementById("question");
    choix_reponse_oui = document.getElementById("questionnaire-element-reponse-oui");
    choix_reponse_non = document.getElementById("questionnaire-element-reponse-non");

    container_objRepondantCaracteristique = document.getElementById("containeur-resultat-quiz");
    image_element_resultat = document.getElementById("udris-image-resultat");
    nom_element_resultat = document.getElementById("udris-resultat-nom");
    description_element_resultat = document.getElementById("udris-description-element");
    
    btn_soumettre_recommencer = document.getElementById("btn-soumettre-recommencer-questionnaire").firstElementChild;

    var icon_media = document.getElementsByClassName("icon-social-media");

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
    
    for (var i = 0; i < icon_media.length; i++) {
        icon_media[i].addEventListener("click", function() {OuvrirReseauSociaux(this)});
    }
    
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
            containeur_information.style.display = "flex";
            break;
            
            default:
            containeur_information.style.display = "none";
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

    if (container_explication_questionnaire.classList.contains("montrer")) {
        
        container_explication_questionnaire.classList.remove("montrer");

        MettreAJourQuestionDuQuestionnaire();
        
        setTimeout(function(){
            containeurs_question_et_reponse.appendChild(btn_soumettre_recommencer.parentElement);
            containeurs_question_et_reponse.classList.add("montrer");
        }, 1000);

    }

    else if (containeurs_question_et_reponse.classList.contains("montrer")) {

        if (choix_reponse_oui.checked || choix_reponse_non.checked) {
            containeurs_question_et_reponse.classList.remove("montrer");
            question_repondu++;

            var reponse_choisi = choix_reponse_oui.checked ? choix_reponse_oui : choix_reponse_non,
                valeur_reponse_choisi = reponse_choisi.value.split(",");

            objRepondantCaracteristique[valeur_reponse_choisi[0]][valeur_reponse_choisi[1]]++;

            reponse_choisi.checked = false;

            setTimeout(function(){

                if (question_repondu < nombreQuestion) {
                    if (question_repondu == nombreQuestion - 1)
                        btn_soumettre_recommencer.src = objButtonQuiz.Soumettre;

                        MettreAJourQuestionDuQuestionnaire();
                        containeurs_question_et_reponse.classList.add("montrer");
                }

                else {
                    btn_soumettre_recommencer.src = objButtonQuiz.Recommencer;
                    container_objRepondantCaracteristique.appendChild(btn_soumettre_recommencer.parentElement);
                    CalculerResultatQuiz();
                    container_objRepondantCaracteristique.classList.add("montrer");
                }

            }, 1000);
        }

    }

    else if (container_objRepondantCaracteristique.classList.contains("montrer")) {
        RecommencerQuiz();
    }

}

function MettreAJourQuestionDuQuestionnaire() {
    var type_de_question,
        valeur_question,
        valeur_reponse_question;

    question.textContent = objQuestionQuestionnaire[question_repondu]["question_text"];
    type_de_question = objQuestionQuestionnaire[question_repondu]["type"].split(",")[0];
    valeur_question = objQuestionQuestionnaire[question_repondu]["type"].split(",")[1];
    valeur_reponse_question = type_de_question + ",";
    
    choix_reponse_oui.value = valeur_reponse_question + valeur_question;

    if (type_de_question == "jugement")
        choix_reponse_non.value = valeur_reponse_question + (valeur_question == "penseur" ? "emotionel" : "penseur");

    else if (type_de_question == "social")
        choix_reponse_non.value = valeur_reponse_question + (valeur_question == "introverti" ? "extraverti" : "introverti");
}

function CalculerResultatQuiz() {
    var pointage_jugement = objRepondantCaracteristique.jugement.emotionel - objRepondantCaracteristique.jugement.penseur,
        pointage_social = objRepondantCaracteristique.social.extraverti - objRepondantCaracteristique.social.introverti;

    var resultat_scoial = pointage_social > 0 ? "extraverti" : "introverti";
    var resultat_jugement = pointage_jugement <= 1 && pointage_jugement >= -1 ? "special" : pointage_jugement > 0 ? "emotionel" : "penseur";

    var resultat = objCaracteristiqueElement[resultat_scoial][resultat_jugement];
    
    nom_element_resultat.textContent = objDescriptionElement[resultat]["nom"];
    description_element_resultat.textContent = objDescriptionElement[resultat]["text"];

}

function RecommencerQuiz() {
    
    for (type_social in objRepondantCaracteristique) {

        if (!objRepondantCaracteristique.hasOwnProperty(type_social))
            continue;

        object_social = objRepondantCaracteristique[type_social];

        for (type_jugement in object_social) {
            
            if (!object_social.hasOwnProperty(type_jugement)) 
                continue;

            object_social[type_jugement] = 0;

        }
        
    }

    question_repondu = 0;

    container_objRepondantCaracteristique.classList.remove("montrer");

    setTimeout(function() {

        btn_soumettre_recommencer.src = objButtonQuiz.Suivant;

        container_explication_questionnaire.appendChild(btn_soumettre_recommencer.parentElement);
        container_explication_questionnaire.classList.add("montrer");
    
    }, 1000);


}

function OuvrirReseauSociaux(icon_toucher) {
    var icon_toucher_media = icon_toucher.id.replace('icon-', '');
    
    var nouveau_onglet;
    nouveau_onglet = window.open('https://' + icon_toucher_media + '.com/sockardia', '_blank');
    nouveau_onglet.focus();
}

window.addEventListener("load", function() {

    setTimeout(function() {
        
        containeur_information.textContent = "Veuillez changer l'orientation de votre téléphone pour portrait.";
        
    }, 1000);

    RajouterEvenement();
    RedimensionnerLivre();
});