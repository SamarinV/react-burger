import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { FC } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { TypeIngredientsElem } from "../../types/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TypeOpenModal } from "../../types/types";
const logo = require("./done.png");

type Props = {
  isOpenModal: TypeOpenModal;
  closeModal: (value: React.SetStateAction<TypeOpenModal>) => void;
  contentModal: TypeIngredientsElem | null;
};
const root = document.getElementById("modal")!;

const Modal: FC<Props> = ({ isOpenModal, closeModal, contentModal }) => {
  if (!isOpenModal.isOpen || isOpenModal.type === "" || contentModal === null)
    return null;

  const closeKeyEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeAndRemoveListener();
    }
  };

  document.addEventListener("keydown", closeKeyEscape);

  const closeAndRemoveListener = () => {
    document.removeEventListener("keydown", closeKeyEscape);
    closeModal({ isOpen: false, type: "" });
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          {isOpenModal.type === "ingredient" ? (
            <>
              <div className={styles.modalHeader}>
                <h2 className="text text_type_main-large">
                  Детали ингредиента
                </h2>
                <span
                  className={styles.modalClose}
                  onClick={closeAndRemoveListener}
                >
                  <CloseIcon type="primary" />
                </span>
              </div>
              <div className={styles.content}>
                <img src={contentModal.image_large} alt={contentModal.name} />
                <h2
                  className={`text text_type_main-large ${styles.description}`}
                >
                  {contentModal.name}
                </h2>
                <div className={styles.blockDescriptions}>
                  <div className={styles.characteristics}>
                    <span className="text text_type_main-default">
                      Калории, ккал
                    </span>
                    <span className="text text_type_digits-default">
                      {contentModal.calories}
                    </span>
                  </div>
                  <div className={styles.characteristics}>
                    <span className="text text_type_main-default">
                      Белки, г
                    </span>
                    <span className="text text_type_digits-default">
                      {contentModal.proteins}
                    </span>
                  </div>
                  <div className={styles.characteristics}>
                    <span className="text text_type_main-default">Жиры, г</span>
                    <span className="text text_type_digits-default">
                      {contentModal.fat}
                    </span>
                  </div>
                  <div className={styles.characteristics}>
                    <span className="text text_type_main-default">
                      Углеводы, г
                    </span>
                    <span className="text text_type_digits-default">
                      {contentModal.carbohydrates}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.modalHeader}>
                <span
                  className={`${styles.modalClose} ${styles.modalCloseMarginLeft}`}
                  onClick={closeAndRemoveListener}
                >
                  <CloseIcon type="primary" />
                </span>
              </div>
              <div className={`${styles.content} ${styles.content_order}`}>
                <h1
                  className={`text text_type_digits-large ${styles.orderCount}`}
                >
                  034536
                </h1>
                <p
                  className={`text text_type_main-large ${styles.description}`}
                >
                  Индификатор заказа
                </p>
                <img
                  className={styles.iconAccpeted}
                  src={logo}
                  alt="order accpeted"
                />
                <div className={styles.blockDescriptions}>
                  <div className={styles.characteristics}>
                    <span className="text text_type_main-default">
                      Ваш заказ начали готовить
                    </span>
                    <span className="text text_type_main-default">
                      Дождитесь готовности на орбитальной станции
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <ModalOverlay onClick={closeAndRemoveListener} />
      </div>
    </>,
    root
  );
};

export default Modal;
