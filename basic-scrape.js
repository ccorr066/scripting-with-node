const fs = require("fs");

const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");
const { stringify } = require("querystring");

const sourceFile = String(fs.readFileSync("html-pages/basic-functions.html"));

const components = getComponents(sourceFile);

const componentObjs = components.map((component) => {
   return {
      name: getName(component)[0], // String
      desc: trim(getDesc(component)[0]), // String
      inputs: getInputs(component).length, // Number
      type: "basic", // String
      typeNum: 100, // Number
      isFavorite: false, // Boolean
   };
});

const reverseObjs = componentObjs.reverse();

const orderedObjs = [];
for (let i = 0; i < reverseObjs.length; i++) {
   const obj = reverseObjs[i];
   obj.order = obj.typeNum + i;
   orderedObjs.push(obj);
}

console.log(orderedObjs);

const targetFile = "./json-files/basic.json";
fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
