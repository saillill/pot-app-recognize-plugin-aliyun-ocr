async function recognize(base64, lang, options) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    let { appCode } = config;

    if (!appCode) {
        throw "请在插件设置中填写阿里云OCR的AppCode";
    }

    const host = "https://tysbgpu.market.alicloudapi.com";
    const path = "/api/predict/ocr_general";
    const apiUrl = host + path;

    const headers = {
        'Authorization': `APPCODE ${appCode}`,
        'Content-Type': 'application/json; charset=UTF-8'
    };

    const body = {
        "image": base64,
        "configure": {
            "output_prob": true,
            "output_keypoints": false,
            "skip_detection": false,
            "dir_assure": false
        }
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
        if (result && result.ret) {
            // API返回格式: {"success":true, "ret":[{"word":"...", "prob":..., "rect":{...}},...]}
            const texts = result.ret.map(item => item.word).filter(Boolean);
            if (texts.length > 0) {
                return texts.join('\n');
            }
            throw "API未识别到文字";
        }
        throw `API返回异常: ${JSON.stringify(result)}`;
    } else {
        throw `HTTP请求错误\n状态码: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
