import { Given, Then} from "cypress-cucumber-preprocessor/steps";
import { LoginPageElements } from "../../integration/PageAction/Login/Login";

const LoginElements = new LoginPageElements;

var baseURL = "https://www.saucedemo.com/";
/*var usernameHash = "standard_user";
var passwordHash = "secret_sauce";*/


Given('Visit Practice Test Automation Website', function() {
    LoginElements.visitWebSite(baseURL);
});

Then('User Provide Username {string}', function(usernameHash) {
    LoginElements.usernameLogin(usernameHash);
});

Then('User Provide Password {string}', function(passwordHash) {
    LoginElements.passwordLogin(passwordHash);
});

Then('User Click On Login Button To Log In Into The Practice Test Automation Website', function() {
    LoginElements.clickButtonLogin();
});

Then('User Read The Text Of Successfully Log In Into The Website', function() {
    LoginElements.readLabelSuccessLogin('Swag Labs');
});

Then('User Click On Logout Button For Reply To The Login Website', function() {
    LoginElements.clickButtonLogout();
});

Then('User See An Alert Error {string}',function(textAlert){
    LoginElements.readFileAlert(textAlert);
});
