import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import PagesWithInput from "../components/PagesWithInput/PagesWithInput";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [value, setValue] = useState("value");
  const inputRef = useRef(null);
  const bottomContent = (
    <>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </>
  );
  return (
    <div>
      <PagesWithInput
        title={"Вход"}
        buttonName={"Войти"}
        bottomContent={bottomContent}
      >
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
          extraClass="mb-5 mt-5"
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
    </div>
  );
};
