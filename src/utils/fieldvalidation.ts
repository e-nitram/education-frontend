export function validatePhone(number: string): string {
  const x = number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  if (x !== null) {
    number =
      x[2] === ''
        ? x[1]
        : '(' + x[1] + ') ' + x[2] + (x[3].length > 0 ? '-' + x[3] : '');
  }
  return number;
}

export function validatePhoneNumber(phoneNumber: string) {
  const pattern = /^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$/;
  return pattern.test(phoneNumber);
}
