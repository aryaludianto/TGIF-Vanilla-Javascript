

let stateAbb = [
  {
      "name": "Alabama",
      "abbreviation": "AL"
  },
  {
      "name": "Alaska",
      "abbreviation": "AK"
  },
  {
      "name": "American Samoa",
      "abbreviation": "AS"
  },
  {
      "name": "Arizona",
      "abbreviation": "AZ"
  },
  {
      "name": "Arkansas",
      "abbreviation": "AR"
  },
  {
      "name": "California",
      "abbreviation": "CA"
  },
  {
      "name": "Colorado",
      "abbreviation": "CO"
  },
  {
      "name": "Connecticut",
      "abbreviation": "CT"
  },
  {
      "name": "Delaware",
      "abbreviation": "DE"
  },
  {
      "name": "District Of Columbia",
      "abbreviation": "DC"
  },
  {
      "name": "Federated States Of Micronesia",
      "abbreviation": "FM"
  },
  {
      "name": "Florida",
      "abbreviation": "FL"
  },
  {
      "name": "Georgia",
      "abbreviation": "GA"
  },
  {
      "name": "Guam",
      "abbreviation": "GU"
  },
  {
      "name": "Hawaii",
      "abbreviation": "HI"
  },
  {
      "name": "Idaho",
      "abbreviation": "ID"
  },
  {
      "name": "Illinois",
      "abbreviation": "IL"
  },
  {
      "name": "Indiana",
      "abbreviation": "IN"
  },
  {
      "name": "Iowa",
      "abbreviation": "IA"
  },
  {
      "name": "Kansas",
      "abbreviation": "KS"
  },
  {
      "name": "Kentucky",
      "abbreviation": "KY"
  },
  {
      "name": "Louisiana",
      "abbreviation": "LA"
  },
  {
      "name": "Maine",
      "abbreviation": "ME"
  },
  {
      "name": "Marshall Islands",
      "abbreviation": "MH"
  },
  {
      "name": "Maryland",
      "abbreviation": "MD"
  },
  {
      "name": "Massachusetts",
      "abbreviation": "MA"
  },
  {
      "name": "Michigan",
      "abbreviation": "MI"
  },
  {
      "name": "Minnesota",
      "abbreviation": "MN"
  },
  {
      "name": "Mississippi",
      "abbreviation": "MS"
  },
  {
      "name": "Missouri",
      "abbreviation": "MO"
  },
  {
      "name": "Montana",
      "abbreviation": "MT"
  },
  {
      "name": "Nebraska",
      "abbreviation": "NE"
  },
  {
      "name": "Nevada",
      "abbreviation": "NV"
  },
  {
      "name": "New Hampshire",
      "abbreviation": "NH"
  },
  {
      "name": "New Jersey",
      "abbreviation": "NJ"
  },
  {
      "name": "New Mexico",
      "abbreviation": "NM"
  },
  {
      "name": "New York",
      "abbreviation": "NY"
  },
  {
      "name": "North Carolina",
      "abbreviation": "NC"
  },
  {
      "name": "North Dakota",
      "abbreviation": "ND"
  },
  {
      "name": "Northern Mariana Islands",
      "abbreviation": "MP"
  },
  {
      "name": "Ohio",
      "abbreviation": "OH"
  },
  {
      "name": "Oklahoma",
      "abbreviation": "OK"
  },
  {
      "name": "Oregon",
      "abbreviation": "OR"
  },
  {
      "name": "Palau",
      "abbreviation": "PW"
  },
  {
      "name": "Pennsylvania",
      "abbreviation": "PA"
  },
  {
      "name": "Puerto Rico",
      "abbreviation": "PR"
  },
  {
      "name": "Rhode Island",
      "abbreviation": "RI"
  },
  {
      "name": "South Carolina",
      "abbreviation": "SC"
  },
  {
      "name": "South Dakota",
      "abbreviation": "SD"
  },
  {
      "name": "Tennessee",
      "abbreviation": "TN"
  },
  {
      "name": "Texas",
      "abbreviation": "TX"
  },
  {
      "name": "Utah",
      "abbreviation": "UT"
  },
  {
      "name": "Vermont",
      "abbreviation": "VT"
  },
  {
      "name": "Virgin Islands",
      "abbreviation": "VI"
  },
  {
      "name": "Virginia",
      "abbreviation": "VA"
  },
  {
      "name": "Washington",
      "abbreviation": "WA"
  },
  {
      "name": "West Virginia",
      "abbreviation": "WV"
  },
  {
      "name": "Wisconsin",
      "abbreviation": "WI"
  },
  {
      "name": "Wyoming",
      "abbreviation": "WY"
  }
]

