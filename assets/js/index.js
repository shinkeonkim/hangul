const GA = 44032;
const HIH = 55203;

const throttle = (callback, limit) => {
  let wait = false;
  return () => {
    if(!wait) {
      callback.apply(null, arguments)
      wait = true;
      setTimeout(() => {
        wait = false
      }, limit);
    }
  }
}

const initCursor = () => {
  const cursorElement = document.getElementById('cursor');

  const setCursorPosition = (e) => {
    cursorElement.style.top = `${e.clientY - 100}px`;
    cursorElement.style.left = `${e.clientX - 100}px`;
  }

  window.addEventListener('mousemove', (e) => {
    throttle(setCursorPosition(e), 200);
  })
}

window.onload = (e) => {    
  const hangulCharacterStrList = [];  
  
  let s = "";
  for(let i = GA; i <= HIH; i++) {
    s += String.fromCharCode(i);
    if(s.length == (HIH - GA + 1)/6) {
      s = s.slice(0, 50);
      hangulCharacterStrList.push(s);
      s = ""
    }
  }
  
  for(let i = 0; i < 6; i ++) {
    const hangulListElement = document.getElementById(`hangul-list-${i}`);
    hangulListElement.innerText = hangulCharacterStrList[i];
  }

  initCursor();
}