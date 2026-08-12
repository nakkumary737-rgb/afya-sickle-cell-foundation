document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");


    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /*
     * Close mobile navigation when a link is selected.
     */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /*
     * Close navigation if the user clicks outside it.
     */

    document.addEventListener("click", event => {

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideNav &&
            !clickedMenuButton &&
            mainNav.classList.contains("open")
        ) {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});
