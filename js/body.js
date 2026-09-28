// effet texe venant de la drite


window.addEventListener('scroll', function() {
    const texte = document.getElementById('texte');
    const rect = texte.getBoundingClientRect();
    // Lorsque l'élément atteint une position spécifique, on l'affiche
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        texte.classList.add('visible');
    } else {
        texte.classList.remove('visible');
    }
});

  // effet tex venant de la droite 
  
  window.addEventListener('scroll', function() {
    const tex = document.getElementById('tex');
    const rect = tex.getBoundingClientRect();
    // Lorsque l'élément atteint une position spécifique, on l'affiche
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        tex.classList.add('visible');
    } else {
        tex.classList.remove('visible');
    }
});
//
  // effet tex venant index html  
  

//