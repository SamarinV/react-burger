import Ingredient from "../Ingredient/Ingredient";
import { useState, useRef, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { TypeIngredientsElem } from "../../types/types";

type Props = {
	allIngredients: TypeIngredientsElem[],
	onClick: any, //TODO
}

const BurgerIngredients: FC<Props> = ({allIngredients, onClick}) => {

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

 //списки ингредиетов по категориям
  const bread: TypeIngredientsElem[] = allIngredients.filter((elem) => elem.type === "bun");
  const mainIngredient: TypeIngredientsElem[] = allIngredients.filter((elem) => elem.type === "main");
  const sauceIngredient: TypeIngredientsElem[] = allIngredients.filter((elem) => elem.type === "sauce");

  //Отрисовка списка игредиентов по категориям (булки, соусы, начинки)
  const sortListForType = (elements: TypeIngredientsElem[], category: string, ref: React.RefObject<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <span className="text text_type_main-medium">{category}</span>
        <div className={styles.sortBlock}>
          {elements.map((elem) => (
            <Ingredient
              elem={elem}
              key={elem._id}
              onClick={() => onClick(elem)}
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
    </>
  );
};

export default BurgerIngredients;
