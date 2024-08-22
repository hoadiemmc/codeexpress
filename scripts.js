//▶️.........................................................................................
// Đặt hình nền dựa trên thời gian trong ngày
function setBackground() {
  const hour = new Date().getHours();
  const morningImages = [
    'https://i.pinimg.com/564x/06/17/eb/0617eb2ca420af4bd19c0edc1aa4d197.jpg',
    'https://i.pinimg.com/736x/72/df/bb/72dfbb8d686ce65928271ae4d9ee9270.jpg',
    'https://i.pinimg.com/736x/45/26/9c/45269cc2ef30591880daa922205b4f24.jpg',
    'https://i.pinimg.com/736x/98/f0/c6/98f0c6cb82a067853c926d40c4412f98.jpg',
    'https://i.pinimg.com/736x/2f/37/44/2f3744ba0633ff5be876bdfb9f4ea626.jpg'
  ];
  const noonImages = [
    'https://i.pinimg.com/564x/a7/df/ac/a7dfacfb122e95be311707a298f0912f.jpg'
  ];
  const afternoonImages = [
    'https://i.pinimg.com/736x/67/64/77/676477c762a633e25580fdb336918138.jpg',
    'https://i.pinimg.com/564x/6b/d3/b4/6bd3b4412d3286b10f0aa7dc0305214f.jpg',
    'https://i.pinimg.com/564x/8e/80/7d/8e807daec2c464fa00290099e5e04727.jpg',
    'https://i.pinimg.com/564x/6e/24/ad/6e24ad3f5e757f975d519b9b52fa487f.jpg',
    'https://i.pinimg.com/564x/b5/56/3e/b5563e939050c0fefcc0f4a1b8e61567.jpg'
  ];
  const nightImages = [
    'https://i.pinimg.com/564x/64/a2/12/64a2120f6f9067d27e93dbe5f7b4e710.jpg',
    'https://i.pinimg.com/564x/88/36/f0/8836f03a9f84f71957a1ed477d4236a8.jpg',
    'https://i.pinimg.com/564x/07/6f/fd/076ffd4b558b8c5208872b51a7fa226f.jpg',
    'https://i.pinimg.com/564x/6f/51/47/6f5147e8ec30b18e753608808c8660b7.jpg',
    'https://i.pinimg.com/564x/6a/7d/0a/6a7d0aa73190902397a25b541b14831e.jpg'
  ];

  const randomImage = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let images;
  if (hour >= 6 && hour < 12) {
    images = morningImages;
  } else if (hour >= 12 && hour < 14) {
    images = noonImages;
  } else if (hour >= 14 && hour < 18) {
    images = afternoonImages;
  } else {
    images = nightImages;
  }

  const backgroundUrl = randomImage(images);
  document.getElementById('background').style.backgroundImage = `url(${backgroundUrl})`;
  document.getElementById('content-box').style.backgroundImage = `url(${backgroundUrl})`;
  document.getElementById('content-box').style.backgroundBlendMode = 'multiply';
}

// Cập nhật màu chữ cho phiên bản di động
function updateTextColorForMobile() {
  const hour = new Date().getHours();
  let textColor;
  if (hour >= 6 && hour < 12) {
    textColor = 'text-blue-900';
  } else if (hour >= 12 && hour < 18) {
    textColor = 'text-orange-800';
  } else {
    textColor = 'text-white';
  }
  document.getElementById('header-text').className = `text-4xl font-extrabold tracking-wide mb-2 animate-pulse ${textColor}`;
}

