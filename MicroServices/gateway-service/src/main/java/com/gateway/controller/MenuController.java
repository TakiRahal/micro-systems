package com.gateway.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

 @Controller
public class MenuController {

    /**
     * Maps the root URL ("/") to the home page.
     *
     * @return the name of the view to render for the home page
     */
    @GetMapping("/")
    public String home() {
        return "home";
    }

    /**
     * Maps the "/menu" URL to the menu page and sets the authenticated user's username in the model.
     *
     * @param user  the authenticated OIDC (OpenID Connect) user
     * @param model Model object for passing data to the view
     * @return the name of the view to render for the menu page, or redirects to home if user is not authenticated
     */
    @GetMapping("/menu")
    public String menu(@AuthenticationPrincipal OidcUser user, Model model) {
        if (user != null) {
            model.addAttribute("username", user.getPreferredUsername());
        } else {
            return "redirect:/";  // Redirect to home if not authenticated
        }
        return "menu";
    }
}
