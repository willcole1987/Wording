import { Table } from 'react-bootstrap';
import InputCell from './InputCell'
import { useState } from 'react';

const GridTable = ({gridCollection, RowHeaders, ColumnHeaders, handleGridCollectionChange} ) => {
  
  const [alteredColumnHeaders, setAlteredColumnHeaders] = useState(["X"].concat(ColumnHeaders));

  const getHeadersFromArray = (columnHeaders) => (
                        columnHeaders.map((i, id) => {return(<th key={id}>{i}</th>) }) 
                      )
      
  
  const getGridValue  =  (rowHeader, columnHader) => { return gridCollection.filter(i => 
    i.row === rowHeader && i.col === columnHader)[0]["value"] 
  }

  const mapRowCells = (rowHeader, columnHeaders, rootIndex) => (
        <tr>
            {
                    [rowHeader].concat(columnHeaders).map((i, index) => {if(index === 0){ 
                                                return(<td>{i}</td>)
                                                }
                                                else
                                                {
                                                return(<td>
                                                      <InputCell key={`${rootIndex}-${index}`}
                                                                label={rowHeader}
                                                                name={i}
                                                                value={getGridValue(rowHeader, i)}
                                                                handleChange={(e) => handleGridCollectionChange(rowHeader, i, e.target.value )} />
                                                      </td>)
                                                }})
                  
            }
         </tr>
    );

  const getTableBodyFromRowColumnArray = (rowHeaders, columnHeaders) => (
                                              rowHeaders.map((i,rowIndex) => {return(mapRowCells(i,columnHeaders,rowIndex))})
                                          )

  return (
          <Table responsive striped bordered hover>
            <thead>
                <tr>{getHeadersFromArray(alteredColumnHeaders)}</tr>
            </thead>
            <tbody>{getTableBodyFromRowColumnArray(RowHeaders,ColumnHeaders)}
            </tbody>
          </Table>
        )
}

export default GridTable;