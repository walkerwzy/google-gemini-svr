import fs from "fs/promises"

const host = process.env.HOST2;

try {
    // fs方式转图片为base64
    // const filepath = '/Users/walker/Downloads/IMG_0010.jpg'
    const filepath = '/Users/walker/Downloads/3333.jpeg'
    await fs.access(filepath, fs.constants.R_OK)
    const image = await fs.readFile(filepath)
    const b64 = image.toString('base64')

    // bun 方式转图片为base64，还麻烦些，主要不能直接读成buffer
    // const file = Bun.file(filepath)
    // if (!file.access()) return;
    // const arrbuf = await file.arrayBuffer();
    // const buffer = Buffer.from(arrbuf);
    // const b64 = buffer.toString('base64')

    const parts = ["https://img14.360buyimg.com/pop/jfs/t1/244246/4/4337/96061/65ba1678F9464813e/7e52c56b557e0a7f.jpg"]
    // const parts = [{data:b64, type: "image/jpeg"}]
    const body = JSON.stringify({
        "modelType": "text_and_image", 
        "prompt": "描述下这幅图片",
        "imageParts": parts
    })
    const body2 = JSON.stringify({
        "modelType": "text_only", 
        "prompt": "五十个字介绍下美国",
    })

    const response = await fetch(`${host}/chat-with-gemini`, {
        method: 'POST',
        body: body,
        headers: { "content-type": "application/json" },
        verbose: true
    });
    if (!response.ok) {
        console.error(response.statusText);
        console.log(await response.text())
    } else {
        const body = await response.json();
        console.log(body.result)
    }

} catch (e) {
    console.error(e)
}