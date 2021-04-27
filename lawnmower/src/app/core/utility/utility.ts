import { Currency } from '@core/models/currency';
export const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

export function assignCurrency<C extends Currency>(c: new () => C, baseCurrency: Currency): C {
    if (baseCurrency === undefined) return undefined;
    const obj = Object.assign(new c(), baseCurrency);
    return obj;
}

export function assign<T1, T2 extends T1>(t: new () => T2, obj: T1): T2 {
    return Object.assign(new t(), obj);
}
