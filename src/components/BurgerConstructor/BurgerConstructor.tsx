import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useContext, useEffect, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import { v4 as uuid } from "uuid";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ConstructorContext } from "../../context/ConstructorContext";
import { API_ORDER } from "../../constants";

import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { TypeIngredientsElem } from "../../types/types";
import { addOrder } from "../../store/orderNumberSlice";
import { updateConstructorItems } from "../../store/constructorSlice";
import { decreseCountIngredient } from "../../store/ingredientsSlice";

type Props = {
  addNewIngredient: any;
};

const BurgerConstructor: FC<Props> = ({ addNewIngredient }) => {
  const dispatch = useDispatch();

  const constructor: TypeIngredientsElem[] = useSelector(
    (store: any) => store.construtorIng.items
  );

  const [price, setPrice] = useState(0); //итоговая стоимость в конструкторе

  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredients",
    drop(item) {
      addNewIngredient(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    fetchOrder();
    setIsOpenModal(true);
  };

  const ingredientsID = constructor.map((elem) => elem._id);

  const [isOrderLoading, setIsOrderLoading] = useState(false);
  function fetchOrder() {
    setIsOrderLoading(true);
    fetch(API_ORDER, {
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
        dispatch(addOrder(data.order.number));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsOrderLoading(false));
  }

  const [bun, setBun] = useState<TypeIngredientsElem | undefined>();
  const [mainIngredients, setMainIngredients] = useState<
    TypeIngredientsElem[] | null
  >();

  const [buttonIsDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    setBun(constructor.find((elem) => elem.type === "bun"));
    setMainIngredients(constructor.filter((elem) => elem.type !== "bun"));
    setPrice(constructor.reduce((sum, element) => sum + element.price, 0));
    constructor.find((elem) => elem.type === "bun") &&
    constructor.find((elem) => elem.type !== "bun")
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [constructor]);

  const deleteIngredient = (elem: any) => {
    const newContructorIng = [...constructor].filter(
      (a) => a.key_uuid !== elem.key_uuid
    );
    dispatch(updateConstructorItems(newContructorIng));
    dispatch(decreseCountIngredient(elem._id));
  };

  return (
    <section ref={dropRef} className={styles.section}>
      <div className={styles.constructor}>
        {bun ? (
          <div className={`${styles.card} ${styles.cardTopBottom}`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun?.name} (верх)`}
              price={bun?.price || 0}
              thumbnail={bun?.image || ""}
            />
          </div>
        ) : (
          <div className={`${styles.card} ${styles.cardTopBottom}`}>
            <div className={styles.cardTopWithoutIng}>Выберите булку</div>
          </div>
        )}

        <div className={styles.mainCards}>
          {mainIngredients ? (
            mainIngredients.map((elem) => {
              return (
                <div
                  key={elem.key_uuid}
                  className={`${styles.card} ${styles.cardMain}`}
                >
                  <span className={styles.dragIcon}>
                    <DragIcon type="primary" />
                  </span>
                  <ConstructorElement
                    text={`${elem.name}`}
                    price={elem.price}
                    thumbnail={elem.image || ""}
                    extraClass={styles.card}
                    handleClose={() => deleteIngredient(elem)}
                  />
                </div>
              );
            })
          ) : (
            <div className={`${styles.card} ${styles.cardMain}`}>
              <span className={styles.cardMainWithoutIng}>
                Выберете начинку
              </span>
            </div>
          )}
        </div>

        {bun ? (
          <div className={`${styles.card} ${styles.cardTopBottom}`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun?.name} (низ)`}
              price={bun?.price || 0}
              thumbnail={bun?.image || ""}
            />
          </div>
        ) : (
          <div className={`${styles.card} ${styles.cardTopBottom}`}>
            <div className={styles.cardBottomWithoutIng}>Выберите булку</div>
          </div>
        )}
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
          disabled={buttonIsDisabled}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails isOrderLoading={isOrderLoading}></OrderDetails>
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
