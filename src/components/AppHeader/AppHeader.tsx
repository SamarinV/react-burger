import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { FC } from "react";
import styles from "./AppHeader.module.css";
import { NavLink } from "react-router-dom";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperForTwoButton}>
          <NavLink
            to="/"
            className={`text text_type_main-default ${styles.link}`}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type="primary" />
                <span className={isActive ? `${styles.linkActive}` : ""}>
                  Конструктор
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/order-feed"
            className={`text text_type_main-default ${styles.link}`}
          >
            {({ isActive }) => (
              <>
                <ListIcon type="primary" />
                <span className={isActive ? `${styles.linkActive}` : ""}>
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
        </div>

        <span className={` ${styles.mainLogo}`}>
          <Logo />
        </span>

        <div className={styles.lastLink}>
          <NavLink
            to="/login"
            className={`text text_type_main-default ${styles.link}`}
          >
            {({ isActive, isPending }) => (
              <>
                <ProfileIcon type="primary" />
                <span className={isActive ? `${styles.linkActive}` : ""}>
                  Логин
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
