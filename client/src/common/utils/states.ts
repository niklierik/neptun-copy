import { type } from "os";
import { Dispatch, SetStateAction } from "react";

export type State<T> = [T, Dispatch<SetStateAction<T>>];

export type StringState = State<string>;
export type StringArrayState = State<string[]>;

export type DateState = State<Date>;
