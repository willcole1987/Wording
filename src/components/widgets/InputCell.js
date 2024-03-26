const InputCell = ({ label, name, value, handleChange}) => 
{
    return (
        <input type="text" value={value} onChange={(e) => { handleChange(label,  name, e.target.value) }}></input>
    )
}

export default InputCell;