export const parseStringToArray = (stringValue, delimiter) => (stringValue.split(delimiter));

export const splitStringToDictionary = (dictionaryString) =>  
        {var result = {};  
         dictionaryString.split(",").forEach((i) => {result[i] = ""}); 
         return result;}

export const getWordingObjectArray = (categoryList, label) => {
        const d = [];
        const categories = [...new Set(categoryList.split(","))];
        categories.forEach((c)  => d.push({[label]:c,  "Wording":""}));
        return d;
}

export const createGridObject = (rowHeaders, columnHeaders) =>
{
     var d = [];var x = {};
     rowHeaders.forEach(rh => {
               columnHeaders.forEach(ch => {  x = {};
                         x["row"]=rh;
                         x["col"]=ch;
                         x["value"]="";
                    d.push(x);
               }
          )
     });
     return(d);
}

export const copyObjectToClipboard = (obj) => (sessionStorage.setItem("clipboard",JSON.stringify(obj)))
export const pasteObjectFromClipboard = () => (JSON.parse(sessionStorage.getItem("clipboard")))
