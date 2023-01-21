import { FC } from "react";
import { useSelector } from "react-redux";
import Loader from "../../UI/Loader";
import styles from "./OrderDetails.module.css";
const logo = require("./done.png");

type Props = {
  isOrderLoading: boolean;
};

const OrderDetails: FC<Props> = ({ isOrderLoading }) => {
  const orderNumber = useSelector((state: any) => state.orderNumber.items);

  return (
    <>
      {isOrderLoading ? (
        <Loader />
      ) : (
        <h1 className={`text text_type_digits-large ${styles.orderCount}`}>
          {orderNumber}
        </h1>
      )}
      <p className={`text text_type_main-large ${styles.paragraph}`}>
        Индификатор заказа
      </p>
      <img className={styles.iconAccpeted} src={logo} alt="order accpeted" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
