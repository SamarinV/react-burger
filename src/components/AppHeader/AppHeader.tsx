import {
  Button,
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styles from "./AppHeader.module.css";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperForTwoButton}>
          <Button extraClass={styles.button} htmlType="button" type="secondary">
            <BurgerIcon type="primary" />
            <p
              className={`text text_type_main-default text_color_inactive ${styles.marginLeft}`}
            >
              Конструктор
            </p>
          </Button>
          <Button
            extraClass={`${styles.button} ${styles.marginLeft}`}
            htmlType="button"
            type="secondary"
          >
            <ListIcon type="primary" />
            <p className={`text text_type_main-default ${styles.marginLeft}`}>
              Лента заказов
            </p>
          </Button>
        </div>
        <Logo />
        <Button
          extraClass={`${styles.button} ${styles.butonMarginLeft}`}
          htmlType="button"
          type="secondary"
        >
          <ProfileIcon type="primary" />
          <p className={`text text_type_main-default ${styles.marginLeft}`}>
            Личный кабинет
          </p>
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
