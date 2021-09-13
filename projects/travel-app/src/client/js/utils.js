// primary object placeholder to initialize page

const myObj = {

  dest: "Berlin, Berlin, DE",
  date: ""

};
// make date value and min equal today's date, set max to one year from today

(function () {

  let date = new Date();

  let day = date.getDate();

  let month = date.getMonth() + 1;

  let initMonth = date.getMonth() + 2;

  let year = date.getFullYear();

  if (month < 10) month = "0" + month;

  if (initMonth < 10) initMonth = "0" + initMonth;

  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;

  let nextYear = year + 1 + "-" + month + "-" + day;

  // setting one month in future as the init date

  let initDate = year + "-" + initMonth + "-" + day;

  // setting date input field min and max values

  document.getElementById("date-input__form").min = today;

  document.getElementById("date-input__form").max = nextYear;

  // setting placeholder date property equal to initDate

  myObj.date = initDate;

})();

export {myObj};
