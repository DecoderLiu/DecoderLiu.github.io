(() => {
  const studio = document.querySelector("[data-studio]");
  if (!studio) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const setPointerVars = event => {
    document.querySelectorAll("[data-cursor-card]").forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${clamp(x, 0, 100)}%`);
      card.style.setProperty("--my", `${clamp(y, 0, 100)}%`);
    });

    document.querySelectorAll("nav a").forEach(link => {
      const rect = link.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const pull = clamp((event.clientX - center) / 20, -10, 10);
      link.style.setProperty("--nav-pull", `${pull}px`);
    });
  };

  if (!prefersReduced) {
    window.addEventListener("pointermove", setPointerVars, { passive: true });
  }

  const eyes = studio.querySelectorAll("[data-eye]");
  const moveEyes = event => {
    eyes.forEach(eye => {
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(event.clientY - cy, event.clientX - cx);
      eye.style.transform = `translate(${Math.cos(angle) * 7}px, ${Math.sin(angle) * 7}px)`;
    });
  };

  if (!prefersReduced) {
    window.addEventListener("pointermove", moveEyes, { passive: true });
  }

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.18 });

  studio.querySelectorAll(".studio-reveal").forEach(el => reveal.observe(el));

  const updateScroll = () => {
    const rect = studio.getBoundingClientRect();
    const ratio = clamp(1 - rect.top / window.innerHeight, 0, 1);
    studio.style.setProperty("--studio-scroll", ratio.toFixed(3));
  };

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  const constellation = studio.querySelector("[data-constellation]");
  if (constellation && !prefersReduced) {
    constellation.addEventListener("pointermove", event => {
      const rect = constellation.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 520;
      const y = ((event.clientY - rect.top) / rect.height) * 300;

      constellation.querySelectorAll("[data-node]").forEach(node => {
        const nx = Number(node.dataset.x);
        const ny = Number(node.dataset.y);
        const dx = x - nx;
        const dy = y - ny;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, 1 - dist / 180) * 18;
        node.style.transform = `translate(${(dx / dist) * force}px, ${(dy / dist) * force}px)`;
      });
    });

    constellation.addEventListener("pointerleave", () => {
      constellation.querySelectorAll("[data-node]").forEach(node => {
        node.style.transform = "translate(0, 0)";
      });
    });
  }

  const frontier = studio.querySelector("[data-frontier]");
  const riskEl = studio.querySelector("[data-risk]");
  const returnEl = studio.querySelector("[data-return]");

  if (frontier) {
    const ctx = frontier.getContext("2d");

    const drawFrontier = t => {
      const w = frontier.width;
      const h = frontier.height;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(89, 97, 111, 0.28)";
      ctx.beginPath();
      ctx.moveTo(46, h - 48);
      ctx.lineTo(w - 34, h - 48);
      ctx.moveTo(58, h - 36);
      ctx.lineTo(58, 36);
      ctx.stroke();

      ctx.fillStyle = "#59616f";
      ctx.font = "14px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("risk", w - 70, h - 22);
      ctx.save();
      ctx.translate(24, 72);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("return", 0, 0);
      ctx.restore();

      ctx.strokeStyle = "#2457c5";
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i <= 150; i += 1) {
        const u = i / 150;
        const x = 76 + u * (w - 150);
        const y = h - 60 - Math.pow(u, 1.7) * 138 - Math.sin(u * Math.PI) * 20;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const u = clamp(t, 0, 1);
      const px = 76 + u * (w - 150);
      const py = h - 60 - Math.pow(u, 1.7) * 138 - Math.sin(u * Math.PI) * 20;
      const ret = 0.28 + u * 0.66;

      ctx.fillStyle = "#9b6215";
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#14171f";
      ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillText(`(${u.toFixed(2)}, ${ret.toFixed(2)})`, px - 36, py - 16);

      if (riskEl) riskEl.textContent = u.toFixed(2);
      if (returnEl) returnEl.textContent = ret.toFixed(2);
    };

    drawFrontier(0.42);
    frontier.addEventListener("pointermove", event => {
      const rect = frontier.getBoundingClientRect();
      drawFrontier((event.clientX - rect.left) / rect.width);
    });
  }

  const drawSparks = time => {
    studio.querySelectorAll("[data-spark]").forEach(canvas => {
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const kind = canvas.dataset.spark;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = kind === "wave" ? "#007f78" : kind === "tree" ? "#9b6215" : "#2457c5";
      ctx.fillStyle = "#7047a8";

      if (kind === "wave") {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = 30 + Math.sin(x / 11 + time / 520) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (kind === "tree") {
        const points = [[48, 8], [24, 31], [72, 31], [14, 50], [48, 50], [82, 50]];
        ctx.beginPath();
        points.forEach(([x, y], i) => {
          ctx.moveTo(48, 8);
          if (i > 0) ctx.lineTo(x, y);
        });
        ctx.stroke();
        points.forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        ctx.beginPath();
        for (let x = 8; x <= 88; x += 4) {
          const u = (x - 8) / 80;
          const y = 48 - Math.pow(u, 1.8) * 34;
          if (x === 8) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    });

    if (!prefersReduced) requestAnimationFrame(drawSparks);
  };

  drawSparks(0);
})();
