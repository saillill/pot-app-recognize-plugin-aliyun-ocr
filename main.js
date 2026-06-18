async function recognize(base64, lang, options) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    let { appCode } = config;

    if (!appCode) {
        throw "请在插件设置中填写阿里云OCR的AppCode";
    }

    const apiUrl = "https://ocrapi-advanced.taobao.com/ocrservice/advanced";

    const headers = {
        'Authorization': `APPCODE ${appCode}`,
        'Content-Type': 'application/json; charset=UTF-8'
    };

    const body = {
        img: base64
    };

    const res = await fetch(apiUrl, {
        method: 'POST',
        url: apiUrl,
        headers: headers,
        body: {
            type: "Json",
            payload: body
        }
    });

    if (res.ok) {
        const result = res.data;
        if (result && result.content) {
            return result.content;
        } else {
            throw `API返回异常: ${JSON.stringify(result)}`;
        }
    } else {
        throw `HTTP请求错误\n状态码: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
