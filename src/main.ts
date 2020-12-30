import { app, BrowserWindow } from 'electron';
import path from 'path';

// セキュアな Electron の構成
// 参考: https://qiita.com/pochman/items/64b34e9827866664d436

const createWindow = (): void => {
  // レンダープロセスとなる、ウィンドウオブジェクトを作成する。
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      // レンダラープロセスで Node.js 使えないようにする (XSS対策)
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      // preload で実行するときに、コンテキスト(this == window)を別なものとする
      contextIsolation: true,
      // process や Electron を windowオブジェクト に保存する処理。フルパスの指定が必要
      preload: path.join(__dirname, './core/preLoad.js'), // preLoad.js にビジネスロジックを記述する
    },
  });

  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  //win.loadFile('./index.html');
  win.loadFile(path.join(__dirname, './index.html'));

  // 開発者ツールを起動する
  //win.webContents.openDevTools();
  // 起動オプションに、 "--debug"があれば開発者ツールを起動する
  if (process.argv.find((arg) => arg === '--debug')) {
    win.webContents.openDevTools()
  }
};

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(createWindow);

// すべての ウィンドウ が閉じたときの処理
app.on('window-all-closed', () => {
  // macOS 以外では、メインプロセスを停止する
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
