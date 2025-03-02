export const toHexString = (uint8Arr: Uint8Array) => {
  return Array.from(uint8Arr, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};

export const getPixel24 = (
  bmpData: string | null,
  rowSize: number,
  col: number,
  row: number
): string => {
  if (!bmpData) return "Error";
  const offset = row * (rowSize + 4) + col * 6;
  if (offset + 6 > bmpData.length) return "Error";
  const bgrHex = bmpData.slice(offset, offset + 6);
  const b = bgrHex.slice(0, 2);
  const g = bgrHex.slice(2, 4);
  const r = bgrHex.slice(4, 6);
  return `#${r}${g}${b}`.toUpperCase();
};
export const getPixel32 = (
  bmpData: string | null,
  rowSize: number,
  col: number,
  row: number
): string => {
  if (!bmpData) return "Error";
  const offset = row * rowSize + col * 8;
  if (offset + 6 > bmpData.length) return "Errorr";
  const bgrHex = bmpData.slice(offset, offset + 6);
  const b = bgrHex.slice(0, 2);
  const g = bgrHex.slice(2, 4);
  const r = bgrHex.slice(4, 6);
  return `#${r}${g}${b}`.toUpperCase();
};

export const colorToNameX1 = (hex: string | null) => {
  if (!hex) return "Not found";
  const color = hex.toLowerCase().replace(/^#/, "");
  switch (color) {
    case "ffffff":
      return "ขาว";
    case "000000":
      return "ดำ";
    case "e70000":
      return "แดง";
    case "e2e200":
      return "เหลือง";
    case "43b85c":
      return "เขียว";
    case "da4327":
      return "ส้ม";
    case "398bec":
      return "ฟ้า";
    case "ef4f84":
      return "ชมพู";
    case "491d74":
      return "ม่วง";
    case "7b1703":
      return "น้ำตาล";
    default:
      return "Not found";
  }
};

export const colorToNameX20 = (hex: string | null) => {
  if (!hex) return "Not found";
  const color = hex.toLowerCase().replace(/^#/, "");
  switch (color) {
    case "ffffff":
      return "1";
    case "fedbb4":
      return "2";
    case "fec465":
      return "3";
    case "ffe600":
      return "4";
    case "ff9b14":
      return "5";
    case "ff751f":
      return "6";
    case "f72b0e":
      return "7";
    case "de0211":
      return "8";
    case "fabfb7":
      return "9";
    case "f3859b":
      return "10";
    case "ef2e4e":
      return "11";
    case "ce1c85":
      return "12";
    case "891e76":
      return "13";
    case "491d74":
      return "14";
    case "82e224":
      return "15";
    case "079729":
      return "16";
    case "0f592e":
      return "17";
    case "9fdbed":
      return "18";
    case "58c5c7":
      return "19";
    case "0083ad":
      return "20";
    case "1b2c5d":
      return "21";
    case "c55907":
      return "22";
    case "7b1703":
      return "23";
    case "4b0f14":
      return "24";
    case "c0c0c0":
      return "25";
    case "b8860b":
      return "26";
    case "d3d2c2":
      return "27";
    case "8b8b82":
      return "28";
    case "636466":
      return "29";
    case "000000":
      return "30";

    default:
      return "Not found";
  }
};
