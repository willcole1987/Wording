import {Row, Col, Container, Table,ButtonGroup, Button, Modal} from "react-bootstrap"
import GridWordingSelectorModal from "../widgets/GridWordingSelectorModal";
import {createGridObject} from '../helpers/helpers';
import {useEffect, useState } from "react";
import GridTable from "../widgets/GridTable";

export const NodeWordingDouble = () => {

     // const [NodeFamily, setNodeFamily] = useState([]) // table html needs constructing  when this is set
     const [selectedSignal, setSelectedSignal] = useState({});
     const [selectedChildNode1, setSelectedChildNode1] = useState({});
     const [selectedChildNode2, setSelectedChildNode2] = useState({});
     const [isShowModal, setIsShowModal] = useState(false);

     // create the array of objects from lists
     const [rowHeaders, setRowHeaders ] = useState(["VeryRed","Red","Gray","Green","VeryGreen","[no data]","[not applicable]"]);
     const [columnHeaders, setColumnHeaders ] = useState(["VeryRed","Red","Gray","Green","VeryGreen","[no data]","[not applicable]"]);
     const [gridWordingCollection, setGridWordingCollection]  = useState(createGridObject(rowHeaders,columnHeaders));

     const gridWordingCollectionUpdate =  (rowName, columnName, value) => {
          const newGrid  = gridWordingCollection;
          const index = gridWordingCollection.findIndex(i => i.row === rowName && i.col === columnName);
          newGrid[index].value = value;
          setGridWordingCollection(newGrid);
     }

     // Selectors
     const [nodes, setNodes] = useState([]);
     
     // modal functions
     const showModal = () => {setIsShowModal(true)}
     const updateOnModalClose = (signal, childNode1, childNode2) => 
     {
          setSelectedSignal(signal);
          setSelectedChildNode1(childNode1);
          setSelectedChildNode2(childNode2);
          setIsShowModal(false);
     }

     // TODO: set this up so that signal and subsignals are returned from the model under construction -  note dependency
     const getData = () => {
          var requestOptions = { method: "GET", redirect: "follow",};

          fetch("http://localhost:3030/Nodes", requestOptions)
          .then((response) => response.json())
          .then((result) => ( result.filter(i => [4,5].includes(i["Level"]))))
          .then((res) => setNodes(res))
          .catch((error) => console.log("error", error));
     };

     useEffect(() => {getData()}, []);


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
                                   <Button variant="dark" onClick={showModal}>Select Node Group</Button>
                                   <Button variant="dark">Copy</Button>
                              </ButtonGroup>
                              <hr style={{color: "white"}}/>
                         </Col>
                    </Row>
                    <Row>
                         <Modal show={isShowModal}>
                              <GridWordingSelectorModal title={"Grid Wording"} 
                                                       nodelist={nodes} 
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
                              <td>{selectedSignal["Name"] ?? ""}</td>
                         </tr>
                         <tr>
                              <td>Child Node 1 (rows)</td>
                              <td>{selectedChildNode1["Name"] ?? ""}</td>
                         </tr>
                         <tr>
                              <td>Child Node 2  (columns)</td>
                              <td>{selectedChildNode2["Name"] ?? ""}</td>
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