import React, { useState } from 'react';
import styles from './App.module.css';
import Appheader from './components/AppHeader/AppHeader';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';




function App() {
	const [constructor, setConstructor] = useState([
		 			{
						type: "top",
						isLocked: true,
						text: "Краторная булка N-200i (верх)",
						price: 200,
						thumbnail: 'https://code.s3.yandex.net/react/code/bun-02.png',
					},
							{
						text: "Краторная булка N-200i (верх)",
						price: 50,
						thumbnail: 'https://code.s3.yandex.net/react/code/bun-02.png'
					},
					{
						type: "bottom",
						isLocked: true,
						text: "Краторная булка N-200i (низ)",
						price: 200,
						thumbnail: 'https://code.s3.yandex.net/react/code/bun-02.png',
					}
	])


	// const addIngredient = (elem) => {
	// 	setConstructor(...constructor, {newIngredient})
	// 	console.log(elem)
	// }

  return (
    <div className={styles.App}>
			<div className={styles.headerWrapper}>
     		<Appheader />
			</div>
			<main className={styles.main}>
				<div style={{display: 'flex'}}>
					<BurgerIngredients onClick={''}/>
					<BurgerConstructor array={constructor} />
				</div>
			</main>
    </div>
  );
}

export default App;
