import Ingredient from "../Ingredient/Ingredient";
import { useState, useRef, FC, useEffect, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { TypeIngredientsElem } from "../../types/types";
import Modal from "../Modal/Modal";
import IngredientsDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { API_INGREDIENTS } from "../../constants";
import { getAllIngredients } from "../../store/ingredientsSlice";
import Loader from "../../UI/Loader";
import { InView } from "react-intersection-observer";
import React from "react";

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function fetchIngredients() {
    setIsLoading(true);
    fetch(API_INGREDIENTS)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(({ data }: { data: TypeIngredientsElem[] }) => {
        const array = data.map((elem) => {
          elem.count = 0;
          return elem;
        });
        dispatch(getAllIngredients(array));
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    fetchIngredients();
  }, []);

  const modalContent = useSelector((state: any) => state.modalContent.items);

  const ingredients: TypeIngredientsElem[] = useSelector(
    (store: any) => store.ingredients.items
  );

  // ТАБЫ
  const [ingredientTab, setIngredientTab] = useState("Булки");

  const onTabClick = (
    name: string,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    if (ref && ref.current) {
      setIngredientTab(name);
      ref.current.scrollIntoView();
    }
  };
  //Рефы каждой категории для скрола по нажатию кнопки таба
  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainIngRef = useRef<HTMLDivElement | null>(null);
  //Состояния для View
  const [viewBun, setViewBun] = useState(false);
  const [viewSauce, setViewSauce] = useState(false);
  const [viewMainIng, setViewMainIng] = useState(false);

  //Изменение активного таба
  useEffect(() => {
    if (viewBun || (viewBun && viewSauce)) {
      setIngredientTab("Булки");
    } else if (viewSauce || (viewSauce && viewMainIng)) {
      setIngredientTab("Соусы");
    } else if (viewMainIng) {
      setIngredientTab("Начинки");
    }
  }, [viewBun, viewSauce, viewMainIng]);

  //списки ингредиетов по категориям
  const bun = useMemo<TypeIngredientsElem[]>(() => {
    return ingredients.filter((elem) => elem.type === "bun");
  }, [ingredients]);

  const mainIngredient = useMemo<TypeIngredientsElem[]>(() => {
    return ingredients.filter((elem) => elem.type === "main");
  }, [ingredients]);

  const sauceIngredient = useMemo<TypeIngredientsElem[]>(() => {
    return ingredients.filter((elem) => elem.type === "sauce");
  }, [ingredients]);

  //Отрисовка списка игредиентов по категориям (булки, соусы, начинки)
  const sortListForType = (
    elements: TypeIngredientsElem[],
    category: string,
    ref: any
  ) => {
    if (!elements) return null;
    return (
      <div ref={ref} id={category}>
        <span className="text text_type_main-medium">{category}</span>
        <div className={styles.sortBlock}>
          {elements.map((elem) => (
            <Ingredient elem={elem} key={elem._id} />
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
            onClick={() => onTabClick("Булки", bunRef)}
          >
            Булки
          </Tab>

          <Tab
            value="two"
            active={ingredientTab === "Соусы"}
            onClick={() => onTabClick("Соусы", sauceRef)}
          >
            Соусы
          </Tab>

          <Tab
            value="three"
            active={ingredientTab === "Начинки"}
            onClick={() => onTabClick("Начинки", mainIngRef)}
          >
            Начинки
          </Tab>
        </div>

        <div className={styles.wrapper}>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <h1>Ошибка</h1>
          ) : (
            <>
              <InView onChange={setViewBun}>
                {sortListForType(bun, "Булки", bunRef)}
              </InView>
              <InView onChange={setViewSauce}>
                {sortListForType(sauceIngredient, "Соусы", sauceRef)}
              </InView>
              <InView onChange={setViewMainIng}>
                {sortListForType(mainIngredient, "Начинки", mainIngRef)}
              </InView>
            </>
          )}
        </div>
        {modalContent && (
          <Modal title="Детали ингредиента">
            <IngredientsDetails elem={modalContent}></IngredientsDetails>
          </Modal>
        )}
      </section>
    </>
  );
};

export default React.memo(BurgerIngredients);
