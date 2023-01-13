import Ingredient from "../Ingredient/Ingredient";
import { useState, useRef, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { TypeIngredientsElem } from "../../types/types";
import Modal from "../Modal/Modal";
import IngredientsDetails from "../IngredientDetails/IngredientDetails";

type Props = {
  ingredients: TypeIngredientsElem[];
};

const BurgerIngredients: FC<Props> = ({ ingredients }) => {
  const [dataModal, setDataModal] = useState<TypeIngredientsElem | null>(null);
  const closeModal = () => {
    setDataModal(null);
  };
  // ТАБЫ
  const [ingredientTab, setIngredientTab] = useState("Булки");
  const scrollToBread = useRef<HTMLDivElement>(null);
  const scrollToSauce = useRef<HTMLDivElement>(null);
  const scrollToMainIngredient = useRef<HTMLDivElement>(null);
  const scrollFunc = (name: string, ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      setIngredientTab(name);
      ref.current.scrollIntoView();
    }
  };

  if (ingredients.length === 0) {
    return null;
  }
  //списки ингредиетов по категориям
  const bread: TypeIngredientsElem[] = ingredients.filter(
    (elem) => elem.type === "bun"
  );
  const mainIngredient: TypeIngredientsElem[] = ingredients.filter(
    (elem) => elem.type === "main"
  );
  const sauceIngredient: TypeIngredientsElem[] = ingredients.filter(
    (elem) => elem.type === "sauce"
  );

  //Отрисовка списка игредиентов по категориям (булки, соусы, начинки)
  const sortListForType = (
    elements: TypeIngredientsElem[],
    category: string,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (!elements) return null;
    return (
      <div ref={ref}>
        <span className="text text_type_main-medium">{category}</span>
        <div className={styles.sortBlock}>
          {elements.map((elem) => (
            <Ingredient
              elem={elem}
              setDataModal={setDataModal}
              key={elem._id}
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
          >
            {" "}
            Булки
          </Tab>

          <Tab
            value="two"
            active={ingredientTab === "Соусы"}
            onClick={() => scrollFunc("Соусы", scrollToSauce)}
          >
            {" "}
            Соусы
          </Tab>

          <Tab
            value="three"
            active={ingredientTab === "Начинки"}
            onClick={() => scrollFunc("Начинки", scrollToMainIngredient)}
          >
            {" "}
            Начинки
          </Tab>
        </div>

        <div className={styles.wrapper}>
          {sortListForType(bread, "Булки", scrollToBread)}
          {sortListForType(sauceIngredient, "Соусы", scrollToSauce)}
          {sortListForType(mainIngredient, "Начинки", scrollToMainIngredient)}
        </div>
        {dataModal && (
          <Modal title="Детали ингредиента" closeModal={closeModal}>
            <IngredientsDetails elem={dataModal}></IngredientsDetails>
          </Modal>
        )}
      </section>
    </>
  );
};

export default BurgerIngredients;
