var $photoUrlPreview = document.getElementById('placeholderImage');
var $newPhotoPreview = document.getElementById('photoUrl');

$newPhotoPreview.addEventListener('input', function (e) {
  $photoUrlPreview.setAttribute('src', e.target.value);
});
