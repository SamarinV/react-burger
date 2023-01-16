import React from "react";
import { TypeConstructorElem } from "../types/types";

export const ConstructorContext = React.createContext<
  TypeConstructorElem[] | null
>(null);
