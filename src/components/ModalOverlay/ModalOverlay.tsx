import { FC } from "react";
import styles from "./ModalOverlay.module.css";

type Props = {
  closeModal: () => void;
};
const ModalOverlay: FC<Props> = ({ closeModal }) => {
  return <div onClick={closeModal} className={styles.modalOverlay}></div>;
};

export default ModalOverlay;
