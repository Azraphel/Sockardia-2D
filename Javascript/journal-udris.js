var presentPageRecto;
var containeurLivreUdris;
var livreUdris;

var user_agent = window.navigator.userAgent;
var navigateur_internet_explorer = /MSIE|Trident/.test(user_agent);
var navigateur_safari = /^((?!chrome|android).)*safari/i.test(user_agent);

var nbrQuestionRepondu = 0;

var containerExplicationQuestionnaire;

var divBarProgression;
var containeurQuestionReponse;
var question;
var EntreReponseOui;
var EntreReponseNon;

var containeurResultatQuestionnaire;
var imgResultatElement;
var elNomResultatElement;
var elDescriptionResultatElement;

var btnQuestionnaireElement;

var point_de_commencement_x,
    point_de_commencement_y,
    distance_traverser,
    temps_alloue = 500,
    distance_minimum = 50,
    temps_ecoule,
    temps_debut;


function CreerPagesAvecText() {
    var divFragment = document.createDocumentFragment();
    var infoElementPage = CreerPage();
    var boolVerso;
    
    for ( var paragraphe in objTextLivre) {
        
        RajouterTextPage(objTextLivre[paragraphe]);

        if (boolVerso) {

            divFragment.appendChild(infoElementPage.page);
            infoElementPage = CreerPage();
            boolVerso = false;

        }
        else {
            boolVerso = true;
        }
        
    } 
    
    if (infoElementPage.recto.textContent != '') {
        divFragment.appendChild(infoElementPage.page);
    }

    var tabPagesCouverture = document.getElementsByClassName('page');
    var pagePlatVerso = tabPagesCouverture[tabPagesCouverture.length - 1];

    livreUdris.insertBefore(divFragment, pagePlatVerso);

    function CreerPage() {
        var divPage;
        var divRecto;
        var divVerso;
            
        var divPage = document.createElement('div');
            divPage.className ='page page-simple';
    
        var divRecto = document.createElement('div');
            divRecto.className = 'recto';
            divPage.appendChild(divRecto);
    
        var divVerso = document.createElement('div');
            divVerso.className = 'verso';
            divPage.appendChild(divVerso);
    
        return {
                page : divPage,
                recto : divRecto,
                verso : divVerso
                };
    
    }

    //Creer div containeur paragraphe avec text et date paragraphe
    // return un object avec le containeur et le paragraphe du text
    function CreerContaineurParagraphe(paragraphe) {
        var divContaineurParagraphe = document.createElement('div');
            divContaineurParagraphe.className = 'containeur-paragraphe';
        
        //s'il s'agit d'un object, il faut rajouter la date
        if (paragraphe.date) {

            var date = document.createElement('b');
                date.textContent = paragraphe.date;
                divContaineurParagraphe.appendChild(date);
        
        }

        //Creer le paragraphe avec le text. si paragraphe est juste de text le rajouter sinon prendre le text de l'object
        var paragrapheText = document.createElement('p');
            paragrapheText.textContent = (paragraphe.date ? paragraphe.text : paragraphe);
            divContaineurParagraphe.appendChild(paragrapheText);

        return {
            containeur: divContaineurParagraphe,
            paragraphe: paragrapheText
        }
    }

    function RajouterTextPage(paragraphe) {

        var infoElementParagraphe = CreerContaineurParagraphe(paragraphe);

        var tabParagrapheText = infoElementParagraphe.paragraphe.textContent.split(' ');
        var boolTextAjouter;
        var textARajouter;

        for (var i = tabParagrapheText.length; i >= 0 && !boolTextAjouter; i--) {
            infoElementParagraphe.paragraphe.textContent = tabParagrapheText.slice(0, i).join(' ');
            
            if ( VerifierTailleContenuPage(infoElementParagraphe)) {

                infoElementPage[(boolVerso ? 'verso' : 'recto')].appendChild(infoElementParagraphe.containeur);
                boolTextAjouter = true;
                
                if ( i < tabParagrapheText.length - 1)
                    textARajouter = tabParagrapheText.slice(i).join(' ');
                else
                    textARajouter = null;

            }

        }

        if ((boolTextAjouter && textARajouter) ||
            !boolTextAjouter) {

                if (boolVerso) {
                    
                    //met la apge qu'on a deja dans le livre
                    var nombreChildNode = livreUdris.childNodes.length;
                    var dernierElementLivre = livreUdris.childNodes[nombreChildNode - 1];
                    divFragment.appendChild(infoElementPage.page);
                    
                    infoElementPage = CreerPage();
                    boolVerso = false;
        
                }
        
                //sinon on tourne la page et on place le text sur le verso
                else {

                    boolVerso = true;

                }
                


            RajouterTextPage((textARajouter ? textARajouter : paragraphe));
        }
    }

    function VerifierTailleContenuPage(infoElementParagraphe) {
        
        var testDivPage = infoElementPage.page.cloneNode(true);
            testDivPage.className += ' test';
            
        var testZoneText = testDivPage.getElementsByClassName(boolVerso ? 'verso' : 'recto')[0];
            testZoneText.appendChild(infoElementParagraphe.containeur);
        
        livreUdris.appendChild(testDivPage);

        var divPageBottom = testDivPage.getBoundingClientRect().bottom;
        var containeurParagrapheBottom = infoElementParagraphe.containeur.getBoundingClientRect().bottom;
        
        testDivPage.remove();


        return (containeurParagrapheBottom <= divPageBottom);
    }

}

