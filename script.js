document.addEventListener('DOMContentLoaded', function() {
    const tips = [
        "Golden hour is 1hr after sunrise/1hr before sunset for landscapes",
        "Portrait aperture: f/1.8-f/4 for nice background blur",
        "Use burst mode for street photography to get better shots"
    ];
    const tipsBtn = document.getElementById('tips-btn');
    const tipsBox = document.getElementById('tips-box');
    const tipText = document.getElementById('tip-text');

    tipsBtn.addEventListener('click', function() {
        if (tipsBox.style.display === 'none') {
            tipsBox.style.display = 'block';
            tipsBtn.textContent = 'Hide Tips';
            const randomIndex = Math.floor(Math.random() * tips.length);
            tipText.textContent = tips[randomIndex];
        } else {
            tipsBox.style.display = 'none';
            tipsBtn.textContent = 'Show Photography Tips';
        }
    });

    const photoUpload = document.getElementById('photo-upload');
    const previewBox = document.getElementById('preview-box');
    const previewImg = document.getElementById('preview-img');

    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            previewBox.style.display = 'block';
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImg.src = event.target.result;
                previewImg.alt = 'Preview of your photo';
            }
            reader.readAsDataURL(file);
        } else {
            previewBox.style.display = 'none';
            previewImg.src = '';
        }
    });

    const photoForm = document.getElementById('photo-form');
    const galleryContainer = document.getElementById('gallery-container');
    const emptyMsg = document.querySelector('.empty-msg');

    photoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const photoType = document.getElementById('photo-type').value;
        const cameraType = document.querySelector('input[name="camera"]:checked').value;
        const photoFile = photoUpload.files[0];

        if (photoFile) {
            emptyMsg.style.display = 'none';
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';

            const img = document.createElement('img');
            const reader = new FileReader();
            reader.onload = function(event) {
                img.src = event.target.result;
                img.alt = username + "'s photography work";
            }
            reader.readAsDataURL(photoFile);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'photo-info';
            infoDiv.innerHTML = `<p><strong>Photographer:</strong> ${username}</p>
                                 <p><strong>Type:</strong> ${photoType.charAt(0).toUpperCase() + photoType.slice(1)}</p>
                                 <p><strong>Camera:</strong> ${cameraType === 'digital' ? 'Digital Camera' : 'Smartphone'}</p>`;

            photoCard.appendChild(img);
            photoCard.appendChild(infoDiv);
            galleryContainer.appendChild(photoCard);

            alert('Your work is submitted successfully!');
            photoForm.reset();
            previewBox.style.display = 'none';
            previewImg.src = '';
        } else {
            alert('Please upload a photo first!');
        }
    });

    photoForm.addEventListener('reset', function() {
        previewBox.style.display = 'none';
        previewImg.src = '';
    });
});
