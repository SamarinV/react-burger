import styles from "./App.module.css";
import Appheader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { TypeConstructorElem } from "../../types/types";
import { TypeIngredientsElem } from "../../types/types";
import { TypeOpenModal } from "../../types/types";
import { useEffect, useState } from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import Loader from "../../UI/Loader";

function App() {
  //начальные элементы для конструктора
  const [constructor, setConstructor] = useState<TypeConstructorElem[]>([
    {
      _id: "60d3b41abdacab0026a733c6",
      type: "top",
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 1255,
      thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      _id: "60d3b41abdacab0026a733ca",
      text: "Говяжий метеорит (отбивная)",
      price: 3000,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-04.png",
    },
    {
      _id: "60d3b41abdacab0026a733c6",
      type: "bottom",
      isLocked: true,
      text: "Краторная булка N-200i (низ)",
      price: 1255,
      thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<TypeIngredientsElem[]>([]);
  const [isError, setIsError] = useState(false);

  function fetchIngredients() {
    setIsLoading(true);
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((resp) => resp.json())
      .then(({ data }: { data: TypeIngredientsElem[] }) => {
        setIngredients(
          data.map((el) => {
            el.count = constructor.some((c) => c._id === el._id) ? 1 : 0;
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

  //Итоговая стоимость в кострукторе
  const recountPrice = (array: TypeConstructorElem[]) => {
    return array.reduce((sum, element) => sum + element.price, 0);
  };
  const [price, setPrice] = useState(recountPrice(constructor));

  const [isOpenModal, setOpenModal] = useState<TypeOpenModal>({
    isOpen: false,
    type: "",
  }); //для портала
  const [contentModal, setContentModal] = useState<TypeIngredientsElem | null>(
    null
  ); //по клику меняем контент для модала

  return (
    <div className={styles.App}>
      <header className={styles.headerWrapper}>
        <Appheader />
      </header>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h1>Ошибка</h1>
      ) : (
        <>
          <main className={styles.main}>
            <BurgerIngredients
              ingredients={ingredients}
              openModal={setOpenModal}
              setContentModal={setContentModal}
            />
            <BurgerConstructor
              openModal={setOpenModal}
              array={constructor}
              price={price}
            />
          </main>
          <div>
            <Modal
              isOpenModal={isOpenModal}
              closeModal={setOpenModal}
              contentModal={contentModal}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

//FUTURE Добавление ингредиентов в конструктор и обновление значений count в ингредиентах

// const addNewIngredient = (newElem: TypeIngredientsElem) => {
//   const newArrayConstructor = [...constructor];
// 	const newArrayIngredients = [...ingredients]

//   if (newElem.type === "bun") {
//     newArrayIngredients.map((element) => {
//       if (element.type === "bun" && element.name !== newElem.name) { element.count = 0 }
//       return element;
//     });
// 		newArrayIngredients.map((element) => {
// 			if (element.name === newElem.name) { element.count = 1 }
//       return element;
// 		})
//     newArrayConstructor.splice(0, 1, {
//       _id: newElem._id,
//       type: "top",
//       isLocked: true,
//       text: newElem.name + " (верх)",
//       price: newElem.price,
//       thumbnail: newElem.image || ''
//     });
//     newArrayConstructor.splice(newArrayConstructor.length - 1, 1, {
//       _id: newElem._id,
//       type: "bottom",
//       isLocked: true,
//       text: newElem.name + " (низ)",
//       price: newElem.price,
//       thumbnail: newElem.image || ''
//     });

//   } else {
// 		newArrayIngredients.map((element) => {
// 			if (element.name === newElem.name) { element.count++ }
//       return element;
// 		})
//     newArrayConstructor.splice(1, 0, {
//       _id: newElem._id,
//       text: newElem.name,
//       price: newElem.price,
//       thumbnail: newElem.image || ''
//     });
//   }
// 	setIngredients(newArrayIngredients)
//   setConstructor(newArrayConstructor);
//   setPrice(recountPrice(newArrayConstructor));
// };
