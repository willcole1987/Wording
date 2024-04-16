const ExcelInputCell = ({ label, name, value, isActive, handleChange, handleCellActivate}) => 
{
    const cellStyles = { nonEditable:{width:"170px", height:"10px" },
                         gridEditable:{ outline: "solid", opacity:"1", width:"170px", height:"10px", outlineColor:"green"},
                         editable:{ outline: "solid", opacity:"1", width:"170px", height:"10px", outlineColor:"red"}};
    
        
    return (<td style={isActive ? cellStyles["gridEditable"]: cellStyles["nonEditable"]}>
                <input autoFocus={true}
                    //    disabled={isActive ? false : true}
                       type="text"
                       style={{height: "100%", width: "100%", outline:"none", border:"none", caretColor: "transparent"}}
                       value={value}
                       onKeyDown={(e) => {if (e.key === "Tab") { e.preventDefault()}}}
                       onChange = {(e) =>  (handleChange(label,  name, e.target.value))}
                       onClick={(e) => {handleCellActivate(label, name); e.stopPropagation();}}>
                </input>
           </td>)
}

export default ExcelInputCell;