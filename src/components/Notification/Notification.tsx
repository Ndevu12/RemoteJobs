import '../../styles/Notification.css'

interface Props {
    text: string
}

const Notification = (props: Props) => {
    return <div className='notification-status'>{props.text}</div>
}

export default Notification;