// Đặt nền video ngẫu nhiên cho phiên bản desktop
function setBackgroundForDesktop() {
  const desktopVideos = [
    'https://videos.pexels.com/video-files/5155396/5155396-uhd_2560_1440_30fps.mp4',
    'https://cdn.pixabay.com/video/2021/10/10/91562-629172467_large.mp4',
    'https://cdn.pixabay.com/video/2019/04/03/22555-328624767_large.mp4',
    'https://cdn.pixabay.com/video/2017/06/28/10339-865412856_large.mp4',
    'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/3129595/3129595-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/9667568/9667568-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/10613972/10613972-hd_1920_1080_24fps.mp4',
    'https://videos.pexels.com/video-files/4153410/4153410-uhd_2560_1440_25fps.mp4'
  ];

  const randomVideo = desktopVideos[Math.floor(Math.random() * desktopVideos.length)];
  const videoElement = document.createElement('video');
  videoElement.setAttribute('autoplay', true);
  videoElement.setAttribute('loop', true);
  videoElement.setAttribute('muted', true);
  videoElement.setAttribute('playsinline', true);
  videoElement.setAttribute('id', 'background-video');
  videoElement.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'object-cover', 'z-0');
  videoElement.src = randomVideo;

  document.body.prepend(videoElement);
}

// Cập nhật màu chữ cho phiên bản desktop
function updateTextColorForDesktop() {
  const videoElement = document.getElementById('background-video');
  const textColor = videoElement.currentTime < videoElement.duration / 2 ? 'text-white' : 'text-black';
  document.getElementById('header-text').className = `text-4xl font-extrabold tracking-wide mb-2 animate-pulse ${textColor}`;
}

// Kiểm tra thiết bị di động hay desktop
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Khởi tạo và chọn nền phù hợp
function init() {
  if (isMobile()) {
    setBackground(); // Phiên bản di động dùng hình nền
    updateTextColorForMobile(); // Cập nhật màu chữ cho di động
  } else {
    setBackgroundForDesktop(); // Phiên bản desktop dùng video nền
    updateTextColorForDesktop(); // Cập nhật màu chữ cho desktop
    setInterval(updateTextColorForDesktop, 1000); // Cập nhật màu chữ mỗi giây theo video
  }
}

// Gọi hàm khởi tạo khi trang được tải
init();


//▶️
// Nạp data từ sheet
document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/11kBQljwc9_x3cEJak1sRB6c_aUWFhlvXVVDnMGtDRwE/values:batchGet?ranges=M%E1%BA%ABu&ranges=3E101&ranges=3E107&ranges=3E113&key=AIzaSyBnJE88L26osSH-KX1xXRrL5VhGTR-2q1Q';
    const notification = document.getElementById('notification');
    const successSound = document.getElementById('success-sound');
    const errorSound = document.getElementById('error-sound');

    // Fetch data from Google Sheets API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data); // Log the data for debugging
            const rows = data.valueRanges.flatMap(range => range.values);
            
            if (rows.length === 0) {
                throw new Error('No data found');
            }
            
            // Store data in localStorage
            localStorage.setItem('sheetData', JSON.stringify(rows));

            // Play success sound
            successSound.play();

            // Show notification
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.style.transition = 'opacity 2s';
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.classList.add('hidden');
                    notification.style.opacity = '1'; // Reset opacity for future notifications
                }, 2000);
            }, 3000);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            errorSound.play();

            // Show error notification
            notification.textContent = 'Lỗi: Không thể tải dữ liệu';
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.style.transition = 'opacity 2s';
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.classList.add('hidden');
                    notification.style.opacity = '1'; // Reset opacity for future notifications
                }, 2000);
            }, 3000);
        });
});


