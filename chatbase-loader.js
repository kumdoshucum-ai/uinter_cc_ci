(() => {
  if (window.chatbase && window.chatbase('getState') === 'initialized') return;

  window.chatbase = (...args) => {
    window.chatbase.q = window.chatbase.q || [];
    window.chatbase.q.push(args);
  };
  window.chatbase = new Proxy(window.chatbase, {
    get(target, property) {
      if (property === 'q') return target.q;
      return (...args) => target(property, ...args);
    }
  });

  const loadChatbase = () => {
    if (document.querySelector('script[data-chatbase-loader]')) return;
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.id = '5ZnP8yP5FqiY-bZrkSoQJ';
    script.dataset.chatbaseLoader = 'true';
    document.body.appendChild(script);
  };

  if (document.readyState === 'complete') loadChatbase();
  else window.addEventListener('load', loadChatbase, { once: true });
})();
