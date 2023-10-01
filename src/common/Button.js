import './Button.css';

export default function Button({onClick, name, title, isSmall = false}){
    return (
        <button
            className={isSmall ? 'Button ButtonSmall' : 'Button ButtonLarge'}
            title={title}
            onClick={() => onClick()}
        >{name}</button>
    );
}
