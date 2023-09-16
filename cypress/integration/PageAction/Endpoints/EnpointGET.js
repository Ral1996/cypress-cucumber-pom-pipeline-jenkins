import 'cypress-mochawesome-reporter/register';
import 'cypress-plugin-api';

export class EnpointGETElements {

    testingAPITypeGetNotParameter() {
        /*
        cy.log('Ejecutando Test De Prueba A Endpoint De Tipo GET Sin Parametros - 1');
        cy.api("GET", "https://api.restful-api.dev/objects?id=3&id=5&id=10").should((response) => {
            expect(response.status).to.eq(200);
        });

        cy.log('Ejecutando Test De Prueba A Endpoint De Tipo GET Sin Parametros - 2');
        cy.request("GET", "https://api.restful-api.dev/objects?id=3&id=5&id=10").then((response) => {
            expect(response.status).to.eq(200)
            //expect(response.body.results).length.to.be.greaterThan(1)
          })
          */
        
        cy.api({
            method: 'GET',
            url: 'https://api.restful-api.dev/' + 'objects?id=3&id=5&id=10',
            headers: {},
            failOnStatusCode: true
          }).then((response) => {
      
            var arrayResponse = response.body;
            var statusCode = response.status;
            var arraySize = Object.keys(arrayResponse).length;
            
            if (arraySize <= 0) {
              cy.log('Status Code 200 - Advertencia: La peticion se esta ejecutando correctamente, pero no esta retornando informacion.').then(() => {
                expect(response.status).to.eq(200);
              });
              cy.screenshot();
            } else if (arraySize => 1) {
              //cy.log(statusCode);
              if (statusCode === 404) {
                cy.log('Status Code 404 - Error: No se encontró en el servidor.').then(() => {
                  expect(response.status).to.equal(404);
                });
                cy.screenshot();
              } else if (statusCode === 500) {
                cy.log('Status Code 500 - Error: Se ha producido un error al intentar acceder al servidor').then(() => {
                  expect(response.status).to.equal(500);
                });
                cy.screenshot();
              } else if (statusCode === 200){
                cy.log('Status Code 200 - Exito: Endpoint retornando informacion satisfactoriamente.').then(() => {
                  expect(response.status).to.eq(200);
                  expect(response.body).to.not.be.null;
                  cy.log(JSON.stringify(response.body));
                });
                cy.screenshot();
              } else {
                cy.log('Error: El endpoint no esta retornando informacion correctamente, Status Code (Fuera de los solicitados).');
                cy.screenshot();
              }
            } else {
              cy.log('Error: El endpoint no esta retornando informacion correctamente.').then(() => {
                expect(response.body).to.not.be.null;
              });
              cy.screenshot();
            }

        });
        
    }

}