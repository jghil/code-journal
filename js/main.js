var $photoUrlPreview = document.getElementById('placeholderImage');
var $newPhotoPreview = document.getElementById('photoUrl');
var $entryForm = document.querySelector('#entry-form');
var $entryHeader = document.querySelector('.new-entry-title');
var $entriesButton = document.querySelector('.navbar-button');
var $hideNewEntry = document.querySelector('.entry-form', '.hidden', '.view');
var $hideEntries = document.querySelector('.entries', '.hidden');
var $newButton = document.querySelector('.a-button');
var $showNewEntry = document.querySelector('.entry-form');
var $showEntries = document.querySelector('.entries');
var $hideNoEntries = document.querySelector('.no-entries', '.hidden');
var $noEntries = document.querySelector('.no-entries');
var $deleteButtonHidden = document.querySelector('#delete-button', '.delete-hidden');
var $deleteButton = document.querySelector('#delete-button');
var $modalHidden = document.querySelector('.modal-container', '.hidden');
var $modal = document.querySelector('.modal-container');
var $cancelButton = document.querySelector('.cancel-button');
var $modalOverlay = document.querySelector('.modal-overlay');
var $modalOverlayHidden = document.querySelector('.modal-overlay', '.hidden');

$newPhotoPreview.addEventListener('input', function (e) {
  $photoUrlPreview.setAttribute('src', e.target.value);
});

$entryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (data.editing === null) {
    var newObject = {};
    newObject.entryId = data.nextEntryId++;
    newObject.title = $entryForm.elements.title.value;
    newObject.photoUrl = $entryForm.elements.photoUrl.value;
    newObject.notes = $entryForm.elements.notes.value;
    data.entries.unshift(newObject);
    var ulList = document.querySelector('ul');
    var newJournalEntry = renderObject(data.entries[0]);
    ulList.prepend(newJournalEntry);
  } else {
    var updatedObject = {};
    updatedObject.title = $entryForm.elements.title.value;
    updatedObject.photoUrl = $entryForm.elements.photoUrl.value;
    updatedObject.notes = $entryForm.elements.notes.value;
    updatedObject.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = updatedObject;
      }
    }
    var $liList = document.querySelectorAll('li');
    for (var liIndex = 0; liIndex < $liList.length; liIndex++) {
      if (data.editing.entryId === parseInt($liList[liIndex].getAttribute('data-entry-id'))) {
        var updatedEntry = renderObject(updatedObject);
        $liList[liIndex].replaceWith(updatedEntry);
      }
    }
  }
  $entryHeader.textContent = 'New Entry';
  $deleteButtonHidden.className = 'hidden-button delete-button';
  viewSwap('entries');
  document.getElementById('entry-form').reset();
  $photoUrlPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
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
  columnEdit.setAttribute('class', 'column-edit no-padding space-between');

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

$entriesButton.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('entries');
});

$newButton.addEventListener('click', function (e) {
  e.preventDefault();
  $entryHeader.textContent = 'New Entry';
  viewSwap('entry-form');
});

$deleteButton.addEventListener('click', function (e) {
  e.preventDefault();
  $modalHidden.className = 'modal-container';
  $modalOverlayHidden.className = 'modal-overlay';
});

$cancelButton.addEventListener('click', function (e) {
  e.preventDefault();
  $modal.className = 'modal-container hidden';
  $modalOverlay.className = 'modal-overlay hidden';

});
function viewSwap(dataView) {
  data.view = dataView;
  if (dataView === 'entry-form') {
    $showEntries.className = 'entries hidden';
    $hideNewEntry.className = 'entry-form view';
    $noEntries.className = 'no-entries hidden';
    $deleteButtonHidden.className = 'hidden-button delete-button';
    document.getElementById('entry-form').reset();
    $photoUrlPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
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
  if (e.target.tagName === 'I') {
    viewSwap('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      var $closestLi = e.target.closest('li');
      var $closestLiId = $closestLi.getAttribute('data-entry-id');
      var parsedId = parseInt($closestLiId);
      if (parsedId === data.entries[i].entryId) {
        data.editing = data.entries[i];
        $entryForm.elements.title.value = data.entries[i].title;
        $entryForm.elements.photoUrl.value = data.entries[i].photoUrl;
        $photoUrlPreview.setAttribute('src', $entryForm.elements.photoUrl.value);
        $entryForm.elements.notes.value = data.entries[i].notes;
      }
    }
    $deleteButtonHidden.className = 'delete-button';
    $entryHeader.textContent = 'Edit Entry';
  }
});
