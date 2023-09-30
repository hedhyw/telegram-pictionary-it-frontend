import './Button.css';

export default function Button({onClick, name, title}){
    return (
        <button className="Button" title={title} onClick={() => onClick()} >{name}</button>
    )
}
