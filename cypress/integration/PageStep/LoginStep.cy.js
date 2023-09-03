import { Given, Then} from "cypress-cucumber-preprocessor/steps";
import { LoginPageElements } from "../PageAction/PageLogin";

const LoginElements = new LoginPageElements;

var baseURL = "https://www.saucedemo.com/";
var usernameHash = "standard_user";
var passwordHash = "secret_sauce";

Given('Visit Practice Test Automation Website', function() {
    LoginElements.visitWebsite(baseURL);
});

Then('User Provide Username', function() {
    LoginElements.usernameLogin(usernameHash);
});

Then('User Provide Password', function() {
    LoginElements.passwordLogin(passwordHash);
});

Then('User Click On Login Button To Log In Into The Practice Test Automation Website', function() {
    LoginElements.clickButtonLogin();
});

Then('User Read The Text Of Successfully Log In Into The Website', function() {
    LoginElements.readLabelSuccessLogin('Logged In Successfully');
});

Then('User Click On Logout Button For Reply To The Login Website', function() {
    LoginElements.clickButtonLogout();
});
