# google-translate-unlimited-api

一个免费无限制的 google 翻译 API，且支持返回多个翻译项（翻译项带词性与解释，并按匹配度排序）

## 安装

```shell
npm install google-translate-unlimited-api  // or
yarn add google-translate-unlimited-api
```

## 用例

### example1

```javascript
import GoogleTranslator from 'google-translate-unlimited-api';
const google = new GoogleTranslator();
const result = await google.translate('你好');
console.log(result);
```

输出：

```json
[
    { "type": "best", "value": "Hello there", "exp": "你好" },
    { "type": "interjection", "value": "Hello!", "exp": "你好!,喂!" },
    { "type": "interjection", "value": "Hi!", "exp": "嗨!,你好!" },
    { "type": "interjection", "value": "Hallo!", "exp": "你好!" }
]
```

注：type: "best"，代表最佳翻译匹配项，其他 type 均为词性

### example2

```javascript
import GoogleTranslator from 'google-translate-unlimited-api';
const google = new GoogleTranslator();
const result = await google.translate('hello', {
    from: 'auto',
    to: 'zh-CN'
});
console.log(result);
```

输出：

```json
[
    { "type": "best", "value": "你好", "exp": "hello" },
    { "type": "interjection", "value": "你好!", "exp": "Hello!,Hi!,Hallo!" },
    { "type": "interjection", "value": "喂!", "exp": "Hey!,Hello!" }
]
```

### 翻译选项

`TranslateOption` 默认值为：

```json
{
    "from": "auto",
    "to": "en",
    "domain": "https://translate.google.cn"
}
```

## TODO

-   [ ] 支持 proxy