function VerifierContenuPage() {
    CreerPagesAvecText();

    var containeurParagrapheCreer = document.getElementsByClassName('containeur-paragraphe');
    var mauvaiseTailleParagraphe = false;

    for (var i = 0; i < containeurParagrapheCreer.length - 1; i++) {
        var containeurBottom = containeurParagrapheCreer[i].getBoundingClientRect().bottom;
        var parentContaineurBottom = containeurParagrapheCreer[i].parentElement.getBoundingClientRect().bottom;

        if (containeurBottom > parentContaineurBottom) {
            mauvaiseTailleParagraphe = true;
        }
    }

    if (mauvaiseTailleParagraphe) {
        var pageCreer = document.getElementsByClassName('page-simple');

        for (var i = 0; i < pageCreer.length - 1; i++) {
            pageCreer[i].remove();
        }

        

        VerifierContenuPage();
    }
    else {

        var pages = document.getElementsByClassName("page");        

        for (var i = 0; i < pages.length; i++) {

            if (i == 0) {
                presentPageRecto = pages[i];
            }
    
            pages[i].classList.add("recto");

            if (isMobile.phone) {

                    pages[i].addEventListener("touchstart", function(e) { InformationDebutToucher(e) });
                    pages[i].addEventListener("touchend", function(e) { InformationFinToucher(this, e) });

            }
    
            else {
    
                pages[i].addEventListener("click", function(e) { 
        
                    if (e.target.closest("#containeur-questionaire"))
                        return;
        
                    TournerLesPages(this);
        
                });

            }
        }

    }

    function InformationDebutToucher(e) {
        var touchee = e.changedTouches[0];
            distance_traverser = 0;
            point_de_commencement_x = touchee.pageX;
            point_de_commencement_y = touchee.pageY;
            temps_debut = new Date().getTime();
    }
    
    function InformationFinToucher(pageToucher, e) {
        var touchee = e.changedTouches[0];
        distance_traverser = touchee.pageX - point_de_commencement_x;
        temps_ecoule = new Date().getTime() - temps_debut;

        if (Math.abs(distance_traverser) >= distance_minimum && temps_ecoule <= temps_alloue) {
            TournerLesPages(pageToucher, (distance_traverser > 0 ? 'gauche' : 'droite'));
        }
    }

}

