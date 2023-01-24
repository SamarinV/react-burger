import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { API_ORDER } from "../../constants";

import { useSelector, useDispatch } from "react-redux";
import { TypeConstructorElem, TypeIngredientsElem } from "../../types/types";
import { addOrder } from "../../store/orderNumberSlice";
import {
  replaceIngredient,
  updateConstructor,
} from "../../store/constructorSlice";
import { decreseCountIngredient } from "../../store/ingredientsSlice";
import { useDrag, useDrop } from "react-dnd";
//
//
///
//
//

type PropsConstructor = {
  addNewIngredient: any;
};

type PropsMainIng = {
  elem: TypeIngredientsElem;
  index: number;
  id: string | undefined;
};

const MainIngredients: FC<PropsMainIng> = ({ elem, index, id }) => {
  const constructor: TypeIngredientsElem[] = useSelector(
    (store: any) => store.construtorIng.items
  );

  const deleteIngredient = (elem: TypeIngredientsElem) => {
    const newContructorIng = [...constructor].filter(
      (a) => a.key_uuid !== elem.key_uuid
    );
    dispatch(updateConstructor(newContructorIng));
    dispatch(decreseCountIngredient(elem._id));
  };

  const dispatch = useDispatch();
  const ref = useRef(null);

  const replaceIngredient = (dragID: string, hoverID: string) => {
    const newConstructor = [...constructor];
    const dragIndexConstructor = newConstructor.findIndex(
      (elem) => elem.key_uuid && elem.key_uuid === dragID
    );
    const hoverIndexConstructor = newConstructor.findIndex(
      (elem) => elem.key_uuid && elem.key_uuid === hoverID
    );
    newConstructor.splice(
      dragIndexConstructor,
      0,
      newConstructor.splice(hoverIndexConstructor, 1)[0]
    );
    dispatch(updateConstructor(newConstructor));
  };

  const [, drop] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(elem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = (elem as { index: number }).index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = (
        ref.current as HTMLDivElement
      )?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      (elem as { index: number }).index = hoverIndex;
      const dragID = (elem as { id: string }).id;
      const hoverID = id;
      hoverID && dragID && replaceIngredient(dragID, hoverID);
    },
  });

  const [, drag] = useDrag({
    type: "constructor",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });
  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
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
    </>
  );
};

const BurgerConstructor: FC<PropsConstructor> = ({ addNewIngredient }) => {
  const dispatch = useDispatch();

  const constructor: TypeIngredientsElem[] = useSelector(
    (store: any) => store.construtorIng.items
  );

  const [price, setPrice] = useState(0); //итоговая стоимость в конструкторе

  const [, dropRef] = useDrop({
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
            mainIngredients.map((elem, index: number) => {
              return (
                <MainIngredients
                  key={elem.key_uuid}
                  elem={elem}
                  index={index}
                  id={elem.key_uuid}
                />
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
