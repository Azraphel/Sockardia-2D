var present_page_recto;

function TournerLesPages(page_cliquer) {

    if (document.getElementsByClassName("page-qui-tourne").length > 0) {
        return;
    }

    
    if (page_cliquer.classList.contains("recto")) {
        
        console.log("recto");
        
        present_page_recto.classList.add("page-qui-tourne");
        present_page_recto.classList.remove("recto");
        present_page_recto.classList.add("verso");
        
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

        console.log("verso");
        
        if (present_page_recto.classList.contains("recto")) {
            present_page_recto = present_page_recto.nextElementSibling;
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