function formatDateInput(date) {
  if (!date) return date;
  const d = new Date(date);
  return d
    .toLocaleDateString()
    .split('/')
    .reverse()
    .join('-');
}

function setTime(date, h, m, s, n) {
  const d = new Date(date);
  d.setHours(h, m, s, n);
  return d;
}

function startOfDay(d) {
  return setTime(d, 0, 0, 0, 0);
}

function endOfDay(d) {
  return setTime(d, 23, 59, 59, 999);
}

function dateRange(fromDate, toDate) {
  const startDate = formatDateInput(fromDate);
  const endDate = formatDateInput(toDate);

  var start = startDate.split('-');
  var end = endDate.split('-');
  var startYear = parseInt(start[0]);
  var endYear = parseInt(end[0]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth, '01'].join('-'));
    }
  }
  return dates;
}

module.exports = {
  formatDateInput,
  startOfDay,
  endOfDay,
  dateRange
};
