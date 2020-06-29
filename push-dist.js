const fs = require("fs");

const basicSource = JSON.parse(fs.readFileSync("./json-files/basic.json"));

const intermediateSource = JSON.parse(
   fs.readFileSync("./json-files/intermediate.json")
);

const functionalSource = JSON.parse(
   fs.readFileSync("./json-files/functional.json")
);

let distSource = basicSource.concat(intermediateSource, functionalSource);

const targetFile = "./dist/dist.json";
fs.writeFileSync(targetFile, JSON.stringify(distSource));

console.log(distSource);
