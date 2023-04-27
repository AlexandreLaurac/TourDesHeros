import { Pipe, PipeTransform } from '@angular/core' ;
/*
 * Gives the absolute value
 * Usage:
 *   value | absoluteValue
 * Example:
 *   {{ -2 | absoluteValue }}
 *   formats to : 2
*/

@Pipe({ name : 'absoluteValue' })
export class AbsoluteValuePipe implements PipeTransform {
    transform (value : number) : number {
        return Math.abs(value) ;
    }
}
