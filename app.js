'use strict';

const Obniz = require('obniz');
const obniz = new Obniz('OBNIZ_ID');
const line = require('@line/bot-sdk');

const config = {
    channelSecret: 'チャネルシークレット',
    channelAccessToken: 'チャネルアクセストークン'
};
const client = new line.Client(config);

obniz.onconnect = async function () {
  const hcsr04 = obniz.wired('HC-SR04', { gnd: 0, echo: 1, trigger: 2, vcc: 3 });

  setInterval(async function () {
      // 距離を取得
      let distance = await hcsr04.measureWait();
      console.log(distance + ' mm');

      if (distance > 150) {
        await main();
      }
  }, 1000); // 1000ミリ秒 = 1秒おきに実行
}

const main = async () => {

    const messages = [{
        type: 'text',
        text: 'いっせい送信です！'
    }];

    try {
        const res = await client.broadcast(messages);
        console.log(res);        
    } catch (error) {
        console.log(`エラー: ${error.statusMessage}`);
        console.log(error.originalError.response.data);
    }
}
