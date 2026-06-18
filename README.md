# POT App 阿里云OCR 识别插件

调用阿里云高精版OCR文字识别API的POT App插件。

## 功能

- 支持中英文及多语言文字识别
- 高精度OCR识别
- 通过阿里云APPCODE认证

## 安装

1. 在 [Releases](../../releases) 页面下载最新的 `.potext` 文件
2. 打开 POT App → 服务设置 → 文字识别 → 添加外部插件
3. 选择下载的 `.potext` 文件安装

## 配置

1. 前往 [阿里云云市场](https://market.aliyun.com/products/57124001/cmapi028554.html) 购买高精版OCR文字识别服务
2. 在 [云市场控制台 - 已购买的服务](https://market.console.aliyun.com/imageconsole/index.htm) 中查看 AppCode
3. 在 POT App 插件设置中填入 AppCode

## API说明

- **接口地址**: `https://ocrapi-advanced.taobao.com/ocrservice/advanced`
- **请求方式**: POST
- **认证方式**: `Authorization: APPCODE <AppCode>`
- **文档参考**: [阿里云OCR高精版API](https://market.aliyun.com/products/57124001/cmapi028554.html)

## 开发

```bash
# 克隆仓库
git clone https://github.com/saillill/pot-app-recognize-plugin-aliyun-ocr.git

# 修改 main.js 后进行测试

# 推送后 GitHub Actions 会自动构建
git push
```

## 许可证

GPL-3.0 License
