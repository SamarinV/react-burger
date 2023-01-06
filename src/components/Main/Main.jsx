import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Main.module.css";
import { INGREDIENTS } from "../constants/constants";

const Main = () => {
  //ДЛЯ ПРАВОЙ КОЛОНКИ
  const [constructor, setConstructor] = useState([
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
      type: "bottom",
      isLocked: true,
      text: "Краторная булка N-200i (низ)",
      price: 1255,
      thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
  ]);

  const recountPrice = (array) => {
    return array.reduce((sum, element) => sum + element.price, 0);
  };
  const [price, setPrice] = useState(recountPrice(constructor));

  // ДЛЯ ЛЕВОЙ КОЛОНКИ
  const [allIngredients, setAllIngredients] = useState([...INGREDIENTS]);

  const updateStartCardsCount = () => {
    const newIngredients = allIngredients.map((elem) => {
      return { ...elem, count: 0 };
    });
    for (let i = 0; i < constructor.length; i++) {
      for (let j = 0; j < newIngredients.length; j++) {
        if (constructor[i]._id === newIngredients[j]._id) {
          newIngredients[j].count = 1;
        }
      }
    }
    setAllIngredients(newIngredients);
  };

  useEffect(() => {
    updateStartCardsCount();
  }, []);

  const [ingredientTab, setIngredientTab] = useState("Булки");
  const bread = allIngredients.filter((elem) => elem.type === "bun");
  const mainIngredient = allIngredients.filter((elem) => elem.type === "main");
  const sauceIngredient = allIngredients.filter(
    (elem) => elem.type === "sauce"
  );

  const addNewIngredient = (elem) => {
    const arrayConstructor = [...constructor];

    if (elem.type === "bun") {
      allIngredients.map((element) => {
        //убираем count если выбрали другую булку
        if (element.type === "bun" && element.name !== elem.text) {
          element.count = 0;
        }
        return element;
      });
      elem.count = 1;
      arrayConstructor.splice(0, 1, {
        _id: elem._id,
        type: "top",
        isLocked: true,
        text: elem.name + " (верх)",
        price: elem.price,
        thumbnail: elem.image,
      });
      arrayConstructor.splice(arrayConstructor.length - 1, 1, {
        type: "bottom",
        isLocked: true,
        text: elem.name + " (низ)",
        price: elem.price,
        thumbnail: elem.image,
      });
    } else {
      elem.count ? elem.count++ : (elem.count = 1);
      arrayConstructor.splice(1, 0, {
        _id: elem._id,
        text: elem.name,
        price: elem.price,
        thumbnail: elem.image,
      });
    }
    setConstructor(arrayConstructor);
    setPrice(recountPrice(arrayConstructor));
  };

  const sortListForType = (elements, category) => {
    return (
      <>
        <span className="text text_type_main-medium">{category}</span>
        <div className={styles.sortBlock}>
          {elements.map((elem, index) => (
            <div>
              <BurgerIngredients
                elem={elem}
                key={index}
                onClick={() => addNewIngredient(elem)}
              />
            </div>
          ))}
        </div>
      </>
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
            onClick={() => setIngredientTab("Булки")}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={ingredientTab === "Соусы"}
            onClick={() => setIngredientTab("Соусы")}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={ingredientTab === "Начинки"}
            onClick={() => setIngredientTab("Начинки")}
          >
            Начинки
          </Tab>
        </div>
        <div className={styles.wrapper}>
          {sortListForType(bread, "Булки")}
          {sortListForType(sauceIngredient, "Соусы")}
          {sortListForType(mainIngredient, "Начинки")}
        </div>
      </section>

      <BurgerConstructor array={constructor} price={price} />
    </>
  );
};

export default Main;
