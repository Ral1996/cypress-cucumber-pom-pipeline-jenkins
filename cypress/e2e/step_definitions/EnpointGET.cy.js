import { Given } from "cypress-cucumber-preprocessor/steps";
import { EnpointGETElements } from "../../integration/PageAction/Endpoints/EnpointGET";

const EnpointGET = new EnpointGETElements;

Given('I access api request end point to get users', function() {
    EnpointGET.testingAPITypeGetNotParameter();
});