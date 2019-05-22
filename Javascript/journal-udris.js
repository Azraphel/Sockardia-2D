var present_page_recto;
var livre_udris;

function TournerLesPages(page_cliquer) {

    if (document.getElementsByClassName("page-qui-tourne").length > 0) {
        return;
    }

    
    if (page_cliquer.classList.contains("recto")) {
        
        present_page_recto.classList.add("page-qui-tourne");
        present_page_recto.classList.remove("recto");
        present_page_recto.classList.add("verso");

        if (livre_udris.classList.contains("page-couverture")) {
            livre_udris.classList.remove("page-couverture");
        }

        if (present_page_recto.previousElementSibling == null) {
            livre_udris.classList.add("plat-verso");
        }
        
        setTimeout(function () {
            
            present_page_recto.classList.remove("page-qui-tourne");
            present_page_recto.classList.add("page-en-cours-de-lecture");
            
            if (present_page_recto.nextElementSibling != null) {
                present_page_recto.nextElementSibling.classList.remove("page-en-cours-de-lecture");
            }

            if (present_page_recto.previousElementSibling != null) {
                present_page_recto = present_page_recto.previousElementSibling;
            }
            
        }, 1000);

    }

    else {
        
        if (present_page_recto.classList.contains("recto")) {
            present_page_recto = present_page_recto.nextElementSibling;

            if (present_page_recto.nextElementSibling == null)
                livre_udris.classList.add("page-couverture");
        }
        else {
            livre_udris.classList.remove("plat-verso");
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
    livre_udris = document.getElementsByClassName("livre-udris")[0];
    var pages = document.getElementsByClassName("page");
    
    for (var i = 0; i < pages.length; i++) {

        if (i == pages.length - 1) {
            present_page_recto = pages[i];
        }

        pages[i].classList.add("recto");
        pages[i].addEventListener("click", function() { TournerLesPages(this) });
    }
}

window.addEventListener("load", function() {
    RajouterEvenement();
});