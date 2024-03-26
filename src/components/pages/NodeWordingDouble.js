import {Row, Col, Container, Table,ButtonGroup, Button, Modal} from "react-bootstrap"
import GridWordingSelectorModal from "../widgets/GridWordingSelectorModal";
import {useEffect, useState } from "react";
import GridTable from "../widgets/GridTable";

export const NodeWordingDouble = () => {

     const [NodeFamily, setNodeFamily] = useState([]) // table html needs constructing  when this is set
     const [isShowModal, setIsShowModal] = useState(false);

     // create the dictionary
     const [rowHeaders, setRowHeaders ] = useState(["VeryRed","Red","Gray","Green","VeryGreen","[no data]","[not applicable]"]);
     const [columnHeaders, setColumnHeaders ] = useState(["VeryRed","Red","Gray","Green","VeryGreen","[no data]","[not applicable]"]);
     
     // create the gridWording object
     const createGridObject = (rowHeaders, columnHeaders) =>
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

     const [gridWordingCollection, setGridWordingCollection]  = useState(createGridObject(rowHeaders,columnHeaders));

     const gridWordingCollectionUpdate =  (rowName, columnName, value) => {
          const newGrid  = gridWordingCollection;
          const index = gridWordingCollection.findIndex(i => i.row === rowName && i.col === columnName);
          newGrid[index].value = value;
          setGridWordingCollection(newGrid);
     }


     // Selectors
     const [signals, setSignals] = useState([]);
     const [subsignals, setSubsignals] = useState([]);
     
     // modal functions
     const showModal = () => {setIsShowModal(true)}
     const updateOnModalClose = (signal, childNode1, childNode2) => 
     {
          setNodeFamily([signal, childNode1, childNode2]);
          setIsShowModal(false);
     }

     // TODO: set this up so that signal and subsignals are returned from the model under construction -  note dependency
     const setNodesByLevel = (level, nodes) => { 
          (level === 5) ? 
          setSubsignals(nodes) 
          : setSignals(nodes) 
     };

     const getData = (nodeLevel) => {
          var requestOptions = { method: "GET", redirect: "follow",};

          fetch("http://localhost:3030/Nodes", requestOptions)
          .then((response) => response.json())
          .then((result) => ( result.filter(i => i["Level"] === nodeLevel)))
          .then((res) => setNodesByLevel(nodeLevel, res))
          .catch((error) => console.log("error", error));
     };

     useEffect(() => {
          getData(5);
          getData(4);
     },[]);

     // TODO = create the grid html table
     return (
          <Container>
               <Col>
                    <Row>
                         <div className="page">
                              <h2>Grid Wording</h2>
                         </div>
                    </Row>
                    <Row>
                         <Col>
                              <ButtonGroup>
                                   <Button variant="dark" onClick={showModal}>Select colors</Button>
                              </ButtonGroup>
                              <hr style={{color: "white"}}/>
                         </Col>
                    </Row>
                    <Row>
                         <Modal show={isShowModal}>
                              <GridWordingSelectorModal title={"Grid Wording"} 
                                                       signals={signals} 
                                                       subsignals={subsignals} 
                                                       handleClose={updateOnModalClose}  />
                         </Modal>
                    </Row>
                    <Row>
                    <Col>
                    <Table striped bordered hover>
                         <thead>
                         <tr>
                              <th>Node</th>
                              <th>Selection</th>
                         </tr>
                         </thead>
                         <tbody>
                         <tr>
                              <td>Signal</td>
                              <td>{NodeFamily[0] ?? ""}</td>
                         </tr>
                         <tr>
                              <td>Child Node 1 (rows)</td>
                              <td>{NodeFamily[1] ?? ""}</td>
                         </tr>
                         <tr>
                              <td>Child Node 2  (columns)</td>
                              <td>{NodeFamily[2] ?? ""}</td>
                         </tr>
                         </tbody>
                    </Table>
                    </Col>
                    <Col></Col>
                    </Row>
               <Row>
                    <GridTable gridCollection={gridWordingCollection} 
                                        RowHeaders={rowHeaders}    
                                        ColumnHeaders={columnHeaders} 
                                        handleGridCollectionChange={gridWordingCollectionUpdate}/>
               </Row>
               </Col>
     </Container>
    )

}