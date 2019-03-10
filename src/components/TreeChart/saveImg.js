const savaImage = (data, filename) => {
  const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  saveLink.href = data;
  saveLink.download = filename;
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  saveLink.dispatchEvent(event);
};

const fixtype = (type) => {
  const setType = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
  const r = setType.match(/png|jpeg|bmp|gif/)[0];
  return `image/'${r}`;
};

const screenShot = (canvas) => {
  const type = 'png';
  // const d = document.querySelector('.');
  let imgdata = canvas.toDataURL(type);
  // 将mime-type改为image/octet-stream, 强制让浏览器下载
  imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
  // 将图片保存到本地
  const date = new Date();
  const filename = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${type}`;
  savaImage(imgdata, filename);
};

export default screenShot;
