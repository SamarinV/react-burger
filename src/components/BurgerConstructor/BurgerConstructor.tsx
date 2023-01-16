import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useContext, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import { TypeConstructorElem } from "../../types/types";
import { v4 as uuid } from "uuid";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ConstructorContext } from "../../context/ConstructorContext";
import Ingredient from "../Ingredient/Ingredient";

type Props = {
  price: number;
};

const BurgerConstructor: FC<Props> = ({ price }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const constructor = useContext(ConstructorContext);
  const topElement = constructor?.find((elem) => elem.type === "top");
  const bottomElement = constructor?.find((elem) => elem.type === "bottom");
  const mainElements = constructor?.filter(
    (elem) => elem.type !== "top" && elem.type !== "bottom"
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    fetchOrder();
    setIsOpenModal(true);
  };

  const ingredientsID = constructor?.map((elem) => elem._id);

  function fetchOrder() {
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsID }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => {
        setOrderNumber(data.order.number);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          {mainElements &&
            mainElements.map((elem) => {
              return (
                <div
                  key={uuid()}
                  className={`${styles.card} ${styles.cardMain}`}
                >
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
          <OrderDetails orderNumber={orderNumber}></OrderDetails>
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
function then() {
  throw new Error("Function not implemented.");
}
