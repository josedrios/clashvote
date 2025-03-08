import { useAlert } from '../../util/AlertContext';
import { IoClose } from "react-icons/io5";
 
export default function AlertBanner() {
  const { alert } = useAlert();
  const { showAlert } = useAlert();
  
  if (!alert.message) return null;

  return (
    <div className={`alert-banner alert-${alert.type}`} onClick={() => showAlert("", "")}>
      {alert.message}
    </div>
  );
}
