import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';

export class Option extends Model {
  public name: string;
  public title: string;
  public ref: string;
  public type: string;
  public possible_values: Array<any>;
  public value: any;

  constructor(attributes?) {
    super(attributes);
    return this;
  }

  attributesHook() {
    this.addAttribute('name', '');
    this.addAttribute('title', '');
    this.addAttribute('ref', '');
    this.addAttribute('type', '')
    this.addAttribute('possible_values', []);
    this.addAttribute('value', '');
  }

  formControlUpdateOn(): 'change'|'blur'|'submit' {
    const type = this.formControlType();

    if (this.name === 'lead_cc') {
      // NOTE: Patch for virtualvisit lead_cc option.
      return 'blur';

    } else if (type === 'input') {
      return 'blur';

    } else {
      return 'change';
    }
  }

  formControlType(): string {
    if (this.isArray(this.possible_values)) {
      if (this.possible_values.length === 2) {
        return 'radio';

      } else {
        return 'list';

      }

    } else if (this.type === "bool") {
      return 'checkbox';

    } else if (this.type === "string" || this.type === "int") {
      return 'input';

    }
  }

  trueLabel() {
    if (this.isArray(this.possible_values)) {
      return this.possible_values[1];
    }
  }

  falseLabel() {
    if (this.isArray(this.possible_values)) {
      return this.possible_values[0];
    }
  }

  isArray(obj: any): boolean {
    return obj && typeof obj === 'object' && obj.length;
  }
}
