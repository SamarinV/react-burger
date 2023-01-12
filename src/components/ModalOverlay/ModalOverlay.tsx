import { FC } from "react";
import styles from "./ModalOverlay.module.css";
import { TypeOpenModal } from "../../types/types";

type Props = {
  onClick: (value: React.SetStateAction<TypeOpenModal>) => void;
};
const ModalOverlay: FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={() => onClick({ isOpen: false, type: "" })}
      className={styles.modalOverlay}
    ></div>
  );
};

export default ModalOverlay;
