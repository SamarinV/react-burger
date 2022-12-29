import React from 'react';
import ReactDOM from 'react-dom'  
import { ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = ({array}) => {
    return (
			<section className={styles.section}>
				<div className={styles.constructor}>
					{array.map((elem, index) => {
						if(elem.type == 'top' || elem.type == 'bottom'){
							return (
								<ConstructorElement
									key={index}
									type={elem.type}
									isLocked={true}
									text={`${elem.text}`}
									price={elem.price}
									thumbnail={elem.thumbnail}
								/>
							)
						}
						return (
								<ConstructorElement
									key={index}
									type={elem.type}
									isLocked={false}
									text={elem.text}
									price={elem.price}
									thumbnail={elem.thumbnail}
								/>
							)
						
					})}







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
					<span className={`text text_type_digits-medium ${styles.marginRight}`}>13257</span>
					<CurrencyIcon type="primary" />
					<span className={styles.marginRight}></span>
					<Button htmlType="button" type="primary" size="medium">
						Оформить заказ
					</Button>
				</div>
			</section>
		)
}
 
export default BurgerConstructor;
