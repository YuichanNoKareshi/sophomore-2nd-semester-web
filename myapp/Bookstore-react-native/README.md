# 在Android环境下运行
必须安装的依赖有Node、Watchman、JDK 和 Android Studio，具体的安装和编译、运行方法见 https://reactnative.cn/docs/getting-started/ 。
# 在ios环境下运行
必须安装的依赖有：Node、Watchman 和 Xcode，具体的安装和编译、运行方法见 https://reactnative.cn/docs/getting-started/ 。
# 关于URL
由于后端统一采用了http协议，默认情况下，iOS 会阻止所有 http 的请求，从 Android9 开始，也会默认阻止 http 请求，于是如何配置相应环境使用http协议，
请参考 https://reactnative.cn/docs/network/ 。
模拟器可能没有解析域名的能力，请将urlconfig.js中的apiUrl修改为本地的ip地址。