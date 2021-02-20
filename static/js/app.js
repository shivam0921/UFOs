// from data.js
// const means a variable that cant change, similar to var, except u can constantly chanhe var. var only works 
//var works within the scope, but const overall
//every single object in data.js now belongs to the tableData variable. 
const tableData = data;

// get table references
//tbody is something in index.html. we are referencing the tbody element from html. 
//why? for html u have to add the tag inside of it. because it will display certain html functionality
//d3 is a library for visualization in js. 
//in d3 library there's the select function. 
var tbody = d3.select("tbody");

// 
function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  // for each row in the data.js we'll out it inside "tr" inside "tbody"
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    //datarow is what is actually in data.js in each row.
    //lines 30-33 are placing the data.js into row by row in the tr in tbody
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    // the reason why let is used here versus var: var only works within a scope. 
    //var will only work in the area that it was defined in, but not anywhere else. 
    //var is like locl currency, let is like bitcoin
    // whatever the value ythat you set inside the website (like the filters) that's what 'this' is
    let changedElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.

    let elementValue = changedElement.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    // 'id' is from the html site, like the ids of the filtered windows. but the 'value' is not going 
    //to be there unless u put the value in the textbox
    // this next line is simply setting the variable
    let filterId = changedElement.property("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    // the if statement and the else statement is what is changing and going the filtering.
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    //this is for when u delete the value that u just put in for filtring, then it goes back to the regular. 
    else {
      delete filters[filterId];
    }
 
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {

  
    // 8. Set the filtered data to the tableData.
    var filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    //key and value in line 85 ar elike in python dictionaries keys and values. 
    // the filters dictionary was until now blank. and it re-assigns it into the filtered data 
    //because it's getting each object inside data.js
    //and when it takes that it puts it inside the buildTable function.
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  // this line runs all the code
  d3.selectAll("input").on("change", updateFilters);
  //d3.select("ul").on('change', filterData);
  
  // Build the table when the page loads
  // that's how this tble the initial oine works 
  buildTable(tableData);

  
  // put simple variables and test every function with something like this 
  //var x = 10;
  //var y = x + 3;