export function formatNumber(number) {
  if (number) {
    // Convert the number to a string and split it into integer and decimal parts
    let [intPart, decPart] = number.toString().split(".");

    // Format the integer part
    intPart = intPart.split("").reverse().join("");
    intPart = intPart.replace(/(\d{3})(?=\d)/g, "$1,");
    intPart = intPart.split("").reverse().join("");
    intPart = intPart.replace(/^,/, "");

    // Handle the decimal part
    decPart = decPart ? decPart.padEnd(2, "0").slice(0, 2) : "00";

    // Combine the parts and return
    return intPart + "." + decPart;
  }
}
