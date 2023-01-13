import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { FC } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  closeModal: () => void;
  title?: string;
  children: React.ReactElement;
};
const root = document.getElementById("modal")!;

const Modal: FC<Props> = ({ closeModal, title, children }) => {
  const closeKeyEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeAndRemoveListener();
    }
  };
  document.addEventListener("keydown", closeKeyEscape);
  const closeAndRemoveListener = () => {
    document.removeEventListener("keydown", closeKeyEscape);
    closeModal();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className="text text_type_main-large">{title}</h2>
            <span
              className={styles.modalClose}
              onClick={() => closeAndRemoveListener()}
            >
              <CloseIcon type="primary" />
            </span>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlay onClick={() => closeAndRemoveListener()} />
      </div>
    </>,
    root
  );
};

export default Modal;
