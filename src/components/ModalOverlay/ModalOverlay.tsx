import { FC } from "react";
import styles from "./ModalOverlay.module.css";

type Props = {
  onClick: () => void;
};
const ModalOverlay: FC<Props> = ({ onClick }) => {
  return <div onClick={() => onClick()} className={styles.modalOverlay}></div>;
};

export default ModalOverlay;
