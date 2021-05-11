
//-------------JSON---------------//

fetch('js/data.json')
.then(function(resp) {
    return resp.json();
})
.then(function(data) {
    data.forEach(job => {
    createJobs(job.logo, job.company, job.new, job.featured, job.position, job.postedAt, job.contract, job.location, job.languages, job.tools);
})
})

//-----test area


//-------------DOM ELEMENTS-----------------//

const jobs = document.getElementById('jobs');
const filters = document.getElementById('filters')
const filterTags = document.getElementById('filter-tags')
const filterButtons = document.getElementById('filter-buttons')

let filterArray = [];
//-------------EVENT LISTENERS----------------------//

//Add Buttons To Filter Depending On Language/Tool Clicked On


jobs.addEventListener('click', (e) => {

    createFilterButton(e);
})

//Remove Button if single button is clicked. Remove all buttons if clear is clicked
filters.addEventListener('click', (e) => {
    removeFilterButtons(e)
    //making every job visible before checking filters
    for (let i = 0; i <jobs.children.length; i++) {
        jobs.children[i].style.display = 'grid';
    }
    checkForMatchingFilter();
})


jobs.addEventListener('click', e => {
    checkForMatchingFilter();


})



//---------------------------FUNCTIONS--------------------------------//

//------------------Create Job List Items

function createJobs(img, company, now, featured, position, day, time, location, tag, tool ) {
  //The job listing created  
  const ul = document.createElement('UL');
  ul.id = 'job-listings';
  
  //listing information
  const listing = document.createElement('UL');
  listing.id = 'listing';
  
  //list image
  const listImg = document.createElement('LI');
  listImg.id = "list-img"
  const image = document.createElement('IMG');
  image.src = img;
  listImg.appendChild(image);
  listing.appendChild(listImg);
  
  //List head that holds company new and featured
  const listHead = document.createElement('LI');
  listHead.id = 'list-head';
  //Company Name
  const companyName = document.createElement('P');
  companyName.id = 'company-name'
  companyName.innerHTML = company;
  listHead.appendChild(companyName);
  //New! Bubble
  const newPost = document.createElement('P');
  newPost.id = 'new';
  newPost.innerHTML = 'NEW!';
  listHead.appendChild(newPost)
  if (now === true) {
      newPost.style.display = 'block';
  } else {
      newPost.style.display = 'none';
  }
  //Featured Bubble
  const feature = document.createElement('P');
  feature.id = 'featured';
  feature.innerHTML = 'FEATURED';
  listHead.appendChild(feature);
  if (featured === true) {
    feature.style.display = 'block';
} else {
    feature.style.display = 'none';
}
  listing.appendChild(listHead)
  
  //Job Role
  const jobRole = document.createElement('LI');
  jobRole.id = 'job-role';
  jobRole.innerHTML = position;
  listing.appendChild(jobRole)
  
  //Info About Job
  const jobInfo = document.createElement('LI');
  jobInfo.id = 'job-info';
  //Time of Posting
  const posted = document.createElement('P');
  posted.id = 'posted';
  posted.innerHTML = day;
  jobInfo.appendChild(posted);
  //Full time or Part Time
  const contract = document.createElement('P');
  contract.id = 'contract';
  contract.innerHTML = time;
  jobInfo.appendChild(contract);
  //Location of Job
  const place = document.createElement('P');
  place.id = 'location';
  place.innerHTML = location;
  jobInfo.appendChild(place);
  listing.appendChild(jobInfo);

  ul.appendChild(listing);
  
  //Tags with Programming Languages
  const filterTags = document.createElement('UL');
  filterTags.id = 'filter-tags';
  tag.forEach(tags => {
      const tagLi = document.createElement('LI');
      tagLi.className = 'tag';
      tagLi.innerHTML = tags;
      filterTags.appendChild(tagLi);
  })
  
  //Tags with Programming Tools
  tool.forEach(tol => {
    const toolLi = document.createElement('LI');
    toolLi.className = 'tag';
    toolLi.innerHTML = tol;
    filterTags.appendChild(toolLi);
  })

  ul.appendChild(filterTags);
  jobs.appendChild(ul);
}


//----create filter buttons in the filter menu

const createFilterButton = (e) => {
    if (e.target.className === 'tag') {
        if (!filterArray.includes(e.target.textContent)) {
            filters.style.display = 'grid';
            const button = document.createElement('BUTTON');
            button.textContent = e.target.textContent;

            filterArray.push(e.target.textContent)
            const img = document.createElement('IMG')
            img.src = './images/icon-remove.svg';
            button.appendChild(img);
            button.className = 'filter'
            filterButtons.appendChild(button)
        }
    };

};

//----Remove Button Or Clear All Buttons

const removeFilterButtons = e => {
    if (e.target.id === 'clear') {
        while (filterButtons.firstChild) {
            filterButtons.removeChild(filterButtons.lastChild);
            filterArray = [];
          }
    };
    if (e.target.className === 'filter' ) {
        let arrayIndex = filterArray.indexOf(e.target.textContent)
        filterArray.splice(arrayIndex, 1)
        filterButtons.removeChild(e.target)

    }
    if (e.target.nodeName === 'IMG') {
        let arrayIndex = filterArray.indexOf(e.target.parentNode.textContent)
        filterArray.splice(arrayIndex, 1)
        filterButtons.removeChild(e.target.parentNode)
    }
    if (filterButtons.children.length === 0) {
        filters.style.display = 'none';
    }
}

//--------------Checking if job listing matches filters set

const checkForMatchingFilter = () => {
    for (let i = 0; i < jobs.children.length; i++) {
        let jobArray = [];
        for (let z = 0; z < jobs.children[i].children[1].children.length; z++) {
            jobArray.push(jobs.children[i].children[1].children[z].textContent)

        }
        for (let c = 0; c < filterArray.length; c++) {
            if (!jobArray.includes(filterArray[c])) {
                jobs.children[i].style.display = 'none';
            }
        }

    }
}