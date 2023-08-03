import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
 
  transform(value: string) {
    var datePipe = new DatePipe("fr-FR");
    return datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss');
}

}
