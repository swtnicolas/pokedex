import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, search: string): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter((t: string) => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');
    const match = text.match(regex);
    if (!match) {
      return text;
    }
    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }

}
