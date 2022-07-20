var $photoUrlPreview = document.getElementById('placeholderImage');
var $newPhotoPreview = document.getElementById('photoUrl');
var $entryForm = document.querySelector('#entry-form');

$newPhotoPreview.addEventListener('input', function (e) {
  $photoUrlPreview.setAttribute('src', e.target.value);
});

$entryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var newObject = {};
  newObject.entryId = data.nextEntryId++;
  newObject.title = $entryForm.elements.title.value;
  newObject.photoUrl = $entryForm.elements.photoUrl.value;
  newObject.notes = $entryForm.elements.notes.value;
  document.getElementById('entry-form').reset();
  $photoUrlPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.entries.unshift(newObject);
});

function renderObject(data) {
  var liWrapper = document.createElement('li');
  liWrapper.setAttribute('class', 'no-bullets');
  liWrapper.setAttribute('class', 'li-space');

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  var imgTag = document.createElement('img');
  imgTag.setAttribute('src', data.photoUrl);
  imgTag.setAttribute('class', 'images');

  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.setAttribute('class', 'column-half');

  var entryTitle = document.createElement('h2');
  entryTitle.setAttribute('class', 'no-margin');
  entryTitle.textContent = data.title;

  var entryContent = document.createElement('p');
  entryContent.setAttribute('class', 'no-margin');

  entryContent.textContent = data.notes;

  liWrapper.appendChild(divRow);
  divRow.appendChild(columnHalf);
  columnHalf.appendChild(imgTag);
  divRow.appendChild(columnHalfTwo);
  columnHalfTwo.appendChild(entryTitle);
  columnHalfTwo.appendChild(entryContent);

  return liWrapper;
}

document.addEventListener('DOMContentLoaded', function (e) {
  var ulList = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntry = renderObject(data.entries[i]);
    ulList.appendChild(journalEntry);
  }
});

var $entriesButton = document.querySelector('.navbar-button');
var $hideNewEntry = document.querySelector('.entry-form', '.hidden');
var $hideEntries = document.querySelector('.entries', '.hidden');
var $newButton = document.querySelector('.a-button');
var $showNewEntry = document.querySelector('.entry-form');
var $showEntries = document.querySelector('.entries');
var $saveButton = document.querySelector('#entry-form');

$entriesButton.addEventListener('click', function (e) {
  e.preventDefault();
  $hideEntries.className = 'entries';
  $showNewEntry.className = 'entry-form hidden';
});

$newButton.addEventListener('click', function (e) {
  e.preventDefault();
  $hideNewEntry.className = 'entry-form';
  $showEntries.className = 'entries hidden';
});

$saveButton.addEventListener('submit', function (e) {
  e.preventDefault();
  var ulList = document.querySelector('ul');
  var newJournalEntry = renderObject(data.entries[0]);
  ulList.prepend(newJournalEntry);
  $hideEntries.className = 'entries';
  $showNewEntry.className = 'hidden';
});
