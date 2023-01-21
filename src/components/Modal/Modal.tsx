import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteModalContent } from "../../store/modalContentSlice";

type Props = {
  closeModal?: any;
  title?: string;
  children: React.ReactElement;
};
const root = document.getElementById("modal")!;

const Modal: FC<Props> = ({ title, closeModal, children }) => {
  const contentIng = useSelector((state: any) => state.modalContent.items);
  const dispatch = useDispatch();
  const close = () => {
    contentIng !== null ? dispatch(deleteModalContent()) : closeModal();
  };
  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      e.key === "Escape" && close();
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [dispatch]);

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className="text text_type_main-large">{title}</h2>
          <span className={styles.modalClose} onClick={close}>
            <CloseIcon type="primary" />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClick={close} />
    </div>,
    root
  );
};

export default Modal;
