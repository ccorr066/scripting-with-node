module.exports = {
   getComponents(file) {
      return file.match(
         /(?<=\<\!--\sstart\scolumn\s--\>).+?(?=<!--\send\scolumn\s-->)/gs
      );
   },
   getName(component) {
      return component.match(/(?<=<b>).+(?=<\/b>)/);
   },
   getDesc(component) {
      return component.match(/(?<=<\/b>\s-\s).+(?=<\/p>)/s);
   },
   getInputs(component) {
      let arrayInput = component.match(/<input.+?\/\>/gs);
      if (arrayInput == null) {
         return [];
      }
      return arrayInput;
   },
   trim(str) {
      return str
         .replace(/(\\r)|(\\n)/g, " ") // replace carriage returns and new lines with a space
         .replace(/\s{2,}/g, " ") // replace 2 or more spaces with 1 space
         .replace(/^\s|\s$/g, ""); // remove spaces from beginning and end
   },
};
