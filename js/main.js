var $photoUrlPreview = document.getElementById('placeholderImage');
var $newPhotoPreview = document.getElementById('photoUrl');
var $entryForm = document.querySelector('#entry-form');

$newPhotoPreview.addEventListener('input', function (e) {
  $photoUrlPreview.setAttribute('src', e.target.value);
});

$entryForm.addEventListener('submit', function (e) {
  event.preventDefault();
  var newObject = {};
  newObject.entryId = data.nextEntryId++;
  newObject.title = $entryForm.elements.title.value;
  newObject.photoUrl = $entryForm.elements.photoUrl.value;
  newObject.notes = $entryForm.elements.notes.value;
  document.getElementById('entry-form').reset();
  $photoUrlPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.entries.unshift(newObject);
});
