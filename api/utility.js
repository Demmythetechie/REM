function date() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');         // "01" to "31"
  const month = String(now.getMonth() + 1).padStart(2, '0');  // "01" to "12"
  const year = now.getFullYear();                             // e.g. 2025

  const formatted = `${day}${month}${year}`;
  return formatted;
}

export {date};