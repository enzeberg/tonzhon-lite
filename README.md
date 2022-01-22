# tonzhon-lite

<h3>将QQ音乐、网易云音乐和酷我音乐上的歌添加到一个列表来播放！</h3>

## 地址
- [https://tonzhon.com](https://tonzhon.com)
- [lite.tonzhon.com](http://lite.tonzhon.com)

## 功能
- 搜索
 (支持使用查询字符串搜索，如: [http://lite.tonzhon.com/search?keyword=Iron%20Man](http://lite.tonzhon.com/search?keyword=Iron%20Man))
- 播放
- 下载歌曲
- 导入网易云音乐的**完整**歌单
 （如：[http://lite.tonzhon.com/netease-playlist/5132177936](http://lite.tonzhon.com/netease-playlist/5132177936))
- 热歌榜（包括网易云音乐、酷我音乐和QQ音乐）

## 使用
    git clone https://github.com/enzeberg/tonzhon-lite.git
    cd tonzhon-lite
    # Install dependencies
    yarn
    # Build
    yarn build

    # get tonzhon-lite-server （请确保 tonzhon-lite-server 和 tonzhon-lite 在同一个目录下）
    git clone https://github.com/enzeberg/tonzhon-lite-server.git
    cd tonzhon-lite-server
    npm i
    # Start the server
    npm start
打开 `http://localhost:8081` 即可。

## 开发
### 后端
    cd tonzhon-lite-server
    # Start nodemon dev server (需要全局安装 nodemon)
    npm run dev

### 前端
    cd tonzhon-lite
    # Start webpack dev server
    yarn start
打开 `http://localhost:3000` 即可。

## License
MIT