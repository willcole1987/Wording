import  ScrollBox  from './ScrollBox';

const GridSimpleSelectionBox = ({filteredList, selectionLevel, handleNodeSelection}) => {
  const handleSelectionClick = (selectionLevel, id) => {  handleNodeSelection(selectionLevel, id) };
  return (
    <>
        <ScrollBox optionsList={filteredList} selectionLevel={selectionLevel} selectItem={handleSelectionClick} />
    </>
  );
}

export default GridSimpleSelectionBox;