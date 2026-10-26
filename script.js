document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const btnIncrease = document.getElementById("btn-increase");
  const btnDecrease = document.getElementById("btn-decrease");
  const btnTheme = document.getElementById("btn-theme");
  const btnSpeak = document.getElementById("btn-speak");
  const btnBackToTop = document.getElementById("btn-back-to-top");
  const btnSubmitQuiz = document.getElementById("btn-submit-quiz");

  let currentFontSize = 100;

  

  // 1. Controle de Tamanho da Fonte
  btnIncrease.addEventListener("click", () => {
    if (currentFontSize < 140) {
      currentFontSize += 10;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    }
  });

  btnDecrease.addEventListener("click", () => {
    if (currentFontSize > 80) {
      currentFontSize -= 10;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    }
  });

  // 2. Modo Claro / Modo Escuro (Alto Contraste)
  btnTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    btnTheme.textContent = isDarkMode ? "Tema Claro" : "Tema Escuro";
  });

  // 3. Leitor de Texto (Síntese de Voz)
  let speaking = false;
  btnSpeak.addEventListener("click", () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        speaking = false;
        btnSpeak.textContent = "🔊 Ouvir Página";
      } else {
        const mainContent = document.getElementById("main-content").innerText;
        const utterance = new SpeechSynthesisUtterance(mainContent);
        utterance.lang = "pt-BR";

        utterance.onend = () => {
          speaking = false;
          btnSpeak.textContent = "🔊 Ouvir Página";
        };

        window.speechSynthesis.speak(utterance);
        speaking = true;
        btnSpeak.textContent = "⏹️ Parar Leitura";
      }
    } else {
      alert("Desculpe, seu navegador não suporta a síntese de voz.");
    }
  });

  // 4. Botão Voltar ao Topo
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnBackToTop.style.display = "block";
    } else {
      btnBackToTop.style.display = "none";
    }
  });

  btnBackToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 5. Quiz Interativo
  btnSubmitQuiz.addEventListener("click", () => {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const resultDiv = document.getElementById("quiz-result");

    if (!q1 || !q2) {
      resultDiv.textContent = "Por favor, responda a todas as perguntas antes de enviar.";
      resultDiv.style.color = "#d9534f";
      return;
    }

    let score = 0;
    if (q1.value === "B") score++;
    if (q2.value === "C") score++;

    resultDiv.style.color = score === 2 ? "#2e7d32" : "#d9534f";
    resultDiv.textContent = `Você acertou ${score} de 2 perguntas! ${score === 2 ? "Parabéns! 🎉" : "Tente novamente!"}`;
  });
});
