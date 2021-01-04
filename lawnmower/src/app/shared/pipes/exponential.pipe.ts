import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'exponential' })
export class Exponential implements PipeTransform {
    transform(value: number) {
        if ((value < 1e-2 || value > 1e6) && value != 0) {
            return value.toExponential(2);
        }
        return value.toFixed(2);
    }
}
