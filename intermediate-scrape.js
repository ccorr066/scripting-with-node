const fs = require("fs");

const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");
//const { stringify } = require("querystring");

const intermediateSourceFile = String(
   fs.readFileSync("html-pages/intermediate-functions.html")
);

const intermediateComponents = getComponents(intermediateSourceFile);

const intermediateComponentObjs = intermediateComponents.map(
   (component, orderedObjs) => {
      return {
         name: getName(component)[0], // String
         desc: trim(getDesc(component)[0]), // String
         inputs: getInputs(component).length, // Number
         type: "intermediate", // String
         typeNum: 200, // Number
         isFavorite: false, // Boolean
         order: 200 + orderedObjs,
      };
   }
);

const reverseObjs = intermediateComponentObjs.reverse();

const orderedObjs = [];
for (let i = 0; i < reverseObjs.length; i++) {
   const obj = reverseObjs[i];
   obj.order = obj.typeNum + i;
   orderedObjs.push(obj);
}

console.log(orderedObjs);

const targetFile = "./json-files/intermediate.json";
fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
