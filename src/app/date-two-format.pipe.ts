import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTwoFormat'
})
export class DateTwoFormatPipe implements PipeTransform {

  transform(value: string) {
    var datePipe = new DatePipe("fr-FR");
    return datePipe.transform(value,'yyyy-MM-ddThh:mm');
}

}
