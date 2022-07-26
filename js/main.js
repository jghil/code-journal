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
  var ulList = document.querySelector('ul');
  var newJournalEntry = renderObject(data.entries[0]);
  ulList.prepend(newJournalEntry);
  viewSwap('entries');
});

function renderObject(data) {
  var liWrapper = document.createElement('li');
  liWrapper.setAttribute('class', 'no-bullets');
  liWrapper.setAttribute('class', 'li-space');
  liWrapper.setAttribute('data-entry-id', data.entryId);

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  var imgTag = document.createElement('img');
  imgTag.setAttribute('src', data.photoUrl);
  imgTag.setAttribute('class', 'images');

  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.setAttribute('class', 'column-half');

  var columnEdit = document.createElement('div');
  columnEdit.setAttribute('class', 'column-edit no-padding new-button');

  var editRow = document.createElement('div');
  editRow.setAttribute('class', 'row');

  var entryTitle = document.createElement('h2');
  entryTitle.setAttribute('class', 'no-margin');
  entryTitle.textContent = data.title;

  var editIconAnchor = document.createElement('a');
  editIconAnchor.setAttribute('href', '#entry-form');
  editIconAnchor.setAttribute('class', 'edit-icon');

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fa-solid fa-pen');
  editIcon.setAttribute('data-entryId', data.entryId);
  // <i class="fa-solid fa-pen"></i>

  var entryContent = document.createElement('p');
  entryContent.setAttribute('class', 'no-margin');

  entryContent.textContent = data.notes;
  // <li class="no-bullets li-space">
  //  <div class="row">
  //    <div class="column-half">
  //      <imgTag src="data.photoUrl" class="images">
  //    </div>
  //   <div class="columnHalfTwo">
  //     <div class="row">
  //       <div class="column-nine">
  //          <h2 class="no-margin"></h2>
  //       </div>
  //       <div class="column-one">
  //         <i class="fa-solid fa-pen"><a href="#entry-form" class="edit-icon"></a></i>
  //     </div>
  //     <p class="no-margin">
  liWrapper.appendChild(divRow);
  divRow.appendChild(columnHalf);
  columnHalf.appendChild(imgTag);
  divRow.appendChild(columnHalfTwo);
  columnHalfTwo.appendChild(editRow);
  editRow.appendChild(columnEdit);
  columnEdit.appendChild(entryTitle);
  columnEdit.appendChild(editIconAnchor);
  editIconAnchor.appendChild(editIcon);
  columnHalfTwo.appendChild(entryContent);

  return liWrapper;

}
var $entriesButton = document.querySelector('.navbar-button');
var $hideNewEntry = document.querySelector('.entry-form', '.hidden', '.view');
var $hideEntries = document.querySelector('.entries', '.hidden');
var $newButton = document.querySelector('.a-button');
var $showNewEntry = document.querySelector('.entry-form');
var $showEntries = document.querySelector('.entries');
var $hideNoEntries = document.querySelector('.no-entries', '.hidden');
var $noEntries = document.querySelector('.no-entries');

$entriesButton.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('entries');
});

$newButton.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('entry-form');
});

function viewSwap(dataView) {
  data.view = dataView;
  if (dataView === 'entry-form') {
    $showEntries.className = 'entries hidden';
    $hideNewEntry.className = 'entry-form view';
    $noEntries.className = 'no-entries hidden';
  } else if (dataView === 'entries') {
    if (data.entries.length === 0) {
      $hideNoEntries.className = 'no-entries';
      $showNewEntry.className = 'entry-form hidden';
      $hideEntries.className = 'entries';
    } else if (data.entries.length > 0) {
      $noEntries.className = 'no-entries hidden';
      $hideEntries.className = 'entries';
      $showNewEntry.className = 'entry-form hidden';
    }
  }
}

document.addEventListener('DOMContentLoaded', function (e) {
  var ulList = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntry = renderObject(data.entries[i]);
    ulList.appendChild(journalEntry);
  }
  viewSwap(data.view);
});

document.getElementById('entry-list').addEventListener('click', function (e) {
  if (e.target && e.target.nodeName === 'I') {
    var $closestLi = e.target.closest('li');
    var $closestLiId = $closestLi.getAttribute('data-entry-id');
    var parsedId = parseInt($closestLiId);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parsedId);
      data.editing = data.entries[i];
      viewSwap('entry-form');
    }
  }
});
