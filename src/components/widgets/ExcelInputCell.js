import { useRef, useState } from "react";
import { Form, Container } from 'react-bootstrap';

const ExcelInputCell = ({ label, name, value, isActive=0, handleActivate, handleChange}) => 
{
    const [cellState, setCellState] = useState(0);
    const clickCounter = useRef(0);
    var singleClickTimer = '';
    const cellStyles = { nonEditable:{width:"170px", height:"10px" },
                         gridEditable:{ outline: "solid", opacity:"1", width:"170px", height:"10px", outlineColor:"green"},
                         editable:{ outline: "solid", opacity:"1", width:"170px", height:"10px", outlineColor:"red"}};
    
    const determineStyle = (stateNumber) => ( (stateNumber ===  0) ? cellStyles.nonEditable : 
                                                ((stateNumber ===  1) ?  cellStyles.gridEditable : cellStyles.editable ));

    const updateCellState = (stateId) => {
        setCellState(stateId);
    }

    const singleClickRun = () => {
        updateCellState(1);
    }

    const dblClickRun = () => {
        updateCellState(2);
    }

    const changeActiveCell = (key) => {
    if (key === "Enter") 
        {
            // activate the next cell down if state = 1 or else set back to 1 if cellstate is 2
        }
    }
    const handleClicks = ()  => 
    {
      clickCounter.current  += 1;
      if (clickCounter.current === 1) {
        singleClickTimer = (
        setTimeout(() => {clickCounter.current = 0; 
                            singleClickRun();}, 
                            250));
      }
      else if (clickCounter.current === 2) {
        clearTimeout(singleClickTimer);
            clickCounter.current = 0;
            dblClickRun();
      }
    }

    // 3 cell states states: non-editable, pasteable (from excel range), editable
    // React uses onFocus and onBlur instead of onFocusIn and onFocusOut.
    // console.log(cellState)
    return (<td style={determineStyle(cellState)}
                onClick={handleClicks}>
                     {  (cellState === 2) ?
                            <Form.Control  autoFocus
                                           value={value}
                                           onClick={handleClicks}
                                           onChange={(e) => (handleChange(label,  name, e.target.value))}
                                           onKeyDown={(e) => {changeActiveCell(e)}}
                                           >
                            </Form.Control>
                            :
                            <div contenteditable="true" 
                                id="capture" 
                                style={{height: "100%", width: "100%", outline:"none"}}
                                onPaste={(e) => (console.log(e.clipboardData))}>
                            </div>
                            // <Form.Control
                            //         disabled={true}
                            //         value={value}
                            //         onClick={handleClicks}
                            //         onPaste={() => (console.log("way to go"))}>
                            // </Form.Control>
                     }
           </td>)
}

export default ExcelInputCell;