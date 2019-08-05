var present_page_recto;
var containeur_livre_udris;
var livre_udris;
var body;

var user_agent = window.navigator.userAgent;
var navigateur_internet_explorer = /MSIE|Trident/.test(user_agent);
var appareil_telephone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(user_agent);
var navigateur_safari = /^((?!chrome|android).)*safari/i.test(user_agent);

var question_repondu = 0;

var container_explication_questionnaire;

var containeurs_question_et_reponse;
var question;
var choix_reponse_oui;
var choix_reponse_non;

var container_resultat_questionnaire;
var image_element_resultat;
var nom_element_resultat;
var description_element_resultat;

var btn_soumettre_recommencer;

var liens_button_quiz_image = {
    Suivant : "Documents/Images/btn_suivant.png",
    Soumettre : "Documents/Images/btn_soumettre.png",
    Recommencer : "Documents/Images/btn_recommencer.png"
}

var resultat_questionnaire = {
    jugement: {
        penseur: 0,
        emotionel: 0
    },
    
    social: {
        introverti: 0,
        extraverti: 0
    }
};

var informations_questions = {

    0 : {
        type: "social,extraverti",
        question_text: "Avez-vous de la facilité à approcher des inconnus?"
    },

    1 : {
        type:"jugement,penseur",
        question_text: "Est-il dur pour vous de prendre des décisions sans tous les faits?"
    },
    
    2 : {
        type:"social,introverti",
        question_text: "Êtes-vous attiré par les lieux calmes et peu peuplés?"
    },    

    3 : {
        type:"jugement,emotionel",
        question_text: "Est-il facile pour vous de commencer un projet sans le planifier?"
    },
    
    4 : {
        type:"social,extraverti",
        question_text: "Aimez-vous faire souvent la fête?"
    },

    5 : {
        type:"jugement,penseur",
        question_text: "Faites-vous des rêves très près de la réalité?"
    },
    
    6 : {
        type:"social,introverti",
        question_text: "Avez-vous besoin de moment seul pour recharger vos «batteries»?"
    },
    
    7 : {
        type:"jugement,emotionel",
        question_text: "Écoutez-vous votre coeur lorsque vous prenez des décisions?"
    },

    8 : {
        type:"social,extraverti",
        question_text: "Aimez-vous être le centre de l'attention?"
    },
    
    9 : {
        type:"jugement,penseur",
        question_text: "Préférez-vous travailler sur des sujets que vous pouvez toucher?"
    },
}
var nombre_total_de_question = Object.keys(informations_questions).length;

var element_selon_resultat = {
    
    introverti : {
        emotionel : "Eau",
        penseur : "Air",
        special : "Énergie"
    },

    extraverti : {
        emotionel : "Feu",
        penseur : "Terre",
        special : "Électricité"
    }
}

var information_sur_elements = {
    Air : { 
        nom: "Air",
        text: "Ceux qui sont identifiés à cet élément sont habituellement très calme. Ils sont souvent dans leur bulle. Malgré qui ne communique pas beaucoup, ils analysent beaucoup tout ce qui les entoure pour en tirer leur conclusion."
    },

    Feu : {
        nom: "Feu",
        text: "Si on joue avec le feu ont peu se brûler et il en est de même avec ceux qui ont cet élément. Ils sont reconnus pour leur franchise et cela parce qu'ils sont très proches de leur émotion et ne se gêne pas de dire ce qu'ils pensent."
    },

    Électricité : {
        nom: "Électricité",
        text: "Ceux qui ont pour élément l'électricité sont reconnus pour leur vitesse de réaction et d'analyse dans toutes les situations et pour leur énergie qui offre dans groupe. Ils sont souvent relax et prennent les choses à la légère."
    },

    Eau : {
        nom: "Eau",
        text: "Ceux de l'eau s'adaptent à leur environnement. Il est dur de savoir ce qu'ils pensent réellement, mais grâce à leur action, il est facile de savoir qu'il s'agit d'être très empathique et qu'il est affecté par la manière que les autres se sentent."
    },

    Terre : {
        nom: "Terre",
        text: "La terre est ce qui tient tout en place en plus d'être indéplaçable et celui qui a cet élément en fera de même. Il s'agit d'un élément qui une fois une décision prise, il sera difficile de la changer. Ses décisions sont habituellement fondées."
    },

    Énergie : {
        nom: "Énergie",
        text: "Ce sont des êtres assez mystérieux. Ils ont habituellement leur propre manière de percevoir le monde. Il est dur d'en tirer un hors de ses pensées. Ils semblent réagir ce qui se passe présentement tout en analysant ce qui arrivera dans le futur."
    }
};

if( (appareil_telephone && screen.height > screen.width && screen.width < 700 || screen.width > screen.height && screen.height < 700)) {
        window.location.replace("./m-index.html");
}

