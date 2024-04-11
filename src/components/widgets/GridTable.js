import { Table } from 'react-bootstrap';
import ExcelInputCell from './ExcelInputCell'
import { useState } from 'react';

const GridTable = ({gridCollection, RowHeaders, ColumnHeaders, handleGridCollectionChange, handleGridCellSetActive } ) => {
  
  const alteredColumnHeaders = ["X"].concat(ColumnHeaders);

  const getHeadersFromArray = (columnHeaders) => (columnHeaders.map((i,idx) => {return(<th key={idx}>{i}</th>) }));
      
  const getGridValue  =  (rowHeader, columnHader) => { 
    return gridCollection.filter(i => i.row === rowHeader && i.col === columnHader)[0]["value"] 
  }
  const mapRowCells = (rowHeader, columnHeaders, rootIndex) => (
        <tr key={rootIndex}>
            {
              [rowHeader].concat(columnHeaders).map((i, index) => 
                                          (index === 0) ? 
                                          <td key={`${rootIndex}-${index}`}>{i}</td>
                                          :
                                          <ExcelInputCell key={`${rootIndex}-${index}`}
                                                          label={rowHeader}
                                                          name={i}
                                                          value={getGridValue(rowHeader, i)}
                                                          handleChange={handleGridCollectionChange}
                                                          handleCellActivate={handleGridCellSetActive} />
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
          }
        </tr>
      </thead>
      <tbody>
        {
            getTableBodyFromRowColumnArray(RowHeaders,ColumnHeaders)
        }
      </tbody>
          </Table>
        )
}

export default GridTable;