import {
  Button,
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { FC } from "react";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperForTwoButton}>
          <Button extraClass={styles.button} htmlType="button" type="secondary">
            <BurgerIcon type="primary" />
            <Link
              to="/"
              className={`text text_type_main-default text_color_inactive ${styles.marginLeft}`}
            >
              Конструктор
            </Link>
          </Button>
          <Button
            extraClass={`${styles.button} ${styles.marginLeft}`}
            htmlType="button"
            type="secondary"
          >
            <ListIcon type="primary" />
            <Link
              to="/order-feed"
              className={`text text_type_main-default ${styles.marginLeft}`}
            >
              Лента заказов
            </Link>
          </Button>
        </div>
        <Logo />
        <Button
          extraClass={`${styles.button} ${styles.butonMarginLeft}`}
          htmlType="button"
          type="secondary"
        >
          <ProfileIcon type="primary" />
          <Link
            to="/login"
            className={`text text_type_main-default ${styles.marginLeft}`}
          >
            Личный кабинет
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
