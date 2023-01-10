import styles from "./App.module.css";
import Appheader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { INGREDIENTS } from "../../utils/mocData";
import { TypeConstructorElem } from "../../types/types";
import { TypeIngredientsElem } from "../../types/types";
import { useState } from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
	   //начальные элементы для конструктора
  const [constructor, setConstructor] = useState<TypeConstructorElem[]>([
    {
      _id: "60666c42cc7b410027a1a9b1",
      type: "top",
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 1255,
      thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      _id: "60666c42cc7b410027a1a9b5",
      text: "Говяжий метеорит (отбивная)",
      price: 3000,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-04.png",
    },
    {
			_id: "60666c42cc7b410027a1a9b1",
      type: "bottom",
      isLocked: true,
      text: "Краторная булка N-200i (низ)",
      price: 1255,
      thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
  ]);

	//Итоговая стоимость в кострукторе
  const recountPrice = (array: TypeConstructorElem[]) => {
    return array.reduce((sum, element) => sum + element.price, 0);
  };
  const [price, setPrice] = useState(recountPrice(constructor));

//Создание нового массива ингредиентов с добавлением параметра count
	const ingredientsWithCount = INGREDIENTS.map((elem) => {
      return { ...elem, count: 0 };
    });

//Плюсуем count если ингредиент есть в конструкторе
  for (let i = 0; i < constructor.length; i++) {
    for (let j = 0; j < ingredientsWithCount.length; j++) {
      if (constructor[i]._id === ingredientsWithCount[j]._id) {
        ingredientsWithCount[j].count = 1;
      }
    }
  }

  const [allIngredients, setAllIngredients] = useState([...ingredientsWithCount]);

  //Добавление ингредиентов в конструктор и обновление значений count в ингредиентах
  const addNewIngredient = (newElem: TypeIngredientsElem) => {
    const newArrayConstructor = [...constructor];
		const newArrayIngredients = [...allIngredients]

    if (newElem.type === "bun") {
      newArrayIngredients.map((element) => {
        if (element.type === "bun" && element.name !== newElem.name) { element.count = 0 }
        return element;
      });
			newArrayIngredients.map((element) => {
				if (element.name === newElem.name) { element.count = 1 }
        return element;
			})
      newArrayConstructor.splice(0, 1, {
        _id: newElem._id,
        type: "top",
        isLocked: true,
        text: newElem.name + " (верх)",
        price: newElem.price,
        thumbnail: newElem.image || ''
      });
      newArrayConstructor.splice(newArrayConstructor.length - 1, 1, {
        _id: newElem._id,
        type: "bottom",
        isLocked: true,
        text: newElem.name + " (низ)",
        price: newElem.price,
        thumbnail: newElem.image || ''
      });

    } else {
			newArrayIngredients.map((element) => {
				if (element.name === newElem.name) { element.count++ }
        return element;
			})
      newArrayConstructor.splice(1, 0, {
        _id: newElem._id,
        text: newElem.name,
        price: newElem.price,
        thumbnail: newElem.image || ''
      });
    }
		setAllIngredients(newArrayIngredients)
    setConstructor(newArrayConstructor);
    setPrice(recountPrice(newArrayConstructor));
  };
  return (
    <div className={styles.App}>
      <div className={styles.headerWrapper}>
        <Appheader />
      </div>
      <main className={styles.main}>
          <BurgerIngredients allIngredients={allIngredients} onClick={addNewIngredient}/>
					<BurgerConstructor  array={constructor} price={price}  />
      </main>
    </div>
  );
}

export default App;
