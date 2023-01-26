import styles from "./App.module.css";
import Appheader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { TypeIngredientsElem } from "../../types/types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addIngInConstructor,
  updateConstructor,
} from "../../store/constructorSlice";
import { increseCountIngredient } from "../../store/ingredientsSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";

function App() {
  const constructor: TypeIngredientsElem[] = useAppSelector(
    (store) => store.construtorIng.items
  );
  const dispatch = useAppDispatch();

  //FUTURE Добавление ингредиентов в конструктор и обновление значений count в ингредиентах
  const addNewIngredient = (newElem: TypeIngredientsElem) => {
    dispatch(increseCountIngredient(newElem));
    const newArr = [...constructor];
    if (newElem.type === "bun") {
      const WithNewBun = newArr.filter((elem) => elem.type !== "bun");
      WithNewBun.push(newElem);
      WithNewBun.push(newElem); // две булки
      dispatch(updateConstructor(WithNewBun));
    } else {
      const a = { ...newElem, key_uuid: uuid() };
      dispatch(addIngInConstructor(a));
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.headerWrapper}>
        <Appheader />
      </div>

      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor addNewIngredient={addNewIngredient} />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
