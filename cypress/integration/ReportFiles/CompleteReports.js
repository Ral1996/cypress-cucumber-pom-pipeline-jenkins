const report = require("multiple-cucumber-html-reporter");
const fs = require("fs-extra");
const path = require("path");

const cucumberJsonDir = path.resolve(process.cwd(), "cypress/cucumber-json");
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
const htmlReportDir = path.resolve(process.cwd(), "cypress/reports/cucumber-reports");
const screenshotsDir = path.resolve(process.cwd(), "cypress/screenshots");

getCucumberReportMaps();
addScreenshots();
generateReport();

function getCucumberReportMaps() {
  filenames = fs.readdirSync(cucumberJsonDir);
  const files = fs.readdirSync(cucumberJsonDir).filter((file) => {
    return file.indexOf(".json") > -1;
  });
  files.forEach((file) => {
    const json = JSON.parse(fs.readFileSync(path.join(cucumberJsonDir, file)));
    if (!json[0]) {
      return;
    }
    const [feature] = json[0].uri.split("/").reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  });
}

function addScreenshots() {
  if (fs.existsSync(screenshotsDir)) {
    //only if screenshots exists
    const prependPathSegment = (pathSegment) => (location) =>
      path.join(pathSegment, location);

    const readdirPreserveRelativePath = (location) =>
      fs.readdirSync(location).map(prependPathSegment(location));

    const readdirRecursive = (location) =>
      readdirPreserveRelativePath(location).reduce(
        (result, currentValue) =>
          fs.statSync(currentValue).isDirectory()
            ? result.concat(readdirRecursive(currentValue))
            : result.concat(currentValue),
        []
      );

    const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(
      (file) => {
        return file.indexOf(".png") > -1;
      }
    );

    const featuresList = Array.from(
      new Set(screenshots.map((x) => x.match(/[\w-_.]+.feature/g)[0]))
    );

    featuresList.forEach((feature) => {
      screenshots.forEach((screenshot) => {
        const regex = /(?<=--\ ).+?((?=\ (example\ #\d+))|(?=\ (failed))|(?=.\w{3}))/g;
        const [scenarioName] = screenshot.match(regex);

        var filename = screenshot.replace(/^.*[\\\/]/, "");

        const featureSelected = cucumberReportMap[feature][0];

        let myScenarios = [];

        cucumberReportMap[feature][0].elements.forEach((item) => {
          let fullFileName = featureSelected.name + " -- " + item.name;
          if (filename.includes(fullFileName)) {
            myScenarios.push(item);
          }
        });

        if (!myScenarios) {
          return;
        }
        let foundFailedStep = false;
        myScenarios.forEach((myScenario) => {
          if (foundFailedStep) {
            return;
          }
          let myStep;
          if (screenshot.includes("(failed)")) {
            myStep = myScenario.steps.find(
              (step) => step.result.status === "failed"
            );
          } else {
            myStep = myScenario.steps.find(
              (step) => step.result.status === "passed"
            );
          }
          if (!myStep) {
            return;
          }
          const data = fs.readFileSync(path.resolve(screenshot));
          if (data) {
            const base64Image = Buffer.from(data, "binary").toString("base64");
            if (!myStep.embeddings) {
              myStep.embeddings = [];
              myStep.embeddings.push({
                data: base64Image,
                mime_type: "image/png",
                name: myStep.name,
              });
              foundFailedStep = true;
            }
          }
        });
        //Write JSON with screenshot back to report file.
        fs.writeFileSync(
          path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
          JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
        );
      });
    });
  }
}

function generateReport() {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn("REPORT CANNOT BE CREATED!");
  } else {
    report.generate({
      jsonDir: cucumberJsonDir,
      reportPath: htmlReportDir,
      displayDuration: true,
      useCDN: true,
      pageTitle: "Simulacion Reporte Completo Casos De Prueba",
      reportName: `Simulacion Reporte Completo Casos De Prueba - ${new Date().toLocaleString()}`,
      metadata: {
        app: {
          name: "Simulacion Reporte Completo",
          version: "1.0.1",
        },
        browser: {
          name: "chrome",
        },
        device: "Local test machine",
        platform: {
          name: "Windows 10 PRO",
          version: "10",
        },
      },
      customData: {
        title: "Run info",
        data: [
          { label: "Project", value: "Simulacion Reporte Completo" },
          { label: "Release", value: "1" },
          {
            label: "Execution Start Time",
            value: `${new Date().toLocaleString()}`,
          },
          {
            label: "Execution End Time",
            value: `${new Date().toLocaleString()}`,
          },
        ],
      },
    });
  }
}


/*
const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumber-json/",
  reportPath: "./cypress/reports/cucumber-reports/",
  metadata: {
    browser: {
      name: "chrome",
    },
    device: "Local test machine",
    platform: {
      name: "Windows 10 PRO",
      version: "10",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Reporte Demo Cypress-Cucumber" },
      { label: "Release", value: "1.0.1" },
    ],
  },
});
*/