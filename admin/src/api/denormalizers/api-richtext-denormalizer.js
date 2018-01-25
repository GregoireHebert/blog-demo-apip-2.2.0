import React from 'react';
import { RichTextField } from 'admin-on-rest';
import RichTextInput from 'aor-rich-text-input';

export default api => {
    const places = api.resources.find(r => 'articles' === r.name);
    places.fields.find(f => 'articleBody' === f.name).fieldComponent = <RichTextField source="articleBody" key="articleBody"/>;
    places.fields.find(f => 'articleBody' === f.name).inputComponent = <RichTextInput source="articleBody" key="articleBody"/>;

    return api;
};