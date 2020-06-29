const fs = require("fs");

const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");
//const { stringify } = require("querystring");

const basicSourceFile = String(
   fs.readFileSync("html-pages/basic-functions.html")
);
const intermediateSourceFile = String(
   fs.readFileSync("html-pages/intermediate-functions.html")
);
const functionalSourceFile = String(
   fs.readFileSync("html-pages/functional.html")
);

const basicComponents = getComponents(basicSourceFile);
const intermediateComponents = getComponents(intermediateSourceFile);
const functionalComponents = getComponents(functionalSourceFile);

const basicComponentObjs = basicComponents.map((component, orderedObjs) => {
   return {
      name: getName(component)[0], // String
      desc: trim(getDesc(component)[0]), // String
      inputs: getInputs(component).length, // Number
      type: "basic", // we are scrapping only the basic.html file
      typeNum: 100, //designated for basic.html
      isFavorite: false, // default is false
      order: 100 + orderedObjs,
   };
});
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

const reverseObjs = basicComponentObjs.reverse();

const orderedObjs = [];
for (let i = 0; i < reverseObjs.length; i++) {
   const obj = reverseObjs[i];
   obj.order = obj.typeNum + i;
   orderedObjs.push(obj);
}
let orderedFunc = basicComponentObjs.concat(
   intermediateComponentObjs,
   functionalComponentObjs
);

console.log(orderedFunc);

const targetFile = "./json-files/basic.json";
fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
