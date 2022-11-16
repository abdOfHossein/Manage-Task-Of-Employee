export class PublicFunc {
  static skipRow(page: number, row: number) {
    if (page <= 1) page = 0;
    else page -= 1;
    return page * row;
  }
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  static delLastZeroString(paramStr: string) {
    let sumStr = '';
    let index = -1;
    const reverse = paramStr.split('').reverse();
    reverse.forEach((item, row) => {
      if (item != '0' && index == -1) index = row;
    });
    return index == -1 ? '0' : paramStr.substring(0, paramStr.length - index);
  }
  static divide(inputNumber: string, precision: number) {
    const split = inputNumber.split('.');
    if (split.length == 1) return inputNumber;
    const rs =
      this.delLastZeroString(split[1].substring(0, precision)) != '0'
        ? '.' + this.delLastZeroString(split[1].substring(0, precision))
        : '';
    return split[0] + rs;
  }
}
