import styles from "./App.module.css";
import Appheader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { TypeConstructorElem } from "../../types/types";
import { TypeIngredientsElem } from "../../types/types";
import { useEffect, useState } from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Loader from "../../UI/Loader";
import { API_INGREDIENTS } from "../../constants";

function App() {
  const [ingredients, setIngredients] = useState<TypeIngredientsElem[]>([]);
  const [constructor, setConstructor] = useState<TypeConstructorElem[]>([]);
  const [price, setPrice] = useState(0); //итоговая стоимость в конструкторе
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
        const bread = data.find((elem) => elem.type === "bun")!;
        const main = data.find((elem) => elem.type === "main")!;
        const defaultConstructor: TypeConstructorElem[] = [
          {
            _id: bread._id,
            type: "top",
            isLocked: true,
            text: bread.name + " (верх)",
            price: bread.price,
            thumbnail: bread.image || "",
          },
          {
            _id: main._id,
            text: main.name,
            price: main.price,
            thumbnail: main.image || "",
          },
          {
            _id: bread._id,
            type: "bottom",
            isLocked: true,
            text: bread.name + " (низ)",
            price: bread.price,
            thumbnail: bread.image || "",
          },
        ];
        setConstructor(defaultConstructor);
        setPrice(
          defaultConstructor.reduce((sum, element) => sum + element.price, 0)
        );
        setIngredients(
          data.map((el) => {
            el.count = defaultConstructor.some((c) => c._id === el._id) ? 1 : 0;
            return el;
          })
        );
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

  return (
    <div className={styles.App}>
      <div className={styles.headerWrapper}>
        <Appheader />
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h1>Ошибка</h1>
      ) : (
        <>
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor array={constructor} price={price} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;

//FUTURE Добавление ингредиентов в конструктор и обновление значений count в ингредиентах
// const addNewIngredient = (newElem: TypeIngredientsElem) => {
//   const newArrayConstructor = [...constructor];
//   const newArrayIngredients = [...ingredients];

//   if (newElem.type === "bun") {
//     newArrayIngredients.map((element) => {
//       if (element.type === "bun" && element.name !== newElem.name) {
//         element.count = 0;
//       }
//       return element;
//     });
//     newArrayIngredients.map((element) => {
//       if (element.name === newElem.name) {
//         element.count = 1;
//       }
//       return element;
//     });
//     newArrayConstructor.splice(0, 1, {
//       _id: newElem._id,
//       type: "top",
//       isLocked: true,
//       text: newElem.name + " (верх)",
//       price: newElem.price,
//       thumbnail: newElem.image || "",
//     });
//     newArrayConstructor.splice(newArrayConstructor.length - 1, 1, {
//       _id: newElem._id,
//       type: "bottom",
//       isLocked: true,
//       text: newElem.name + " (низ)",
//       price: newElem.price,
//       thumbnail: newElem.image || "",
//     });
//   } else {
//     newArrayIngredients.map((element) => {
//       if (element.name === newElem.name) {
//         element.count++;
//       }
//       return element;
//     });
//     newArrayConstructor.splice(1, 0, {
//       _id: newElem._id,
//       text: newElem.name,
//       price: newElem.price,
//       thumbnail: newElem.image || "",
//     });
//   }
//   setIngredients(newArrayIngredients);
//   setConstructor(newArrayConstructor);
//   setPrice(recountPrice(newArrayConstructor));
// };
