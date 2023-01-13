import { FC } from "react";
import { TypeIngredientsElem } from "../../types/types";
import styles from "./IngredientDetails.module.css";

type Props = {
  elem: TypeIngredientsElem | null;
};

const IngredientsDetails: FC<Props> = ({ elem }) => {
  if (elem === null) {
    return null;
  }
  return (
    <>
      <img src={elem.image_large} alt={elem.name} />
      <h2 className={`text text_type_main-large ${styles.description}`}>
        {elem.name}
      </h2>
      <div className={styles.block}>
        <div className={styles.characteristics}>
          <span className="text text_type_main-default">Калории, ккал</span>
          <span className="text text_type_digits-default">{elem.calories}</span>
        </div>
        <div className={styles.characteristics}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">{elem.proteins}</span>
        </div>
        <div className={styles.characteristics}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">{elem.fat}</span>
        </div>
        <div className={styles.characteristics}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {elem.carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
};

export default IngredientsDetails;
