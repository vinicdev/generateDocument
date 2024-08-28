function generate() {
  const type = document.getElementById("type").value;
  const format = document.getElementById("format").value === "true";
  let result = "";

  if (type === "cpf") {
    result = generateCPF(format);
  } else if (type === "cnpj") {
    result = generateCNPJ(format);
  }

  document.getElementById("output").textContent = result;
}

function generateCPF(withFormatting) {
  let cpf = "";
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  cpf += calculateCPFCheckDigits(cpf);

  if (withFormatting) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpf;
}

function calculateCPFCheckDigits(cpf) {
  let sum1 = 0;
  let sum2 = 0;
  const cpfArray = cpf.split("").map(Number);

  // Cálculo do primeiro dígito verificador
  for (let i = 0; i < 9; i++) {
    sum1 += cpfArray[i] * (10 - i);
  }
  let digit1 = 11 - (sum1 % 11);
  digit1 = digit1 >= 10 ? 0 : digit1;

  // Cálculo do segundo dígito verificador
  sum2 = 0;
  for (let i = 0; i < 9; i++) {
    sum2 += cpfArray[i] * (11 - i);
  }
  sum2 += digit1 * 2;
  let digit2 = 11 - (sum2 % 11);
  digit2 = digit2 >= 10 ? 0 : digit2;

  return `${digit1}${digit2}`;
}

function generateCNPJ(withFormatting) {
  let cnpj = "";
  for (let i = 0; i < 12; i++) {
    cnpj += Math.floor(Math.random() * 10);
  }
  cnpj += calculateCNPJCheckDigits(cnpj);

  if (withFormatting) {
    cnpj = cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  return cnpj;
}

function calculateCNPJCheckDigits(cnpj) {
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const cnpjArray = cnpj.split("").map(Number);
  let sum1 = 0;
  let sum2 = 0;

  // Cálculo do primeiro dígito verificador
  for (let i = 0; i < 12; i++) {
    sum1 += cnpjArray[i] * weights1[i];
  }
  let digit1 = 11 - (sum1 % 11);
  digit1 = digit1 >= 10 ? 0 : digit1;

  // Cálculo do segundo dígito verificador
  for (let i = 0; i < 12; i++) {
    sum2 += cnpjArray[i] * weights2[i];
  }
  sum2 += digit1 * weights2[12];
  let digit2 = 11 - (sum2 % 11);
  digit2 = digit2 >= 10 ? 0 : digit2;

  return `${digit1}${digit2}`;
}
