import React from 'react';
import { Button, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const AppHeader = () => {
    return (
			<header className={styles.header}>
				<div className={styles.wrapper}>
					<div className={styles.wrapperForTwoButton}>
						<Button style={{display: 'flex', alignItems: 'center'}} htmlType="button" type="secondary">
							<BurgerIcon type="primary" />
							<p className={`text text_type_main-default text_color_inactive ${styles.marginLeft}`}>Конструктор</p>
						</Button>
						<Button style={{display: 'flex', alignItems: 'center'}} htmlType="button" type="secondary">
							<ListIcon type="primary" />
							<p className={`text text_type_main-default ${styles.marginLeft}`}>Лента заказов</p>
						</Button>
					</div>
					<Logo />
					<Button style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}} htmlType="button" type="secondary">
						<ProfileIcon type="primary" />
						<p className={`text text_type_main-default ${styles.marginLeft}`}>Личный кабинет</p>
					</Button>
				</div>
			</header>
		)
}

export default AppHeader;