function TournerLesPages(page_cliquer) {

    if(page_cliquer.classList.contains("recto")) {

        console.log("c'est une page recto qui a ete toucher");

        var feuille = page_cliquer.parentElement;
        //feuille.classList.remove("page-retourner");        
        feuille.classList.add("page-tourner", "page-qui-tourne");
        
        setTimeout(function() {

            feuille.classList.remove("page-qui-tourne");
        
        }, 2000);
        
        if (feuille.nextElementSibling != null) {

            setTimeout(function() {
                feuille.nextElementSibling.classList.remove("page-en-cours-de-lecture");
                feuille.classList.add("page-en-cours-de-lecture");
            }, 2000);
        }

    }
    else {

        /*
            Le probl'eme semble se trouver dans la durer pour la transition
            on peut chercher un moyen de donner la dur/ de transition de 0
            mais même à cela. Il y a quelques chose qui ne fait pas de sens
            dans cette affaire là. Pourquoi seulement lorsque tout se trouve
            dans le timeout que ça marche?
        */

        console.log("c'est une page verso qui a ete toucher");

        var feuille = page_cliquer.parentElement;

        feuille.classList.add("page-qui-tourne");
        //feuille.classList.remove("page-en-cours-de-lecture");
        
        
        setTimeout(function() {
            feuille.classList.remove("page-tourner");

            feuille.nextElementSibling.classList.remove("page-qui-tourne");
            
            if (feuille.nextElementSibling != null) {
    
                feuille.nextElementSibling.classList.add("page-en-cours-de-lecture");
            }

        }, 10);

    }

}

function RajouterEvenement() {
    var pages_recto = document.getElementsByClassName("recto");
    var pages_verso = document.getElementsByClassName("verso");
    
    for (var i = 0; i < pages_recto.length; i++) {
        page_recto = pages_recto[i];
        page_recto.addEventListener("click", function() { TournerLesPages(this) });
    }

    for (var i = 0; i < pages_verso.length; i++) {
        page_verso = pages_verso[i];
        page_verso.addEventListener("click", function() { TournerLesPages(this) });
    }
}

window.addEventListener("load", function() {
    RajouterEvenement();
});