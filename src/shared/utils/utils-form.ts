export default class UtilsForm {
  static getFormDataByNameRef(
    e: React.FormEvent<HTMLFormElement>,
    nameRef: string,
  ): string {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const value = data[nameRef];
    return value.toString();
  }

  static setEmptyValueByInputRef(value: React.RefObject<HTMLInputElement>) {
    if (value.current) {
      value.current.value = "";
    }
  }
}