//data store from API
let members;

//URL for API will pass as argument to fetch function
const senate = "https://api.propublica.org/congress/v1/113/senate/members.json";
const house = "https://api.propublica.org/congress/v1/113/house/members.json";

//-------------Group of "display" function that will be pass as argument to fetch function
function data () {
  fillState()
  dispState()
}

function loyalty (members) {
  statFill(members)
  dispDataLoyalty()
}

function attendance (members) {
  statFill(members)
  dispDataAttendance()
}
//------------------------------------------------------------------------------------------



//----- fetch function placed on every pages in document ready-----------
function fetchData (type, dataURL) {
let URL = dataURL;
fetch(URL, { method:'GET', 
                   headers: { 'X-API-Key' : 'yDopPricaMTxYJvgYSF3d1dah1k2TlgaijneYq1G' }})
  .then(response => {
    if(response.ok){ 
      return response.json()
    } else throw new Error(response.statusText)
  }).then(data => {
      members = data.results[0].members;
      
      type(members)

  }).catch(error =>  {
    console.log('ERROR: ' + error.message)
  });   

}
//-------------------------------------------------------------------------
  


function dispSenat (member) {
  while(document.getElementById("senate-data").hasChildNodes())
  {
    document.getElementById("senate-data").removeChild(document.getElementById("senate-data").firstChild);
  }

  let senTab = document.getElementById("senate-data");
  let empRow = document.createElement("tr"),
      empCol = document.createElement("td"),
      empText = document.createTextNode("All data are filtered")

  member.forEach(data => {
    let row = document.createElement("tr"), 
      seniorText = data.seniority == 1 && (data.seniority + " year") || (data.seniority + " years"),
      text = [fullName = nameVal(data), party =  document.createTextNode(data.party),
        state = document.createTextNode(data.state), seniority = document.createTextNode(seniorText), 
        votes = document.createTextNode(data.votes_with_party_pct + "%")]
    
      text.forEach(text => {
        
        let col = document.createElement("td");
        col.appendChild(text);
        return row.appendChild(col)
      })
      
    return senTab.appendChild(row) 
  })
  if(member.length === 0 ) senTab.appendChild(empRow.appendChild(empCol.appendChild(empText)))
}


//name validation---------------------------------
function nameVal (data) {
  let first_name = data.first_name || '',
      middle_name = data.middle_name || '', 
      last_name= data.last_name || '', 
      full_name = !middle_name && (last_name + " " + first_name) || (last_name + " "+ first_name +" " + middle_name),
      linkedName = document.createTextNode(full_name),
      link = document.createElement('a');
  
    link.appendChild(linkedName);
    link.title = full_name;
    link.href = data.url;
    link.target = "_blank";
    
  return link;
}

// display state in the state selection-------
function dispState () {
  let selState = document.getElementById("state");

  stateAbb.forEach(state => {
    let opt = document.createElement("option"),
    stateSelect = document.createTextNode(state.name);
    opt.appendChild(stateSelect);
    opt.value = state.abbreviation;

    return selState.appendChild(opt);

  })
}

// ---filter data by state ------
function fillState () {
  let selectedState = document.getElementById("state"),
  data;

  if( selectedState.value === "all"){
    data = members;
  } else {
   data = members.filter(data=> {
   return data.state === selectedState.value
  });
}
 return fillParty(data);

}

//-----Filter data by party 

function fillParty (data) {
  let rep = document.getElementById("checkRep"),
    dem = document.getElementById("checkDem"),
    ind = document.getElementById("checkInd"),
    dataDisp, tempData=[], tempArr=[rep,dem,ind];

    if(!rep.checked && !dem.checked && !ind.checked || rep.checked && dem.checked && ind.checked){
      dataDisp = data;
    } else if (ind.checked || dem.checked || rep.checked) {
      tempData = [];
      data.filter(member => tempArr.forEach(arr => { if(arr.checked){
      if (member.party === arr.value) tempData.push(member) }}));
      dataDisp = tempData;
    }

   return dispSenat(dataDisp)

}




