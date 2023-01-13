import styles from "./Ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TypeIngredientsElem } from "../../types/types";

type Props = {
  elem: TypeIngredientsElem;
  setDataModal: React.Dispatch<
    React.SetStateAction<TypeIngredientsElem | null>
  >;
};

const Ingredient: FC<Props> = ({ elem, setDataModal }) => {
  return (
    <div className={styles.element} onClick={() => setDataModal(elem)}>
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
