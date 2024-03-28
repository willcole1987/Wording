import { useState } from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import GridSimpleSelectionBox from  './GridSimpleSelectionBox';

const GridWordingSelectorModal = ({title, signals, subsignals, handleClose }) => {

  // ensure unique childnodes when each is selected
  const [subsignalsModified, setSubsignalsModified] = useState(signals);
  const [searchList, setSearchList] = useState(subsignals);
  const [filteredSearchList, setFilteredSearchList] = useState(subsignals);
  const [nodeSelectionLevel, setNodeSelectionLevel] = useState("");
  
  const handleSearchChange  =  (text) => 
      {
        setFilteredSearchList(searchList.filter(i => i.Name.toLowerCase().includes(text)))
      };


  // methods: specific nodes selected for the 2d grid wording
  const [signal, setSignal] = useState({});
  const [subsignal1, setSubsignal1] = useState({});
  const [subsignal2, setSubsignal2] = useState({});

  // selectors
  const updateSignalSelection = (SignalSelectionId) => {setSignal(signals.filter(i  =>  i.Id === SignalSelectionId)[0])};

  const updateChildNode1Selection = (childNodeSubsignalId) => {
    setSubsignal1(subsignalsModified.filter(i => i.Id === childNodeSubsignalId)[0]);
    setSubsignalsModified(subsignals.filter(i  =>  i.Id !== childNodeSubsignalId));
  }

  const updateChildNode2Selection = (childNodeSubsignalId) => {  
    setSubsignal2(subsignalsModified.filter(i => i.Id === childNodeSubsignalId)[0]);
    setSubsignalsModified(subsignals.filter(i  =>  i.Id !== childNodeSubsignalId));
  }

  const selectGridNode = (nodeLevelText, nodeId)  => {
    switch(nodeLevelText)
    {
      case "Signal":
          updateSignalSelection(nodeId);
          break;
      case "ChildNode1":
          updateChildNode1Selection(nodeId);
          break;
      case "ChildNode2":
          updateChildNode2Selection(nodeId);
          break;
      default:
          break;
    }
    return;
  } 
  
  return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Col>
          <Row>
                Select signal parent from the options below:
                <input type="text" 
                       value={signal.Name ?? signal.Name}
                       onClick={() => { setSearchList(signals); 
                                        setFilteredSearchList(signals);
                                        setSignal({}); 
                                        setNodeSelectionLevel("Signal"); }} 
                       onChange={ (e) => handleSearchChange(e.target.value)} />
                <p>Status: {signal.Name === undefined  ? "none selected" : "signal selected" }</p>
                       <hr/>
          </Row>
          <Row>
                Select subignal 1 from the options below:
                <input type="text" 
                       value={subsignal1.Name ?? subsignal1.Name}
                       onClick={() => { setSearchList(subsignalsModified); 
                                        setFilteredSearchList(subsignalsModified);
                                        setSubsignal1({}); 
                                        setNodeSelectionLevel("ChildNode1"); }}
                       onChange={ (e) => handleSearchChange(e.target.value)} />
                <p>Status: {subsignal1.Name === undefined  ? "none selected" : "subsignal selected" }</p>
                       <hr/>
          </Row>
          <Row>
                Select subignal 2 from the options below:
                <input type="text" 
                       value={subsignal2.Name ?? subsignal2.Name}
                       onClick={() => { setSearchList(subsignalsModified); 
                                        setFilteredSearchList(subsignalsModified);
                                        setSubsignal2({}); 
                                        setNodeSelectionLevel("ChildNode2");}} 
                       onChange={ (e) => handleSearchChange(e.target.value)} />
                <p>Status: {subsignal2.Name === undefined  ? "none selected" : "subsignal selected" }</p>
            <hr/>
          </Row>
        </Col>
        <Col>
            <GridSimpleSelectionBox  filteredList={filteredSearchList} 
                                     selectionLevel={nodeSelectionLevel} 
                                     handleNodeSelection={selectGridNode} />     
        </Col>
        </Modal.Body>
        <Button onClick={() => handleClose(signal, subsignal1, subsignal2)}>
          Ok
        </Button>
      </Modal.Dialog>
  );
}

export default GridWordingSelectorModal;