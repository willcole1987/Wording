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
                         x["active"]=0;
                    d.push(x);
               }
          )
     });
     return(d);
}

// Helpers for node selection
export const  filterListByNameSearchTextAndLevel = (list, text, level, firstOnly = true) => {
     if(firstOnly === true)
     {
          return(list.filter(i => i["Level"] === level && i["Name"].toLowerCase().includes(text)));
     } 
     else
     {
          return(list.filter(i => i["Level"] === level && i["Name"].toLowerCase().includes(text)));
     }
}

export const  filterListByLevel = (list, level) => {
     return list.filter(i => i["Level"] === level)
}

export const  filterListByNameSearchText = (list, text) => {
     return list.filter(i => i["Name"].toLowerCase().includes(text))
}

export const  getListWithExcludedNode = (list, node) => {
     return list.filter(i => JSON.stringify(i) !== JSON.stringify(node))
}

// copy+paste simulators 
export const copyObjectToClipboard = (obj) => (sessionStorage.setItem("clipboard",JSON.stringify(obj)))
export const pasteObjectFromClipboard = () => (JSON.parse(sessionStorage.getItem("clipboard")))
