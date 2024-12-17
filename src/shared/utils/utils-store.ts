import BaseError from "src/layers/domain/errors/base-error";
import { create } from "zustand";

type StoreError = string | null | BaseError | unknown;
type StoreLoading = boolean;
type StoreValue<T> = T | null;

interface IValueStore<T> {
  loading: StoreLoading;
  error: StoreError;
  value: StoreValue<T>;
  setLoading: (newLoading: StoreLoading) => void;
  setError: (newError: StoreError) => void;
  setValue: (newValue: StoreValue<T>) => void;
  reset: () => void;
}

interface IAlertStore {
  message: string;
  isValid: boolean;
  setMessage: (message: string) => void;
  close: () => void;
}

export default class UtilsStore {
  static createStoreAlert() {
    return create<IAlertStore>((set) => ({
      message: "",
      isValid: false,
      setMessage: (message) => set({ message, isValid: message.trim() !== "" }),
      close: () => set({ isValid: false, message: "" }),
    }));
  }

  static createStoreByType<T>() {
    return create<IValueStore<T>>((set) => ({
      loading: false,
      error: null,
      value: null as StoreValue<T>,
      setLoading: (newLoading: StoreLoading) => set({ loading: newLoading }),
      setError: (newError: StoreError) => set({ error: newError }),
      setValue: (newValue: StoreValue<T>) => set({ value: newValue }),
      reset: () => set({ value: null, error: null, loading: false }),
    }));
  }
}
