import { useRef } from "react";

const ExcelInputCell = ({ id, label, name, value, handleChange}) => 
{
    const cellRef = useRef(null);
    const setFocus = () => {cellRef.current.focus();}

    return (
        <td onClick={()  => (setFocus())}>
            <div key={id}
                 style={{ outline: "none" }}
                 contentEditable={true} 
                 ref={cellRef}
                 type="text" 
                 value={value} 
                 onChange={(e) => { handleChange(label,  name, e.target.value) }}></div>
        </td>
    )
}

export default ExcelInputCell;