document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuButton");
    const menuClose = document.getElementById("menuClose");

    const slideMenu = document.getElementById("slideMenu");
    const menuBackdrop = document.getElementById("menuBackdrop");

    if (
        !menuButton ||
        !menuClose ||
        !slideMenu ||
        !menuBackdrop
    ) {
        return;
    }


    function openMenu() {

        slideMenu.classList.add("open");
        menuBackdrop.classList.add("visible");

        slideMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        slideMenu.classList.remove("open");
        menuBackdrop.classList.remove("visible");

        slideMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";
    }


    menuButton.addEventListener(
        "click",
        openMenu
    );


    menuClose.addEventListener(
        "click",
        closeMenu
    );


    menuBackdrop.addEventListener(
        "click",
        closeMenu
    );


    const menuLinks =
        slideMenu.querySelectorAll("a");


    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

});
