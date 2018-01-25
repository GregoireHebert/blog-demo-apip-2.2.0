import React from 'react';
import { ReferenceField, TextField, ReferenceInput, SelectInput } from 'admin-on-rest';

export default api => {
    const articles =  api.resources.find(r => 'articles' === r.name);

    // Set the field in the list and the show views
    articles.readableFields.find(f => 'author' === f.name).fieldComponent =
        <ReferenceField label="Author" reference="authors" source="author" key="authors">
            <TextField source="name" />
        </ReferenceField>
    ;

    // Set the input in the edit and create views
    console.log(articles.writableFields.find(f => 'author' === f.name));
    articles.writableFields.find(f => 'author' === f.name).inputComponent =
        <ReferenceInput label="Author" source="author" reference="authors" filterToQuery={searchText => ({ name: searchText })} allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    ;

    return api;
};