import './Modal.css'
function Modal(props){
    return props.show ? 
    <>
    <div onClick={props.onClose} className='backdrop'>      
    </div>
    <div className="modal">
        {props.title && <h2 className='title'>{props?.title}</h2>}
        {props.subtitle && <h4 className='subtitle'>{props?.subtitle}</h4>}
        {props.p && <p>{props?.p}</p>}
        {props.children}
    </div>
    </>
   : null;
}

export default Modal;
