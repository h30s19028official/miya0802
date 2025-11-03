let currentUser = null;
let sharingStream = null;

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (
    (username === "User1" && password === "pass1") ||
    (username === "User2" && password === "pass2")
  ) {
    currentUser = username;
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");

    if (currentUser === "User1") {
      document.getElementById("camera-toggle").classList.remove("hidden");
      document.getElementById("placeholder-image").classList.remove("hidden");
    }
  } else {
    alert("ユーザー名またはパスワードが違います");
  }
}

async function toggleCamera() {
  const cameraIcon = document.getElementById("camera-toggle");
  const sharedContent = document.getElementById("shared-content");
  const placeholderImage = document.getElementById("placeholder-image");
  const audio = document.getElementById("background-audio");

  if (!sharingStream) {
    try {
      sharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true // ← ここで音声も共有
      });

      const video = document.createElement("video");
      video.srcObject = sharingStream;
      video.autoplay = true;
      video.playsInline = true;
      video.style.width = "100%";
      video.style.height = "100%";

      sharedContent.innerHTML = "";
      sharedContent.appendChild(video);

      placeholderImage.classList.add("hidden");
      sharedContent.classList.remove("hidden");
      audio.pause();
      audio.currentTime = 0;
    } catch (err) {
      console.error("画面共有に失敗しました", err);
    }
  } else {
    // 停止処理
    sharingStream.getTracks().forEach(track => track.stop());
    sharingStream = null;

    sharedContent.classList.add("hidden");
    placeholderImage.classList.remove("hidden");
    audio.play();
  }
}
