import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends Component {
  renderField(data) {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
      data.input['aria-describedby'] = `article_${data.input.name}_helpBlock`;
      data.input['aria-invalid'] = true;
    }

    return <div className={`form-group${hasError ? ' has-error' : ''}`}>
      <label htmlFor={`article_${data.input.name}`} className="control-label">{data.input.name}</label>
      <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`article_${data.input.name}`} className="form-control"/>
      {hasError && <span className="help-block" id={`article_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
    </div>;
  }

  render() {
    const { handleSubmit } = this.props;

    return <form onSubmit={handleSubmit}>
      <Field component={this.renderField} name="name" type="text" placeholder="A nice name" required={true}/>
      <Field component={this.renderField} name="description" type="text" placeholder="A comprehensive description" required={true}/>
      <Field component={this.renderField} name="content" type="text" placeholder="An entertaining content" required={true}/>
      <Field component={this.renderField} name="enabled" type="checkbox" placeholder="Is it ready yet ?" required={true}/>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>;
  }
}

export default reduxForm({form: 'article', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
