import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import PagesWithInput from "../components/PagesWithInput/PagesWithInput";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [value, setValue] = useState("value");
  const inputRef = useRef(null);
  const bottomContent = (
    <p className="text text_type_main-default text_color_inactive mb-4">
      Уже зарегистрированы? <Link to="/login">Войти</Link>
    </p>
  );
  return (
    <>
      <PagesWithInput
        title={"Регистрация"}
        buttonName={"Зарегистрироваться"}
        bottomContent={bottomContent}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
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
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={""}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-5"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => setValue(e.target.value)}
          icon={"ShowIcon"}
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
