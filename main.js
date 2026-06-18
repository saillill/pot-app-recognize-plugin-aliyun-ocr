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
        // 尝试多种可能的返回格式
        if (result && result.content) {
            return result.content;
        }
        if (result && result.data && result.data.content) {
            return result.data.content;
        }
        if (result && result.words_result) {
            // 拼接所有识别到的文字
            return result.words_result.map(item => item.words || item.word).filter(Boolean).join('\n');
        }
        if (result && result.prism_wordsInfo) {
            return result.prism_wordsInfo.map(item => item.word).filter(Boolean).join('\n');
        }
        if (typeof result === 'string') {
            return result;
        }
        throw `API返回异常，未知格式: ${JSON.stringify(result)}`;
    } else {
        throw `HTTP请求错误\n状态码: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
