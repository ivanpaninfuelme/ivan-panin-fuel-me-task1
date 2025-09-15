/*
  main program za fuelmetask-1
  starts with: 
  npm start -- <operation> [userId]
*/

import { ReportGenerator } from "./reporting/reportGenerator";

async function main() {
  try {

    const userPostGenerator = new ReportGenerator();
    await userPostGenerator.loadJSONdata();
    const report = userPostGenerator.generateReportAll();
    userPostGenerator.prettyReport(report);

  } catch (err: any) {
    console.error("General error in index.ts:", err.message);
  }
}

main().catch(err => console.error("Error:", err.message));