function RajouterEvenement() {

    var pages = document.getElementsByClassName("page");

    livre_udris = document.getElementsByClassName("livre-udris")[0];
    containeur_livre_udris = document.getElementById("containeur-livre-udris");

    container_explication_questionnaire = document.getElementById("containeur-explication-questionnaire");

    containeurs_question_et_reponse = document.getElementById("containeur-question-reponse");
    question = document.getElementById("question");
    choix_reponse_oui = document.getElementById("questionnaire-element-reponse-oui");
    choix_reponse_non = document.getElementById("questionnaire-element-reponse-non");

    container_resultat_questionnaire = document.getElementById("containeur-resultat-quiz");
    image_element_resultat = document.getElementById("udris-image-resultat");
    nom_element_resultat = document.getElementById("udris-resultat-nom");
    description_element_resultat = document.getElementById("udris-description-element");
    
    btn_soumettre_recommencer = document.getElementById("btn-soumettre-recommencer-questionnaire").firstElementChild;


    var icon_media = document.getElementsByClassName("icon-social-media");

    btn_soumettre_recommencer.addEventListener("click", function() {SoumettreReponse();})

    window.addEventListener("resize", function() { RedimensionnerLivre() });
    
    for (var i = 0; i < pages.length; i++) {

        if (i == pages.length - 1) {
            present_page_recto = pages[i];
        }

        pages[i].classList.add("recto");

        pages[i].addEventListener("click", function(e) { 

            if (e.target.closest("#containeur-questionaire"))
                return;

            TournerLesPages(this);

        });
    }

    for (var i = 0; i < icon_media.length; i++) {
        icon_media[i].addEventListener("click", function() {OuvrirReseauSociaux(this)});
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

            resultat_questionnaire[valeur_reponse_choisi[0]][valeur_reponse_choisi[1]]++;

            reponse_choisi.checked = false;

            setTimeout(function(){

                if (question_repondu < nombre_total_de_question) {
                    if (question_repondu == nombre_total_de_question - 1)
                        btn_soumettre_recommencer.src = liens_button_quiz_image.Soumettre;

                        MettreAJourQuestionDuQuestionnaire();
                        containeurs_question_et_reponse.classList.add("montrer");
                }

                else {
                    btn_soumettre_recommencer.src = liens_button_quiz_image.Recommencer;
                    container_resultat_questionnaire.appendChild(btn_soumettre_recommencer.parentElement);
                    CalculerResultatQuiz();
                    container_resultat_questionnaire.classList.add("montrer");
                }

            }, 1000);
        }

    }

    else if (container_resultat_questionnaire.classList.contains("montrer")) {
        RecommencerQuiz();
    }

}

function MettreAJourQuestionDuQuestionnaire() {
    var type_de_question,
        valeur_question,
        valeur_reponse_question;

    question.textContent = informations_questions[question_repondu]["question_text"];
    type_de_question = informations_questions[question_repondu]["type"].split(",")[0];
    valeur_question = informations_questions[question_repondu]["type"].split(",")[1];
    valeur_reponse_question = type_de_question + ",";
    
    choix_reponse_oui.value = valeur_reponse_question + valeur_question;

    if (type_de_question == "jugement")
        choix_reponse_non.value = valeur_reponse_question + (valeur_question == "penseur" ? "emotionel" : "penseur");

    else if (type_de_question == "social")
        choix_reponse_non.value = valeur_reponse_question + (valeur_question == "introverti" ? "extraverti" : "introverti");
}

function CalculerResultatQuiz() {
    var pointage_jugement = resultat_questionnaire.jugement.emotionel - resultat_questionnaire.jugement.penseur,
        pointage_social = resultat_questionnaire.social.extraverti - resultat_questionnaire.social.introverti;

    var resultat_scoial = pointage_social > 0 ? "extraverti" : "introverti";
    var resultat_jugement = pointage_jugement <= 1 && pointage_jugement >= -1 ? "special" : pointage_jugement > 0 ? "emotionel" : "penseur";

    var resultat = element_selon_resultat[resultat_scoial][resultat_jugement];
    
    nom_element_resultat.textContent = information_sur_elements[resultat]["nom"];
    description_element_resultat.textContent = information_sur_elements[resultat]["text"];

}

function RecommencerQuiz() {
    
    for (type_social in resultat_questionnaire) {

        if (!resultat_questionnaire.hasOwnProperty(type_social))
            continue;

        object_social = resultat_questionnaire[type_social];

        for (type_jugement in object_social) {
            
            if (!object_social.hasOwnProperty(type_jugement)) 
                continue;

            object_social[type_jugement] = 0;

        }
        
    }

    question_repondu = 0;

    container_resultat_questionnaire.classList.remove("montrer");

    setTimeout(function() {

        btn_soumettre_recommencer.src = liens_button_quiz_image.Suivant;

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
        
        if ( navigateur_internet_explorer || navigateur_safari) {
            document.getElementById("containeur-information").textContent = "Veuillez utilisez un navigateur plus récent tel que: Brave, Firefox, Chrome ou Edge.";
        }
        else {
            document.getElementById("containeur-information").style.display = "none";
        }

    }, 1000);
    
    RajouterEvenement();
    RedimensionnerLivre();
});