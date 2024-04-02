import { HotTable } from '@handsontable/react';

const HandsonDataGrid = ({data}) => {
  return (<HotTable data={data} colHeaders={true} rowHeaders={true} width="600" height="300" />);
}

export default HandsonDataGrid;