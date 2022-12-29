import { ingredients } from '../constants/constants';
import styles from './IngredientList.module.css'; 
import {CurrencyIcon, Text} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

const IngredientList = ({onClick}) => {
	const bulky = ingredients.filter(elem=> elem.type == 'bun')
	const mainIngredient = ingredients.filter(elem=> elem.type == 'main')
	const sauceIngredient = ingredients.filter(elem=> elem.type == 'sauce')

	const [addIngredient, setAddIngredient] = useState('')

	const sortListForType = (elements, category) => {
		return (
			<>
				<span className='text text_type_main-medium'>{category}</span>
				<div className={styles.sortBlock}>
					{elements.map((elem, index)=> 
						<div key={index} className={styles.element} onClick={onClick}>
							<img src={elem.image} />
							<div className={styles.priceWrapper}>
								<span className={`text text_type_digits-default ${styles.price}`}>{elem.price}</span>
								<CurrencyIcon />
							</div>
							<h4 className={`text text_type_default ${styles.description}`}>{elem.name}</h4>
						</div>
					)}
				</div>
			</>
		)
	}
	
	return ( 
		<div className={styles.wrapper}>
			{sortListForType(bulky, 'Булки')}
			{sortListForType(sauceIngredient, 'Соусы' )}
			{sortListForType(mainIngredient, 'Начинки')}
		</div>
		
	 );
}
 
export default IngredientList;