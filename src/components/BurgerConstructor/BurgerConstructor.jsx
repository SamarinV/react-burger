import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ array, price }) => {
  const topElement = array.find((elem) => elem.type === "top");
  const bottomElement = array.find((elem) => elem.type === "bottom");
  const mainElements = array.filter(
    (elem) => elem.type !== "top" && elem.type !== "bottom"
  );
  return (
    <section className={styles.section}>
      <div className={styles.constructor}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 72 }}></div>
          <ConstructorElement
            type={topElement.type}
            isLocked={true}
            text={`${topElement.text}`}
            price={topElement.price}
            thumbnail={topElement.thumbnail}
          />
        </div>

        <div className={styles.mainCards}>
          {mainElements.map((elem, index) => {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 38 }}></div>
                <DragIcon />
                <div style={{ width: 14 }}></div>
                <ConstructorElement
                  key={index}
                  type={elem.type}
                  isLocked={true}
                  text={`${elem.text}`}
                  price={elem.price}
                  thumbnail={elem.thumbnail}
                  extraClass={styles.card}
                />
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 72 }}></div>
          <ConstructorElement
            type={bottomElement.type}
            isLocked={true}
            text={`${bottomElement.text}`}
            price={bottomElement.price}
            thumbnail={bottomElement.thumbnail}
          />
        </div>

        {/* {array.map((elem, index) => {
          if (elem.type === "top" || elem.type === "bottom") {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 38 }}></div>
                <ConstructorElement
                  key={index}
                  type={elem.type}
                  isLocked={true}
                  text={`${elem.text}`}
                  price={elem.price}
                  thumbnail={elem.thumbnail}
                />
              </div>
            );
          }

          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <DragIcon />
              <div style={{ width: 14 }}></div>
              <ConstructorElement
                key={index}
                type={elem.type}
                isLocked={false}
                text={elem.text}
                price={elem.price}
                thumbnail={elem.thumbnail}
              />
            </div>
          );
        })} */}

        {/* <ConstructorElement
						type="top"
						isLocked={true}
						text="Краторная булка N-200i (верх)"
						price={200}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/>
							<ConstructorElement
						text="Краторная булка N-200i (верх)"
						price={50}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text="Краторная булка N-200i (низ)"
						price={200}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/> */}
      </div>
      <div className={styles.price}>
        <span className={`text text_type_digits-medium ${styles.marginRight}`}>
          {price}
        </span>
        <CurrencyIcon type="primary" />
        <span className={styles.marginRight}></span>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
