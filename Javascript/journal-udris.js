function TournerLesPages(page_cliquer) {

    if(page_cliquer.classList.contains("recto")) {

        console.log("c'est une page recto qui a ete toucher");

        var feuille = page_cliquer.parentElement;        
        feuille.classList.add("page-en-cours-de-lecture");
        feuille.classList.add("page-tourner");
        
        if (feuille.previousElementSibling !== null) {
            feuille.previousElementSibling.classList.remove("page-en-cours-de-lecture");
        }

    }
    else {

        console.log("c'est une page verso qui a ete toucher");

        var feuille = page_cliquer.parentElement;
        feuille.classList.remove("page-tourner");
        feuille.classList.remove("page-en-cours-de-lecture");
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