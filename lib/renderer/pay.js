const { ipcRenderer } = require('electron');

const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');

noBtn.addEventListener('click', (event) => {
  window.close();
});

yesBtn.addEventListener('click', (event) => {
  //pay
  ipcRenderer.sendTo(1, 'data-update-request', [
    {
      ProductName: '이창완',
      Amount: 1,
      TotalPrice: 10,
    },
  ]);
  window.close();
});
