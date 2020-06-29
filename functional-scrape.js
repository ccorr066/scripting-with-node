const fs = require("fs");

const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");
//const { stringify } = require("querystring");

const functionalSourceFile = String(
   fs.readFileSync("html-pages/functional.html")
);

const functionalComponents = getComponents(functionalSourceFile);

const functionalComponentObjs = functionalComponents.map(
   (component, orderedObjs) => {
      return {
         name: getName(component)[0], // String
         desc: trim(getDesc(component)[0]), // String
         inputs: getInputs(component).length, // Number
         type: "functional", // String
         typeNum: 300, // Number
         isFavorite: false, // Boolean
         order: 300 + orderedObjs,
      };
   }
);

const reverseObjs = functionalComponentObjs.reverse();

const orderedObjs = [];
for (let i = 0; i < reverseObjs.length; i++) {
   const obj = reverseObjs[i];
   obj.order = obj.typeNum + i;
   orderedObjs.push(obj);
}

console.log(orderedObjs);

const targetFile = "./json-files/functional.json";
fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