//▶️
document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('input-field');
    const successNotification = document.getElementById('success-notification');
    const errorNotification = document.getElementById('error-notification');
    const successOverlay = document.getElementById('success-overlay');
    const errorOverlay = document.getElementById('error-overlay');
    const errorSound = document.getElementById('error-sound');
    const okButton = document.getElementById('ok-button');

    const successSounds = [
        document.getElementById('success-sound1'),
        document.getElementById('success-sound2'),
        document.getElementById('success-sound3'),
        document.getElementById('success-sound4'),
        document.getElementById('success-sound5')
    ];

    let variableA = ''; 
    let variableB = ''; 
    let isVariableAActive = false;
    let isErrorNotificationVisible = false; 
    let enterPressCount = 0; 
    let successCount = 0; 
    let currentDisplay = 'overlay';

    // Load data from localStorage
    const loadData = () => {
        const storedData = localStorage.getItem('sheetData');
        if (storedData) {
            return JSON.parse(storedData);
        }
        return [];
    };

    // Function to handle Enter key press on the input field
    function handleEnterKey(event) {
        if (event.key === 'Enter' && !isErrorNotificationVisible) {
            event.preventDefault();
            const inputValue = inputField.value.trim();

            if (inputValue) {
                if (isVariableAActive) {
                    variableB = variableA;
                    variableA = inputValue;
                    console.log('Variable A updated to:', variableA);
                } else {
                    variableA = inputValue;
                    isVariableAActive = true;
                    console.log('Variable A set to:', variableA);
                }
                
                inputField.value = ''; 
                searchInData(variableA);
            }
        }
    }

    // Function to search for the code in stored data
    function searchInData(code) {
        const data = loadData();
        let codeFound = false;

        console.log('Searching for code:', code);

        data.forEach(row => {
            if (row.includes(code)) {
                codeFound = true;
            }
        });

        if (codeFound) {
            successCount = (successCount % 5) + 1;
            console.log('Success count:', successCount);

            successSounds[successCount - 1].play();
            console.log('Code found:', code);
            showSuccessNotification();
        } else {
            errorSound.play();
            console.log('Code not found:', code);
            showNotification('error');
            inputField.blur(); // Blur the input field when showing error notification
        }
    }

    // Function to show success notifications alternately
    function showSuccessNotification() {
        if (currentDisplay === 'overlay') {
            successOverlay.classList.add('hidden');
            successOverlay.style.opacity = '1';

            successNotification.classList.remove('hidden');
            successNotification.style.opacity = '1';
            currentDisplay = 'notification';

            setTimeout(() => {
                successNotification.style.transition = 'opacity 2s';
                successNotification.style.opacity = '0';

                setTimeout(() => {
                    successNotification.classList.add('hidden');
                    successNotification.style.opacity = '1';
                }, 500);
            }, 500);
        } else {
            successNotification.classList.add('hidden');
            successNotification.style.opacity = '1';

            successOverlay.classList.remove('hidden');
            successOverlay.style.opacity = '1';
            currentDisplay = 'overlay';

            setTimeout(() => {
                successOverlay.style.transition = 'opacity 2s';
                successOverlay.style.opacity = '0';

                setTimeout(() => {
                    successOverlay.classList.add('hidden');
                    successOverlay.style.opacity = '1';
                }, 500);
            }, 500);
        }
    }

    // Function to show notifications
    function showNotification(type) {
        if (type === 'error') {
            errorOverlay.classList.remove('hidden');
            errorNotification.classList.remove('hidden');
            isErrorNotificationVisible = true; 
            enterPressCount = 0; 

            // Add click event listener to error notification
            errorNotification.addEventListener('click', function() {
                alert('You clicked the error notification!');
                hideNotification(); 
            });

            // Add a global click event to unfocus the input field when clicking outside
            document.addEventListener('click', handleDocumentClick);
        }
    }

    // Function to hide notifications
    function hideNotification() {
        errorOverlay.classList.add('hidden');
        errorNotification.classList.add('hidden');
        isErrorNotificationVisible = false; 

        // Remove the global click event to unfocus the input field
        document.removeEventListener('click', handleDocumentClick);

        // Refocus the input field after error notification is hidden
        inputField.focus();
    }

    // Function to handle clicks outside the input field
    function handleDocumentClick(event) {
        if (!inputField.contains(event.target) && isErrorNotificationVisible) {
            inputField.blur();
        }
    }

    // Attach event listener to the input field
    inputField.addEventListener('keydown', handleEnterKey);

    // Attach event listener to the OK button
    okButton.addEventListener('click', hideNotification);

    // Attach global event listener for Enter key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && isErrorNotificationVisible) {
            event.preventDefault();
            enterPressCount++;

            if (enterPressCount >= 2) {
                hideNotification();
            }
        }
    });
});




//▶️

//▶️

//▶️
//▶️
//▶️
//▶️
//▶️
