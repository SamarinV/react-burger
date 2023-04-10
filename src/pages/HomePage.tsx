import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import { TypeIngredientsElem } from "../types/types";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addIngInConstructor,
  updateConstructor,
} from "../store/constructorSlice";
import { increseCountIngredient } from "../store/ingredientsSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const constructor: TypeIngredientsElem[] = useAppSelector(
    (store) => store.construtorIng.items
  );
  const dispatch = useAppDispatch();

  //FUTURE Добавление ингредиентов в конструктор и обновление значений count в ингредиентах
  const addNewIngredient = (newElem: TypeIngredientsElem) => {
    dispatch(increseCountIngredient(newElem));
    const newArr = [...constructor];
    if (newElem.type === "bun") {
      const withNewBun = newArr.filter((elem) => elem.type !== "bun");
      withNewBun.push(newElem);
      withNewBun.push(newElem); // две булки
      dispatch(updateConstructor(withNewBun));
    } else {
      const a = { ...newElem, key_uuid: uuid() };
      dispatch(addIngInConstructor(a));
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapper}>
        <BurgerIngredients />
        <BurgerConstructor addNewIngredient={addNewIngredient} />
      </div>
    </DndProvider>
  );
};
