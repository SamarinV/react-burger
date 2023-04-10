import { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./PagesWithInput.module.css";
type Props = {
  title: string;
  buttonName: string;
  children: any;
  bottomContent?: any;
};
const PagesWithInput: FC<Props> = ({
  title,
  buttonName,
  children,
  bottomContent,
}) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-medium">{title}</p>
      {children}
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        {buttonName}
      </Button>
      {bottomContent}
    </div>
  );
};

export default PagesWithInput;