function RajouterEvenement() {

    livreUdris = document.getElementsByClassName("livre-udris")[0];
    containeurLivreUdris = document.getElementById("containeur-livre-udris");

    containerExplicationQuestionnaire = document.getElementById("containeur-explication-questionnaire");

    divBarProgression = document.getElementById("bar-progression");
    containeurQuestionReponse = document.getElementById("containeur-question-reponse");
    question = document.getElementById("question");
    EntreReponseOui = document.getElementById("questionnaire-element-reponse-oui");
    EntreReponseNon = document.getElementById("questionnaire-element-reponse-non");

    containeurResultatQuestionnaire = document.getElementById("containeur-resultat-quiz");
    imgResultatElement = document.getElementById("udris-resultat-image");
    elNomResultatElement = document.getElementById("udris-resultat-nom");
    elDescriptionResultatElement = document.getElementById("udris-description-element");
    
    btnQuestionnaireElement = document.getElementById("btn-soumettre-recommencer-questionnaire").firstElementChild;

    var icon_media = document.getElementsByClassName("icon-social-media");

    btnQuestionnaireElement.addEventListener("click", function() {SoumettreReponse();})

    window.addEventListener("resize", function() { RedimensionnerLivre() });

    for (var i = 0; i < icon_media.length; i++) {
        icon_media[i].addEventListener("click", function() {OuvrirReseauSociaux(this)});
    }
}

function RedimensionnerLivre() {
    var scale, scaleX = 1, scaleY = 1;

    scaleX = containeurLivreUdris.offsetWidth / livreUdris.offsetWidth;
    scaleY = containeurLivreUdris.offsetHeight / livreUdris.offsetHeight;

    scale = (scaleX > scaleY ? scaleX : scaleY);

    livreUdris.setAttribute('style', '-webkit-transform:scale(' + scale + ');');
}

function TournerLesPages(page_cliquer, direction) {

    if (document.getElementsByClassName("page-qui-tourne").length > 0) {
        return;
    }
    
    if (direction == null && page_cliquer.classList.contains("recto") || direction && direction == 'droite') {
        
        presentPageRecto.classList.add("page-qui-tourne");
        presentPageRecto.classList.remove("recto");
        presentPageRecto.classList.add("verso");

        if (livreUdris.classList.contains("page-couverture"))
            livreUdris.classList.remove("page-couverture");

        if (presentPageRecto.nextElementSibling == null)
            livreUdris.classList.add("plat-verso");

        if (!livreUdris.classList.contains('plat-verso')) {
            presentPageRecto.nextElementSibling.classList.add('page-en-cours-de-lecture');
        }
        
        setTimeout(function () {
            
            presentPageRecto.classList.remove("page-qui-tourne");
            presentPageRecto.classList.add("page-en-cours-de-lecture");
            
            if (presentPageRecto.previousElementSibling != null) {
                presentPageRecto.previousElementSibling.classList.remove("page-en-cours-de-lecture");
            }

            if (presentPageRecto.nextElementSibling != null) {
                presentPageRecto = presentPageRecto.nextElementSibling;
            }
            
        }, 500);

    }

    else if (!direction || direction && direction == 'gauche') {
        
        if (presentPageRecto.classList.contains("recto")) {
            presentPageRecto = presentPageRecto.previousElementSibling;

            if (presentPageRecto.previousElementSibling == null)
                livreUdris.classList.add("page-couverture");

        }
        else {
            livreUdris.classList.remove("plat-verso");
            containeurLivreUdris.classList.add("ouvert");
        }
        
        presentPageRecto.classList.remove("verso");
        presentPageRecto.classList.add("page-qui-tourne", "recto");
        
        if (presentPageRecto.previousElementSibling != null) {
            presentPageRecto.previousElementSibling.classList.add("page-en-cours-de-lecture");
        }
        
        setTimeout(function () {
            
            presentPageRecto.classList.remove("page-qui-tourne");

            if (presentPageRecto.nextElementSibling != null)
                presentPageRecto.nextElementSibling.classList.remove("page-en-cours-de-lecture");
        
        }, 750);
    }

}

