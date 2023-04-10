import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import PagesWithInput from "../components/PagesWithInput/PagesWithInput";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [value, setValue] = useState("value");
  const inputRef = useRef(null);
  const bottomContent = (
    <p className="text text_type_main-default text_color_inactive mb-4">
      Вспомнили пароль?
      <Link to="/login">Войти</Link>
    </p>
  );
  return (
    <>
      <PagesWithInput
        title={"Восстановление пароля"}
        buttonName={"Сохранить"}
        bottomContent={bottomContent}
      >
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={(e) => setValue(e.target.value)}
          value={""}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-5 mt-5"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValue(e.target.value)}
          value={""}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-5"
        />
      </PagesWithInput>
    </>
  );
};
