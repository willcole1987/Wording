import { Table } from 'react-bootstrap';
import ExcelInputCell from './ExcelInputCell'
import { useState } from 'react';

const GridTable = ({gridCollection, RowHeaders, ColumnHeaders, handleGridCollectionChange} ) => {
  
  const alteredColumnHeaders = ["X"].concat(ColumnHeaders);
  const getHeadersFromArray = (columnHeaders) => (columnHeaders.map((i,idx) => {return(<th key={idx}>{i}</th>) }));
      
  const getGridValue  =  (rowHeader, columnHader) => { 
    return gridCollection.filter(i => i.row === rowHeader && i.col === columnHader)[0]["value"] 
  }
  const mapRowCells = (rowHeader, columnHeaders, rootIndex) => (
        <tr key={rootIndex}>
            {
              [rowHeader].concat(columnHeaders).map((i, index) => 
                                          (index === 0) ? <td key={`${rootIndex}-${index}`}>{i}</td>
                                          :
                                          <ExcelInputCell key={`${rootIndex}-${index}`}
                                                          label={rowHeader}
                                                          name={i}
                                                          value={getGridValue(rowHeader, i)}
                                                          handleChange={(e) => handleGridCollectionChange(rowHeader, i, e.target.value )} />
                                            )
            }
         </tr>
    );

  const getTableBodyFromRowColumnArray = (rowHeaders, columnHeaders) => (
                                              rowHeaders.map((i, rowIndex) => {
                                                return(
                                                        mapRowCells(i,columnHeaders,rowIndex)
                                                      )
                                              })
                                          )
  return (
          <Table responsive striped bordered hover>
      <thead>
        <tr>
          {
            getHeadersFromArray(alteredColumnHeaders)
            // ['#','First Name','Last Name','Username'].map((i,idx) =>  <th key={idx}>{i}</th>)
          }
        </tr>
      </thead>
      <tbody>
      {getTableBodyFromRowColumnArray(RowHeaders,ColumnHeaders)}
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
          </Table>
        )
}

export default GridTable;