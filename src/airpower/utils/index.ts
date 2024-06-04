

/**
 * 通用防抖函数
 */
export const debounce = (fn: Function, delay: number) => {
    let timer: any = null;
    return function (this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};


/**
 * 通用节流函数
 */

export const throttle = (fn: Function, delay: number) => {
    let timer: any = null;
    return function (this: any, ...args: any[]) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        }
    };
};

