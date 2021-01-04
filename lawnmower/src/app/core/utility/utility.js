formatNumber = (number) => {
    let exponent = Math.floor(Math.log10(number));
    let mantissa = number * Math.pow(10, exponent * -1);

    //or use .ToExponential(2) if > 1e5 or < 1e-4;
};
