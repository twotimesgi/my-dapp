import "./JazzIcon.css";
import { useEffect, useRef } from "react";
import jazzicon from '@metamask/jazzicon';
export default function JazzIcon(props) {

  const ref = useRef();
  useEffect(() => {
    if (props.address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(jazzicon(16, parseInt(props.address.slice(2, 10), 16)));
    }
  }, [props.address]);

  return <div className="jazz-icon" ref={ref} />;
}