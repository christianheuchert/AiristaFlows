import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface KeyCheckbox {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-trigger-input',
  templateUrl: './trigger-input.component.html',
  styleUrls: ['./trigger-input.component.scss']
})
export class TriggerInputComponent implements OnInit {
  inputForm!: FormGroup;
  selectedKeys: string[] = [];
  objectKeys: KeyCheckbox[] = [];
  jsonData: string = '';
  keysChecked: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      Input: ['']
    });
  }

  formatInput(): void {
    const input = this.inputForm.get('Input')?.value;
    if (input) {
      try {
        const parsedObject = JSON.parse(input);
        this.jsonData = JSON.stringify(parsedObject, null, 2);
        this.objectKeys = this.getObjectKeys(parsedObject);
        this.keysChecked = this.initializeKeysChecked(this.objectKeys);
        this.setBooleanKeys(parsedObject);
      } catch (error) {
        console.error('Invalid JSON input:', error);
      }
    }
  }
  
  initializeKeysChecked(keys: KeyCheckbox[]): { [key: string]: boolean } {
    const keysChecked: { [key: string]: boolean } = {};
    for (let key of keys) {
      keysChecked[key.name] = false;
    }
    return keysChecked;
  }
  

  setBooleanKeys(obj: any, prefix: string = "") {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        this.setBooleanKeys(obj[key], `${prefix}${key}.`);
      } else {
        this.keysChecked[`${prefix}${key}`] = false;
      }
    }
  }

  getObjectKeys(obj: any, prefix: string = ""): KeyCheckbox[] {
    return Object.keys(obj).flatMap(key => {
      const currentKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const nestedKeys = this.getObjectKeys(obj[key], currentKey);
        return [{ name: currentKey, checked: false }, ...nestedKeys];
      } else {
        return [{ name: currentKey, checked: false }];
      }
    });
  }
  

  toggleKeyChecked(key: string): void {
    this.keysChecked[key] = !this.keysChecked[key];
  }  
  

  closeDialog(): void {
    // Close dialog logic
  }

  onSubmit(): void {
    // Form submission logic
  }

  checkModel() {
    console.log("checking the model: ", this.keysChecked);
  }
}
