import React, {useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from '../IngredientList/IngredientList';
import styles from './BurgerIngredients.module.css';


const BurgerIngredients  = ({onClick}) => {
	const [ingredient, setIngredient] = useState('Булки')
    return (
				<section className={styles.section}>
					<h1 className='text text_type_main-large'>Соберите бургер</h1>
					<div className={styles.tabWrapper}>
						<Tab value="one" active={ingredient === 'Булки'} onClick={()=>setIngredient('Булки')}>
							Булки
						</Tab>
						<Tab value="two" active={ingredient === 'Соусы'} onClick={()=>setIngredient('Соусы')}>
							Соусы
						</Tab>
						<Tab value="three" active={ingredient === 'Начинки'}  onClick={()=>setIngredient('Начинки')}>
							Начинки
						</Tab>
					</div>
					<IngredientList onClick={onClick}/>
				</section>
		)}
 
export default BurgerIngredients;