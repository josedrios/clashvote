import { useAlert } from '../../util/AlertContext';

export default function AlertBanner() {
  const { alert } = useAlert();
  const { showAlert } = useAlert();

  if (!alert.message) {
    return null;
  }

  return (
    <div
      className={`alert-banner alert-${alert.type}`}
      onClick={() => showAlert('', '')}
    >
      <span className="alert-banner-type">{alert.type.toUpperCase()}: </span>
      {alert.message}
    </div>
  );
}
