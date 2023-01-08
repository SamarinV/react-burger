import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useState, useRef, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Main.module.css";
import { INGREDIENTS } from "../../utils/mocData";
import { TypeConstructorElem } from "../../types/types";
import { TypeIngredientsElem } from "../../types/types";

const Main: FC = () => {
  //ДЛЯ ПРАВОЙ КОЛОНКИ
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

  // ДЛЯ ЛЕВОЙ КОЛОНКИ
  // ТАБЫ
  const [ingredientTab, setIngredientTab] = useState("Булки");
  const scrollToBread = useRef<HTMLDivElement>(null);
  const scrollToSauce = useRef<HTMLDivElement>(null);
  const scrollToMainIngredient = useRef<HTMLDivElement>(null);
	const scrollFunc = (name: string, ref: React.RefObject<HTMLDivElement>) => {
		if(ref && ref.current){
    setIngredientTab(name);
    ref.current.scrollIntoView();
		}
  };

	//Создание нового массива ингредиентов с добавлением параметра count
	const ingredientsWithCount = INGREDIENTS.map((elem) => {
      return { ...elem, count: 0 };
    });
    for (let i = 0; i < constructor.length; i++) {
      for (let j = 0; j < ingredientsWithCount.length; j++) {
        if (constructor[i]._id === ingredientsWithCount[j]._id) {
          ingredientsWithCount[j].count = 1;
        }
      }
    }
  const [allIngredients, setAllIngredients] = useState([...ingredientsWithCount]);

 //списки ингредиетов по категориям
  const bread: TypeIngredientsElem[] = allIngredients.filter((elem) => elem.type === "bun");
  const mainIngredient: TypeIngredientsElem[] = allIngredients.filter((elem) => elem.type === "main");
  const sauceIngredient: TypeIngredientsElem[] = allIngredients.filter((elem) => elem.type === "sauce");

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

  //Отрисовка списка игредиентов по категориям (булки, соусы, начинки)
  const sortListForType = (elements: TypeIngredientsElem[], category: string, ref: React.RefObject<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <span className="text text_type_main-medium">{category}</span>
        <div className={styles.sortBlock}>
          {elements.map((elem) => (
            <BurgerIngredients
              elem={elem}
              key={elem._id}
              onClick={() => addNewIngredient(elem)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={styles.tabWrapper}>
          <Tab
            value="one"
            active={ingredientTab === "Булки"}
            onClick={() => scrollFunc("Булки", scrollToBread)}
          > Булки
          </Tab>

          <Tab
            value="two"
            active={ingredientTab === "Соусы"}
            onClick={() => scrollFunc("Соусы", scrollToSauce)}
          > Соусы
          </Tab>

          <Tab
            value="three"
            active={ingredientTab === "Начинки"}
            onClick={() => scrollFunc("Начинки", scrollToMainIngredient)}
          > Начинки
          </Tab>
        </div>
        <div className={styles.wrapper}>
          {sortListForType(bread, "Булки", scrollToBread)}
          {sortListForType(sauceIngredient, "Соусы", scrollToSauce)}
          {sortListForType(mainIngredient, "Начинки", scrollToMainIngredient)}
        </div>
      </section>

      <BurgerConstructor array={constructor} price={price} />
    </>
  );
};

export default Main;
