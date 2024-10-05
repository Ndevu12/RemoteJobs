import '../../styles/Button.css'
interface btn {
    className: string;
    text: string;
}
const Button2 = (props: btn) => {
    return <button className={'button second--btn ' + props.className} type='submit'>{props.text}</button>
}

export default Button2;