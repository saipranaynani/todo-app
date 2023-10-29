import './button.css'

function Button({title, handleFunction, active}){
    return(
        <button onClick={handleFunction} className={active? 'active': null}>
            {title}
        </button>
    )
}

export default Button