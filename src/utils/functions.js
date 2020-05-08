//  Function to sleep time
export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

//  Function to input number
export function isInputNumber(event) {
  let char = String.fromCharCode(event.which);
  if (!/[0-9]/.test(char)) {
    event.preventDefault();
  }
}

//  Function format CPF or CNPJ
export function formatCnpjCpf(value) {
  let cnpjCpf = value.replace(/\D/g, "");

  let tamanho = cnpjCpf.length;

  switch (tamanho) {
    case 11:
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    case 14:
      return cnpjCpf.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        "$1.$2.$3/$4-$5"
      );

    default:
      return value;
  }
}
