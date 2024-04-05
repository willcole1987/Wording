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
                 onInput={(e) => ( 
                                    handleChange(label,  name, e.target.innerHTML) 
                                    )}></div>
        </td>
    )
}

export default ExcelInputCell;