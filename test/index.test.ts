import GoogleTranslator from '../';

(async () => {
    const google = new GoogleTranslator();
    const result = await google.translate('example', {
        from: 'auto',
        to: 'zh-CN'
    });
    console.log(result);
})();
