/* =========================================================
   SCRIPT ANTI-BULLYING & KEBERSIHAN LINGKUNGAN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Web Audio API Sound Generator
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }

  // 1. Custom Cursor
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");

  window.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;

    cursorOutline.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 250, fill: "forwards" });
  });

  document.querySelectorAll("button, a, input, label, .click-box").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  // 2. Custom Background dari Galeri (Local File Reader)
  const customBgInput = document.getElementById("customBgInput");
  const bgCustomImage = document.getElementById("bgCustomImage");

  customBgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      bgCustomImage.style.backgroundImage = `url('${url}')`;
      playClickSound();
    }
  });

  // 3. Dark/Light Mode + Page Transition Overlay
  const themeToggle = document.getElementById("themeToggle");
  const pageTransition = document.getElementById("pageTransition");

  themeToggle.addEventListener("click", () => {
    playClickSound();
    pageTransition.classList.add("active");

    setTimeout(() => {
      document.body.classList.toggle("light-mode");
      document.body.classList.toggle("dark-mode");
    }, 250);

    setTimeout(() => pageTransition.classList.remove("active"), 500);
  });

  // 4. Animasi Kotak Teks Pas Diklik (Confetti + Sound + Pulse Effect)
  document.querySelectorAll(".click-box").forEach(box => {
    box.addEventListener("click", (e) => {
      playClickSound();

      // Tambahkan kelas animasi klik
      box.classList.add("box-clicked");
      setTimeout(() => box.classList.remove("box-clicked"), 400);

      // Efek Confetti / Burst kecil di lokasi klik
      const rect = box.getBoundingClientRect();
      const x = (e.clientX || (rect.left + rect.width / 2)) / window.innerWidth;
      const y = (e.clientY || (rect.top + rect.height / 2)) / window.innerHeight;

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x, y },
        colors: ['#00d2ff', '#0066ff', '#00f0ff', '#ffffff']
      });
    });
  });

  // 5. Navigation: Transisi ke "Menjaga Kebersihan Lingkungan"
  const pageBullying = document.getElementById("pageBullying");
  const pageEnvironment = document.getElementById("pageEnvironment");
  const btnNextPage = document.getElementById("btnNextPage");
  const btnPrevPage = document.getElementById("btnPrevPage");

  function switchPage(hidePage, showPage) {
    playClickSound();
    pageTransition.classList.add("active");

    setTimeout(() => {
      hidePage.classList.add("hidden");
      showPage.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleScroll();
    }, 250);

    setTimeout(() => pageTransition.classList.remove("active"), 500);
  }

  btnNextPage.addEventListener("click", () => switchPage(pageBullying, pageEnvironment));
  btnPrevPage.addEventListener("click", () => switchPage(pageEnvironment, pageBullying));

  // 6. Text Scramble Animation pada Logo
  const logoText = document.getElementById("logoText");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function scrambleText(element) {
    let iteration = 0;
    const text = element.dataset.scramble;
    clearInterval(element.interval);

    element.interval = setInterval(() => {
      element.innerText = text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");

      if (iteration >= text.length) clearInterval(element.interval);
      iteration += 1 / 3;
    }, 30);
  }

  logoText.addEventListener("mouseenter", () => scrambleText(logoText));

  // 7. Magnetic Buttons
  document.querySelectorAll(".magnetic-btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });

  // 8. Ripple & Button Morph Effect
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".ripple-btn, .btn");
    if (target) {
      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const rect = target.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple");

      const prevRipple = target.querySelector(".ripple");
      if (prevRipple) prevRipple.remove();

      target.appendChild(circle);

      if (target.classList.contains("morph-btn")) {
        target.classList.add("morphing");
        setTimeout(() => target.classList.remove("morphing"), 300);
      }
    }
  });

  // 9. Scroll Reveal Animation
  const handleScroll = () => {
    document.querySelectorAll(".scroll-reveal").forEach(el => {
      if (el.getBoundingClientRect().top <= window.innerHeight / 1.15) {
        el.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 10. Command Palette (Ctrl+K)
  const cmdOverlay = document.getElementById("cmdOverlay");
  const cmdPaletteBtn = document.getElementById("cmdPaletteBtn");
  const cmdInput = document.getElementById("cmdInput");

  cmdPaletteBtn.addEventListener("click", () => {
    cmdOverlay.classList.remove("hidden");
    cmdInput.focus();
  });

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      cmdOverlay.classList.toggle("hidden");
      if (!cmdOverlay.classList.contains("hidden")) cmdInput.focus();
    }
    if (e.key === "Escape") cmdOverlay.classList.add("hidden");
  });

  document.querySelectorAll("#cmdList li").forEach(li => {
    li.addEventListener("click", () => {
      const act = li.dataset.action;
      cmdOverlay.classList.add("hidden");
      if (act === "theme") themeToggle.click();
      if (act === "custombg") customBgInput.click();
      if (act === "next") switchPage(pageBullying, pageEnvironment);
      if (act === "prev") switchPage(pageEnvironment, pageBullying);
    });
  });
});