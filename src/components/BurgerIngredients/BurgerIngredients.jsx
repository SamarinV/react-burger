import styles from "./BurgerIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ elem, onClick }) => {
  return (
    <div
      className={styles.element}
      onClick={onClick}
      style={{ position: "relative" }}
    >
      {elem.count ? (
        <div
          style={{
            position: "absolute",
            width: 32,
            height: 32,
            backgroundColor: "blue",
            borderRadius: 50,
            top: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {elem.count}
        </div>
      ) : null}

      <img src={elem.image} alt="ingredient" />
      <div className={styles.priceWrapper}>
        <span className={`text text_type_digits-default ${styles.price}`}>
          {elem.price}
        </span>
        <CurrencyIcon />
      </div>
      <h4 className={`text text_type_default ${styles.description}`}>
        {elem.name}
      </h4>
    </div>
  );
};

export default BurgerIngredients;
