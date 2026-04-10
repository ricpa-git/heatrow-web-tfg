/**
 * Maneja popups de aviso de funcionalidad en desarrollo
 * Reutilizable en múltiples páginas
 */

export function setupFunctionalityPopup(triggerSelectors = []) {
  const popup = document.getElementById("functionality-popup");
  const closeBtn = document.getElementById("functionality-popup-close");

  if (!popup) {
    console.warn("Popup con id 'functionality-popup' no encontrado");
    return;
  }

  // Mostrar popup
  function showPopup() {
    popup.style.display = "flex";
  }

  // Cerrar popup
  function closePopup() {
    popup.style.display = "none";
  }

  // Añadir event listeners a los botones que la disparan
  triggerSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        showPopup();
      });
    });
  });

  // Botón cerrar
  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  // Cerrar al hacer click fuera
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
}
