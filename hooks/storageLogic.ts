import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface stateProps {
  setSeat: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}

const isNumber = (input: string): boolean => {
  return /^\d{1,2}$/.test(input);
};
const isAlphabet = (input: string): boolean => {
  return /^[A-Z]$/.test(input);
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return "";
  } catch (e) {
    return "err";
  }
};
export const readData = async (key: string) => {
  let value = await AsyncStorage.getItem(key);
  if (value == null) {
    return "NULL";
  } else {
    return value;
  }
};

export const InfoHook = (
  seat: string,
  position: string,
  location: string,
  router: ReturnType<typeof useRouter>
) => {
  if (
    isNumber(position) &&
    isAlphabet(seat) &&
    position !== "0" &&
    position !== "00" &&
    parseInt(position) < 51 &&
    seat !== "Z"
  ) {
    storeData("seat", seat);
    storeData("position", position);
    storeData("isLoggedIn", "true");
    router.push(`${location}`);
    return "";
  } else {
    return "err";
  }
};

export const fLogHook = async (
  { setSeat, setPosition }: stateProps,
  location: string,
  router: ReturnType<typeof useRouter>
) => {
  try {
    const formerData = await readData("isLoggedIn");
    if (formerData == "NULL") {
      return "NULL";
    }
    const seatVale = await readData("seat");
    const posValue = await readData("position");
    if (seatVale && posValue) {
      setSeat(seatVale);
      setPosition(posValue);
      router.push(`${location}`);
      return "";
    } else {
      return "err";
    }
  } catch (e) {
    return "err";
  }
};
