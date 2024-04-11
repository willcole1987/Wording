import { useRef, useState } from "react";
import { Form } from 'react-bootstrap';

const ExcelInputCell = ({ label, name, value, isActive=0, handleActivate, handleChange}) => 
{
    const [cellState, setCellState] = useState(0);
    const clickCounter = useRef(0);
    var singleClickTimer = '';
    const cellStyles = { nonEditable:{ },
                         gridEditable:{ outline: "solid", opacity:"1", outlineColor:"green"},
                         editable:{ outline: "solid", opacity:"1",     outlineColor:"red"}};
    const determineStyle = (stateNumber) => ( (stateNumber ===  0) ? 
                                                cellStyles.nonEditable : 
                                                ((stateNumber ===  1) ? 
                                                    cellStyles.gridEditable : 
                                                    cellStyles.editable ));
    // const cellRef = useRef(null);
    // const setFocus = () => { cellRef.current.focus(); }
    const updateCellState = (stateId) => {
        setCellState(stateId);
        // if (cellState === 2) { setToggleFocus(true) }
    }

    const singleClickRun = () => {
        // console.log(toggleFocus);
        // if (!toggleFocus)  { updateCellState(1);}
        // setToggleFocus(false);
        updateCellState(1);
        // console.log(cellState);
        // console.log(toggleFocus);
    }
    const dblClickRun = () => {
        // console.log(toggleFocus);
        updateCellState(2);
        // setToggleFocus(true);
        // console.log(cellState);
        // console.log(toggleFocus);
    }

    const handleClicks = ()  => {
      clickCounter.current  += 1;
      if (clickCounter.current === 1) {
        singleClickTimer = (
                                setTimeout(() => {clickCounter.current = 0; 
                                                    singleClickRun();}, 
                                                    300));
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
    return (
            <td onClick={handleClicks}
                style={determineStyle(cellState)}>
                     {
                        (cellState === 2) ? 
                           <Form.Control
                                 disabled={ false  }
                                 type="text"
                                 value={value}
                                 onChange={(e) => (handleChange(label,  name, e.target.value))}
                                 onClick={(e) => e.stopPropagation()}
                                 ></Form.Control> 
                            :
                            <Form.Control
                                disabled={ true  }
                                type="text"
                                value={value}
                                onChange={(e) => (handleChange(label,  name, e.target.value))}
                                onClick={(e) => e.stopPropagation()}
                            ></Form.Control>
                            // :
                            // <>
                            //     <label type="text" value="12345"></label>
                            // </>
                    } 
           </td>)
}

export default ExcelInputCell;