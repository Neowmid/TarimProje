function svgturkiyeharitasi() {
  const svgHarita = document.querySelector('#svg-turkiye-haritasi');
  const tooltip = document.querySelector('.il-isimleri');

  if (!svgHarita || !tooltip) return;

  svgHarita.addEventListener('mouseover', function (event) {
    const target = event.target;
    if (target.tagName === 'path') {
      const gElement = target.closest('g');
      if (gElement && gElement.id === 'guney-kibris') return;

      const ilAdi = gElement ? gElement.getAttribute('data-iladi') : 'Bilinmeyen İl';
      tooltip.innerHTML = `<div>${ilAdi}</div>`;
      tooltip.style.display = 'block';
    }
  });

  svgHarita.addEventListener('mousemove', function (event) {
    const offsetX = 10;
    const offsetY = 10;
    const rect = svgHarita.getBoundingClientRect();
    const x = event.clientX - rect.left + offsetX;
    const y = event.clientY - rect.top + offsetY;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  });

  svgHarita.addEventListener('mouseout', function (event) {
    if (event.target.tagName === 'path') {
      tooltip.style.display = 'none';
      tooltip.innerHTML = '';
    }
  });

  // 👇 İl üzerine tıklandığında popup açma
  svgHarita.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'path') {
      const gElement = target.closest('g');
      if (!gElement || gElement.id === 'guney-kibris') return;

      const id = gElement.getAttribute('id');
      const plaka = gElement.getAttribute('data-plakakodu');

      if (id && plaka) {
        const popup = document.getElementById('il-popup');
        const iframe = document.getElementById('popup-frame');

        // 🔁 HTML dosyasını "iller" klasöründen al
        iframe.src = `iller/${id.toLowerCase()}.html`;
        popup.style.display = "block";
      }
    }
  });
}

// Kapatma butonu
document.getElementById('popup-close').addEventListener('click', () => {
  const popup = document.getElementById('il-popup');
  const iframe = document.getElementById('popup-frame');
  popup.style.display = "none";
  iframe.src = "";
});
