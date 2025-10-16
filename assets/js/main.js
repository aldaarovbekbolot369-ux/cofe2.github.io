// --- Эффект "поднимающегося кофе" (оптимизированная версия) ---
// Скрипт запускается после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Проверка: отключаем анимацию на слабых устройствах или при слабом FPS
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function coffeeSteam() {
    const emoji = document.createElement('div');
    emoji.textContent = '☕';
    emoji.style.position = 'fixed';
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    emoji.style.bottom = '0';
    emoji.style.opacity = 0.8;
    emoji.style.transition = 'transform 3s ease-out, opacity 3s ease-out';
    emoji.style.pointerEvents = 'none'; // не мешает кликам
    emoji.style.zIndex = 9999; // поверх контента
    document.body.appendChild(emoji);

    // Запуск анимации
    requestAnimationFrame(() => {
      emoji.style.transform = 'translateY(-100vh)';
      emoji.style.opacity = 0;
    });

    // Удаляем элемент через 3 секунды
    setTimeout(() => emoji.remove(), 3000);
  }

  // Запускаем эффект не чаще раза в 2 секунды
  const interval = setInterval(coffeeSteam, 2000);

  // Останавливаем анимацию, если пользователь неактивен (экономия ресурсов)
  let inactive = false;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !inactive) {
      clearInterval(interval);
      inactive = true;
    } else if (!document.hidden && inactive) {
      setInterval(coffeeSteam, 2000);
      inactive = false;
    }
  });
});
