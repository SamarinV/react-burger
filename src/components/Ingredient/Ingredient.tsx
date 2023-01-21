import styles from "./Ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TypeIngredientsElem } from "../../types/types";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addModalContent } from "../../store/modalContentSlice";

type Props = {
  elem: TypeIngredientsElem;
};

const Ingredient: FC<Props> = ({ elem }) => {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: elem,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={dragRef}
      className={styles.element}
      onClick={() => dispatch(addModalContent(elem))}
    >
      {elem.count ? <div className={styles.count}>{elem.count}</div> : null}

      <img src={elem.image} alt={elem.name} />
      <div className={styles.priceWrapper}>
        <span className={`text text_type_digits-default ${styles.price}`}>
          {elem.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`text text_type_default ${styles.description}`}>
        {elem.name}
      </h4>
    </div>
  );
};

export default Ingredient;