function SoumettreReponse() {

    if (containerExplicationQuestionnaire.classList.contains("montrer")) {
        
        containerExplicationQuestionnaire.classList.remove("montrer");

        MettreAJourQuestionDuQuestionnaire();
        
        setTimeout(function(){
            containeurQuestionReponse.insertBefore(btnQuestionnaireElement.parentElement, divBarProgression.parentElement);
            containeurQuestionReponse.classList.add("montrer");
        }, 1000);

    }

    else if (containeurQuestionReponse.classList.contains("montrer")) {

        if (EntreReponseOui.checked || EntreReponseNon.checked) {
            containeurQuestionReponse.classList.remove("montrer");
            nbrQuestionRepondu++;

            var reponse_choisi = EntreReponseOui.checked ? EntreReponseOui : EntreReponseNon,
                valeur_reponse_choisi = reponse_choisi.value.split(",");

            objRepondantCaracteristique[valeur_reponse_choisi[0]][valeur_reponse_choisi[1]]++;

            reponse_choisi.checked = false;

            setTimeout(function(){

                if (nbrQuestionRepondu < nombreQuestion) {
                    if (nbrQuestionRepondu == nombreQuestion - 1)
                        btnQuestionnaireElement.src = objButtonQuiz.Soumettre;

                        MettreAJourQuestionDuQuestionnaire();
                        containeurQuestionReponse.classList.add("montrer");
                }

                else {
                    btnQuestionnaireElement.src = objButtonQuiz.Recommencer;
                    containeurResultatQuestionnaire.appendChild(btnQuestionnaireElement.parentElement);
                    CalculerResultatQuiz();
                    containeurResultatQuestionnaire.classList.add("montrer");
                }

            }, 1000);
        }

    }

    else if (containeurResultatQuestionnaire.classList.contains("montrer")) {
        RecommencerQuiz();
    }

}

function MettreAJourQuestionDuQuestionnaire() {
    var type_de_question,
        valeur_question,
        valeur_reponse_question;

    question.textContent = objQuestionQuestionnaire[nbrQuestionRepondu]["question_text"];
    type_de_question = objQuestionQuestionnaire[nbrQuestionRepondu]["type"].split(",")[0];
    valeur_question = objQuestionQuestionnaire[nbrQuestionRepondu]["type"].split(",")[1];
    valeur_reponse_question = type_de_question + ",";
    
    EntreReponseOui.value = valeur_reponse_question + valeur_question;

    if (type_de_question == "jugement")
        EntreReponseNon.value = valeur_reponse_question + (valeur_question == "penseur" ? "emotionel" : "penseur");

    else if (type_de_question == "social")
        EntreReponseNon.value = valeur_reponse_question + (valeur_question == "introverti" ? "extraverti" : "introverti");

    var pourcentageProgressionQuestion = Math.round(nbrQuestionRepondu / (nombreQuestion-1) * 100) + '%';
    divBarProgression.textContent = pourcentageProgressionQuestion;
    divBarProgression.style.width = pourcentageProgressionQuestion;
}

function CalculerResultatQuiz() {
    var pointage_jugement = objRepondantCaracteristique.jugement.emotionel - objRepondantCaracteristique.jugement.penseur,
        pointage_social = objRepondantCaracteristique.social.extraverti - objRepondantCaracteristique.social.introverti;

    var resultat_scoial = pointage_social > 0 ? "extraverti" : "introverti";
    var resultat_jugement = pointage_jugement <= 1 && pointage_jugement >= -1 ? "special" : pointage_jugement > 0 ? "emotionel" : "penseur";

    var resultat = objCaracteristiqueElement[resultat_scoial][resultat_jugement];
    
    elNomResultatElement.textContent = objDescriptionElement[resultat]["nom"];
    imgResultatElement.src = objDescriptionElement[resultat]["image"];
    elDescriptionResultatElement.textContent = objDescriptionElement[resultat]["text"];

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

    nbrQuestionRepondu = 0;

    containeurResultatQuestionnaire.classList.remove("montrer");

    setTimeout(function() {

        btnQuestionnaireElement.src = objButtonQuiz.Suivant;

        containerExplicationQuestionnaire.appendChild(btnQuestionnaireElement.parentElement);
        containerExplicationQuestionnaire.classList.add("montrer");
    
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
    VerifierContenuPage();
});