// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var Filters = {
  datetime: null,
  city: null,
  state: null,
  country: null,
  shape: null,
};

// 3. Use this function to update the filters.
function updateFilters() {
  // 4a. Save the element that was changed as a variable.
  let datetime = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value");
  let state = d3.select("#state").property("value");
  let country = d3.select("#country").property("value");
  let shape = d3.select("#shape").property("value");

  // 4b. Save the value that was changed as a variable.
  if (datetime !== "") {
    Filters.datetime = datetime;
  } else {
    Filters.datetime = null;
  }
  if (city !== "") {
    Filters.city = city;
  } else {
    Filters.city = null;
  }
  if (state !== "") {
    Filters.state = state;
  } else {
    Filters.state = null;
  }
  if (country !== "") {
    Filters.country = country;
  } else {
    Filters.country = null;
  }
  if (shape !== "") {
    Filters.shape = shape;
  } else {
    Filters.shape = null;
  }

  console.log(Filters);
  // 4c. Save the id of the filter that was changed as a variable.

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.

  // 6. Call function to apply all filters and rebuild the table
  filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  let filteredData = [];

  // 8. Set the filtered data to the tableData.
  // filterTable = JSON.parse(JSON.stringify(tableData));

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values

  tableData.forEach((sighting) => {
    let matchesAll = false;
    if (
      (Filters.datetime === null || sighting.datetime === Filters.datetime) &&
      (Filters.city === null || sighting.city === Filters.city) &&
      (Filters.state === null || sighting.state === Filters.state) &&
      (Filters.country === null || sighting.country === Filters.country) &&
      (Filters.shape === null || sighting.shape === Filters.shape)
    ) {
      matchesAll = true;
    }
    if (matchesAll) {
      filteredData.push(sighting);
    }
  });

  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);