import { createContext, useContext } from 'react';

export interface ModalConfig {
  close?: () => void;
}

const defaultContext: ModalConfig = {};

export const ModalContext = createContext(defaultContext);
export const useModalContext = () => useContext(ModalContext);
