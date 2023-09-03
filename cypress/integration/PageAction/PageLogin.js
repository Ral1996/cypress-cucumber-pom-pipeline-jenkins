const loginPageElements = require('../../fixtures/LoginJson.json');

export class LoginPageElements {
    visitWebSite(url) {
        cy.log('Ingresando a la direccion del sitio web!');
        cy.visit(url);
        // //cy.screenshot();
    }

    usernameLogin(username) {
        cy.log('Igresando usuario!');
        cy.get(loginPageElements.LoginPagewWebElements.usernameId).type(username).screenshot();
    }

    passwordLogin(password) {
        cy.log('Igresando clave!');
        cy.get(loginPageElements.LoginPagewWebElements.passwordId).type(password).screenshot();
        // //cy.screenshot();
    }

    clickButtonLogin() {
        cy.log('Haciendo LogIn!');
        cy.get(loginPageElements.LoginPagewWebElements.buttonLoginId).click();
    }

    readLabelSuccessLogin(text) {
        cy.log('Verificando acceso al sitio web!');
        cy.get(loginPageElements.LoginPagewWebElements.labelSuccessLoginClass).should("contain", text).screenshot();
        // cy.screenshot();
    }

    clickButtonLogout() {
        cy.log('Saliendo del sitio web!');
        cy.get(loginPageElements.LoginPagewWebElements.button_menu).click();
        cy.get(loginPageElements.LoginPagewWebElements.buttonLogoutClass).click();
        // //cy.screenshot();
    }
}