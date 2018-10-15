function formatDateInput(date) {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

function setTime(date, h, m, s, n) {
  const d = new Date(date);
  date.setHours(h, m, s, n);
  return date;
}

function startOfDay(d) {
  return setTime(d, 0, 0, 0, 0);
}

function endOfDay(d) {
  return setTime(d, 23, 59, 59, 999);
}

module.exports = {
  formatDateInput,
  startOfDay,
  endOfDay
};
