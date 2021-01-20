export class TableData {
    constructor(values, initialData) {
        this.values = values;
        this.initialData = initialData;
    }
    _changeObject (formValues) {
        this.values.id = (formValues.id !== '' ? formValues.id : this.values.id);
        this.values.name = formValues.name !== '' ? formValues.name : this.values.name;
        this.values.entered = formValues.entered !== '' ? formValues.entered : this.values.entered;
        this.values.updated = formValues.updated !== '' ? formValues.updated : this.values.updated;
    }

    changeData (idRow, formValues) {
        this._changeObject(formValues);
        this.initialData.splice(idRow, 1,  this.values);
        const newData = [...this.initialData];
        return newData;
    }
}

