import React from 'react'
import { PulseLoader } from 'react-spinners'

import '../../styles/Button.css'
interface btn {
    className: string;
    text: string;
    type?: string;
    loading?: boolean;
    disabled?: boolean
}
const Button = (props: btn) => {

    return <button className={'button first--btn ' + props.className} type='submit' disabled={props.disabled}>
        {props.loading ? 
        <PulseLoader color="#fff" margin={5} size={10} /> : props.text
        }
        </button>
}

export default Button;