const loginPageWebElements = require('../../../fixtures/LoginJson.json');

export class LoginPageElements {
    visitWebSite(url) {
        cy.log('Ingresando a la direccion del sitio web!');
        cy.visit(url);
        cy.screenshot();
    }

    usernameLogin(username) {
        cy.log('Igresando usuario!');
        cy.get(loginPageWebElements.LoginPageWebElements.usernameId).type(username).screenshot();
    }

    passwordLogin(password) {
        cy.log('Igresando clave!');
        cy.get(loginPageWebElements.LoginPageWebElements.passwordId).type(password).screenshot();
        cy.screenshot();
    }

    clickButtonLogin() {
        cy.log('Haciendo LogIn!');
        cy.get(loginPageWebElements.LoginPageWebElements.buttonLoginId).click();
    }

    readLabelSuccessLogin(text) {
        cy.log('Verificando acceso al sitio web!');
        cy.get(loginPageWebElements.LoginPageWebElements.labelSuccessLoginClass).should("contain", text).screenshot();
        cy.screenshot();
    }

    clickButtonLogout() {
        cy.log('Saliendo del sitio web!');
        cy.get(loginPageWebElements.LoginPageWebElements.button_menu).click();
        cy.get(loginPageWebElements.LoginPageWebElements.buttonLogoutId).click();
        cy.screenshot();
    }

    readFileAlert(text){
        cy.log('Verificando Alerta');
        cy.get(loginPageWebElements.LoginPageWebElements.dataTest).should("contain",text);
        cy.screenshot();
    }


}