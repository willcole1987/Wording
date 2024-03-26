const ScrollBox = ({optionsList, selectionLevel, selectItem}) =>
{
    
    const boxStyle = { border:"1px solid black",
                        height:"200px",
                        overflow:"scroll",
                        overflowY:"scroll",
                        overflowX:"hidden"
                    };
                    
    const handleModelSelectionClick = (selectionLevel, Id) => { selectItem(selectionLevel, Id);}

    return(
        <div style={boxStyle}>
            <ul className="scrollable-ul" style={{ listStyleType: "none" }}>
                {optionsList.map(i => 
                        (<li key={i["Id"]} 
                             id={i["Id"]} 
                             onClick={() => handleModelSelectionClick(selectionLevel, i.Id)}>{i["Name"]}</li>)
                    )
                }
            </ul>
        </div>
    );
}

export default ScrollBox;