import './checkbox.css'

function CheckBox({id, checked, disabled, onCheckedMarkAsCompleted}) {
    return (
        <div className="round">
            <input type="checkbox" id={id} defaultChecked={checked} disabled={disabled} onClick={onCheckedMarkAsCompleted}/>
            <label htmlFor={id}></label>
        </div>
    )
}
export default CheckBox;