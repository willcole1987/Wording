import { Table } from 'react-bootstrap';
import ExcelInputCell from './ExcelInputCell'

const GridTable = ({gridCollection, RowHeaders, ColumnHeaders, handleGridCollectionChange, handleGridCellSetActive } ) => {
  
  const alteredColumnHeaders = ["X"].concat(ColumnHeaders);

  const getHeadersFromArray = (columnHeaders) => (columnHeaders.map((i,idx) => {return(<th key={idx}>{i}</th>) }));
      
  const getGridValue  =  (rowHeader, columnHader) => { 
    return gridCollection.filter(i => i.row === rowHeader && i.col === columnHader)[0]["value"] 
  }
  const getGridCellActive =  (rowHeader, columnHader) => { 
    return gridCollection.filter(i => i.row === rowHeader && i.col === columnHader)[0]["isActive"] 
  }

  const mapRowCells = (rowHeader, columnHeaders, rootIndex) => {
        const dictionaryRow = gridCollection.filter(x => x["row"]===rowHeader);
        return(
          <tr key={rootIndex}>
            <td key={`${rootIndex}-rowHeader`}>{rowHeader}</td>
              {
                columnHeaders.map((i, index) => 
                                            <ExcelInputCell key={`${rootIndex}-${index}`}
                                                            label={rowHeader}
                                                            name={i}
                                                            value={dictionaryRow[index]["value"]}
                                                            isActive={dictionaryRow[index]["isActive"]}
                                                            handleChange={handleGridCollectionChange}
                                                            handleCellActivate={handleGridCellSetActive} />
                                              )
              }
          </tr>
         )
    };

  const getTableBodyFromRowColumnArray = (rowHeaders, columnHeaders) => (
                                              rowHeaders.map((i, rowIndex) => {
                                                return(
                                                        mapRowCells(i,columnHeaders,rowIndex)
                                                      )
                                              })
                                          )
  return (
          <Table bordered>
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