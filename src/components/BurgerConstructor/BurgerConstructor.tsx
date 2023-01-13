import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import { TypeConstructorElem } from "../../types/types";
import { v4 as uuid } from "uuid";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

type Props = {
  array: TypeConstructorElem[];
  price: number;
};

const BurgerConstructor: FC<Props> = ({ array, price }) => {
  const topElement = array.find((elem) => elem.type === "top");
  const bottomElement = array.find((elem) => elem.type === "bottom");
  const mainElements = array.filter(
    (elem) => elem.type !== "top" && elem.type !== "bottom"
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };
  return (
    <section className={styles.section}>
      <div className={styles.constructor}>
        <div className={`${styles.card} ${styles.cardTopBottom}`}>
          <ConstructorElement
            type={topElement?.type}
            isLocked={true}
            text={`${topElement?.text}`}
            price={topElement?.price || 0}
            thumbnail={topElement?.thumbnail || ""}
          />
        </div>

        <div className={styles.mainCards}>
          {mainElements.map((elem) => {
            return (
              <div key={uuid()} className={`${styles.card} ${styles.cardMain}`}>
                <span className={styles.dragIcon}>
                  <DragIcon type="primary" />
                </span>
                <ConstructorElement
                  type={elem.type}
                  text={`${elem.text}`}
                  price={elem.price}
                  thumbnail={elem.thumbnail}
                  extraClass={styles.card}
                />
              </div>
            );
          })}
        </div>

        <div className={`${styles.card} ${styles.cardTopBottom}`}>
          <ConstructorElement
            type={bottomElement?.type}
            isLocked={true}
            text={`${bottomElement?.text}`}
            price={bottomElement?.price || 0}
            thumbnail={bottomElement?.thumbnail || ""}
          />
        </div>
      </div>
      <div className={styles.price}>
        <span className="text text_type_digits-medium">{price}</span>
        <span className={styles.primaryIcon}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          onClick={() => openModal()}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber="02456"></OrderDetails>
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
