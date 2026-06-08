/* ─────────────────────────────────────────────────────────────────────────
   Atom — Meta Pixel (site vitrine atombuyerclub.fr)

   👉 POUR ACTIVER : coller le MÊME ID de Pixel que sur la landing.
      (Meta Business → Gestionnaire d'événements → source Web → ID du pixel.)

   Tant que ATOM_META_PIXEL_ID est vide, le pixel reste TOTALEMENT INACTIF
   (aucun script, aucun cookie, aucune requête) — déployable sans risque.

   Le site vitrine ne contient pas de formulaire : on suit ici le PageView,
   ce qui permet de RECIBLER les visiteurs venus se renseigner.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  var ATOM_META_PIXEL_ID = '1312077793799886';

  window.atomTrackLead = function () {};

  if (!ATOM_META_PIXEL_ID) return;

  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', ATOM_META_PIXEL_ID);
  fbq('track', 'PageView');

  window.atomTrackLead = function (params) {
    try { fbq('track', 'Lead', params || {}); } catch (e) {}
  };
})();
