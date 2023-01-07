import styles from "./BurgerIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TypeIngredientsElem } from "../../types/types";

type Props = {
	elem: TypeIngredientsElem,
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

const BurgerIngredients: FC <Props> = ({ elem, onClick }) => {
  return (
    <div className={styles.element} onClick={onClick}>
      {elem.count ? <div className={styles.count}>{elem.count}</div> : null}

      <img src={elem.image} alt="ingredient" />
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

export default BurgerIngredients;
