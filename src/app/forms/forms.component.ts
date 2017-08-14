import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor() { }


  ifMessage = false
  ages = [{
    name: 'One',
    value: 1
  },{
    name: 'Two',
    value: 2
  },{
    name: 'Three',
    value: 3
  },{
    name: 'Four',
    value: 4
  },{
    name: 'Five',
    value: 5
  },{
    name: 'Six',
    value: 6
  },{
    name: 'Seven',
    value: 7
  },{
    name: 'Eight',
    value: 8
  },{
    name: 'Nine',
    value: 9
  },{
    name: 'Ten',
    value: 10
  }]
  items = [{
    id: 1,
    description: 'Bikes',
    value:'bike',
    checked: true
  },{
    id: 2,
    description: 'Cars',
    value:'car',
    checked: false
  }]
  exampleForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-ZÀ-ž ]*')]), //Latin characters, diacritics and spaces
    age: new FormControl(3, Validators.required),
    birth_date: new FormControl(null, Validators.required),
    gender: new FormControl('female'),
    description: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email])/*,
    items: new FormGroup({})*/
  })
  submitted: boolean
  

  ngOnInit() {

    this.loadItems()

  }

  loadItems() {

    var itemsGroup = new FormGroup({})
    //Add items to form group by items
    this.items.forEach(function(item) {
      itemsGroup.addControl(item.id.toString(), new FormControl(false))
    })
    this.exampleForm.addControl('items', itemsGroup)

  }

  showMessage(event, text) {

    console.log(event)
    console.log(text)
    this.ifMessage = (text.length > 0) ? true : false
    
  }

  alertData(text) {
    
    if(text.length > 0) {
      alert(text)
    }
    
  }

  submitForm(formData) {

    console.log(formData)

  }

  resetForm() {

    this.exampleForm.reset({
      name: null,
      age: null,
      birth_date: new Date().toISOString().substring(0,10),
      gender: 'female',
      description: null,
      email: null
    })

  }

}
