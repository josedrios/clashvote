import { useAlert } from '../../util/AlertContext';

export default function AlertBanner() {
  const { alert } = useAlert();
  if (!alert.message) return null; 

  return (
    <div className={`alert-banner alert-${alert.type}`}>
      {alert.message}
    </div>
  );
}
