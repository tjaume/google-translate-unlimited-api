import request from 'request-promise-native';
import { getTK } from './token';

export interface TranslateOption {
    from?: string;
    to?: string;
    domain?: string;
}

export interface TranslateItem {
    type: string;
    value: string;
    exp: string;
}

class GoogleTranslator {
    private option: TranslateOption;
    constructor(option?: TranslateOption) {
        this.option = {
            from: 'auto',
            to: 'en',
            domain: 'https://translate.google.cn'
        };
        if (option) {
            this.option = { ...this.option, ...option };
        }
    }
    async translate(word: string, option?: TranslateOption) {
        if (option) {
            this.option = { ...this.option, ...option };
        }
        try {
            const tk = await getTK(word, this.option.domain);
            const qs = `client=webapp&sl=${this.option.from}&tl=${
                this.option.to
            }&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=gt&otf=2&ssel=0&tsel=4&kc=1&tk=${
                tk.value
            }&q=${encodeURIComponent(word)}`;
            const url = `${this.option.domain}/translate_a/single?${qs}`;
            const res = await request.get(url);
            const data = JSON.parse(res) as Array<any>;
            const result = this.parser(data);
            return result;
        } catch (e) {
            throw e;
        }
    }
    private parser(data: Array<any>) {
        const result: Array<TranslateItem> = [];
        if (data.length) {
            const bestTranslateItem = data[0] as Array<string>;
            result.push({
                type: 'best',
                value: bestTranslateItem[0][0],
                exp: bestTranslateItem[0][1]
            });
            if (data.length > 1) {
                const elseTranslateList = data[1] as Array<any>;
                if (elseTranslateList && elseTranslateList.length) {
                    elseTranslateList.forEach((translateGroup: Array<any>) => {
                        result.push(
                            ...this.parserTranslateGroup(translateGroup)
                        );
                    });
                }
            }
        }
        return result;
    }
    private parserTranslateGroup(translateGroup: Array<any>) {
        const groupItemList: Array<TranslateItem> = [];
        const groupType = translateGroup[0];
        const _list = translateGroup[2] as Array<any>;
        _list.forEach((item: Array<any>) => {
            groupItemList.push({
                type: groupType,
                value: item[0],
                exp: (item[1] as Array<any>).join(',')
            });
        });
        return groupItemList;
    }
}

export default GoogleTranslator;
