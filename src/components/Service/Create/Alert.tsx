import { EuiConfirmModal } from '@elastic/eui';

interface IConfirmAction {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelButtonText: string;
  confirmButtonText: string;
  description: string;
  isOpen: boolean;
}

const ConfirmAction: React.FC<IConfirmAction> = ({
  title,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  description,
  isOpen,
}) => {
  return isOpen ? (
    <EuiConfirmModal
      title={title}
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButtonText={cancelButtonText}
      confirmButtonText={confirmButtonText}
      buttonColor="danger">
      {description}
    </EuiConfirmModal>
  ) : null;
};

export default ConfirmAction;
