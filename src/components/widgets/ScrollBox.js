const ScrollBox = ({optionsList, selectItem}) =>
{
    
    const boxStyle = { border:"1px solid black",
                        height:"200px",
                        overflow:"scroll",
                        overflowY:"scroll",
                        overflowX:"hidden"
                    };
                    

    return(
        <div style={boxStyle}>
            <ul className="scrollable-ul" style={{ listStyleType: "none" }}>
                {optionsList.map(i => 
                        (<li key={i["Id"]} 
                             id={i["Id"]} 
                             onClick={() => selectItem(i.Id)}>{i["Name"]}</li>)
                    )
                }
            </ul>
        </div>
    );
}

export default ScrollBox;