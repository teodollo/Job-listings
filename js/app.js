let newData = "";
fetch('js/data.json')
.then(function(resp) {
    return resp.json();
})
.then(function(data) {
    newData = data;
    data.forEach(job => {
    createJobs(job.logo, job.company, job.new, job.featured, job.position, job.postedAt, job.contract, job.location, job.languages, job.tools);
})
})


const jobs = document.getElementById('jobs');



function createJobs(img, company, now, featured, position, day, time, location, tag, tool ) {
  const ul = document.createElement('UL');
  ul.id = 'job-listings';

  const listing = document.createElement('UL');
  listing.id = 'listing';

  const listImg = document.createElement('LI');
  listImg.id = "list-img"
  const image = document.createElement('IMG');
  image.src = img;
  listImg.appendChild(image);
  listing.appendChild(listImg);

  const listHead = document.createElement('LI');
  listHead.id = 'list-head';

  const companyName = document.createElement('P');
  companyName.id = 'company-name'
  companyName.innerHTML = company;
  listHead.appendChild(companyName);

  const newPost = document.createElement('P');
  newPost.id = 'new';
  newPost.innerHTML = 'NEW!';
  listHead.appendChild(newPost)
  if (now === true) {
      newPost.style.display = 'block';
  } else {
      newPost.style.display = 'none';
  }

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
  
  const jobRole = document.createElement('LI');
  jobRole.id = 'job-role';
  jobRole.innerHTML = position;
  listing.appendChild(jobRole)

  const jobInfo = document.createElement('LI');
  jobInfo.id = 'job-info';
  const posted = document.createElement('P');
  posted.id = 'posted';
  posted.innerHTML = day;
  jobInfo.appendChild(posted);
  const contract = document.createElement('P');
  contract.id = 'contract';
  contract.innerHTML = time;
  jobInfo.appendChild(contract);
  const place = document.createElement('P');
  place.id = 'location';
  place.innerHTML = location;
  jobInfo.appendChild(place);
  listing.appendChild(jobInfo);

  ul.appendChild(listing);

  const filterTags = document.createElement('UL');
  filterTags.id = 'filter-tags';
  tag.forEach(tags => {
      const tagLi = document.createElement('LI');
      tagLi.className = 'tag';
      tagLi.innerHTML = tags;
      filterTags.appendChild(tagLi);
  })

  tool.forEach(tol => {
    const toolLi = document.createElement('LI');
    toolLi.className = 'tag';
    toolLi.innerHTML = tol;
    filterTags.appendChild(toolLi);
  })

  ul.appendChild(filterTags);
  jobs.appendChild(ul);
}