import { useState, useRef, useMemo, useEffect } from "react";
import styles from "./OrderFeeds.module.css";
import { useAppSelector } from "../hooks";
import { TypeIngredientsElem } from "../types/types";
import Loader from "../UI/Loader";

export const OrderFeed = () => {
  const { status, error } = useAppSelector((state) => state.ingredients);
  const ingredients: TypeIngredientsElem[] = useAppSelector(
    (store) => store.ingredients.items
  );

  function arrayRandElement(arr: any) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  const bun = useMemo<TypeIngredientsElem[]>(() => {
    return ingredients.filter((elem) => elem.type === "bun");
  }, [ingredients]);

  const mainIngredient = useMemo<TypeIngredientsElem[]>(() => {
    return ingredients.filter((elem) => elem.type === "main");
  }, [ingredients]);

  const randomBun = arrayRandElement(bun);
  const randomMainIng1 = arrayRandElement(mainIngredient);
  const randomMainIng2 = arrayRandElement(mainIngredient);
  const randomMainIng3 = arrayRandElement(mainIngredient);

  return (
    <div className={styles.wrapper}>
      {!randomBun ? (
        <Loader />
      ) : status === "rejected" ? (
        <h1>Ошибка: {error}</h1>
      ) : (
        <>
          <img
            className={styles.burgerTop}
            src={randomBun.image}
            alt="ingredient"
          />
          <img
            className={styles.burgerMain3}
            src={randomMainIng3.image}
            alt="ingredient"
          />
          <img
            className={styles.burgerMain2}
            src={randomMainIng2.image}
            alt="ingredient"
          />
          <img
            className={styles.burgerMain1}
            src={randomMainIng1.image}
            alt="ingredient"
          />
          <img
            className={styles.burgerBottom}
            src={randomBun.image}
            alt="ingredient"
          />
          <h3 className={styles.myText}>Лента заказов пока не готова...</h3>
        </>
      )}
    </div>
  );
};
