import { ScaledSheet } from "react-native-size-matters";
export const Styles = ScaledSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SubGradient: {
    position: "absolute",
    backgroundColor: "white",
    border: 1,
    borderColor: "red",
  },
  Title: {
    fontSize: "64@ms",
    color: "white",
    fontFamily: "SGTMid",
    paddingTop: "12@ms",
  },
  Label: {
    fontSize: "32@ms",
    color: "white",
    fontFamily: "SGTReg",
    textAlign: "center",
    padding: "20@ms",
  },
  InputBox: {
    fontSize: "24@ms",
    border: 2,
    backgroundColor: "rgba(15,23,42,0.5)",
  },
  TextButton: {
    color: "white",
    fontSize: "24@ms",
    fontFamily: "SGTMid",
  },
  Submit: {
    justifyContent: "center",
    alignItems: "center",
    width: "260@ms",
    height: "64@ms",
    backgroundColor: "#552ba4",
    marginTop: "28@ms",
    borderRadius: "8@ms",
  },
  FlexGrow: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
});
