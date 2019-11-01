import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import Auth from '../../lib/auth'
import Filestack from 'filestack-react'
import { filestackKey } from '../../../config/environment'

const options = {
  accept: 'image/*',
  options: {
    resize: {
      width: 50
    }
  },
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

const createOption = (label) => ({
  label,
  value: label
})

const components = {
  DropdownIndicator: null
}

class NewRecipe extends React.Component{
  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {},
      inputValue: '',
      value: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadImages = this.handleUploadImages.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/recipes', this.state.formData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/recipes'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  // eslint-disable-next-line no-dupe-class-members
  handleChange(value, actionMeta) {
    console.group('Value Changed')
    console.log(value)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    this.setState({ value })
  }

  handleInputChange (inputValue) {
    this.setState({ inputValue })
  }

  handleKeyDown (event) {
    const { inputValue, value } = this.state
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added')
        console.log(value)
        console.groupEnd()
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)]
        })
        event.preventDefault()
    }
  }

  render() {
    console.log(this.state.formData)
    return(
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-8 is-offset-2">
              <h3 className="title is-3">New Recipe</h3>
              <p className="subtitle">Complete the form below</p>
              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: Custard Tarts"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <input
                      className="textarea"
                      name="description"
                      placeholder="eg: This custard tart recipe makes as-close-to-authentic Portuguese custard tarts with a rich egg custard nestled in shatteringly crisp pastry."
                      onChange={this.handleChange}
                    />
                    {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Ingredients</label>
                    <input
                      className="textarea"
                      name="ingredients"
                      placeholder="eg: 200ml double cream"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.ingredients && <small className="help is-danger">{this.state.errors.ingredients}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Preparation Time (min)</label>
                    <input
                      className="input"
                      type="number"
                      name="preparationTime"
                      placeholder="eg: 10"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.preparationTime && <small className="help is-danger">{this.state.errors.preparationTime}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Cooking Time (min)</label>
                    <input
                      className="input"
                      type="number"
                      name="cookingTime"
                      placeholder="eg: 10"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.cookingTime && <small className="help is-danger">{this.state.errors.cookingTime}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Dietary</label>
                    <input
                      className="input"
                      name="dietary"
                      placeholder="eg: vegetarian"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.dietary && <small className="help is-danger">{this.state.errors.dietary}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Method</label>
                    <CreatableSelect
                      name="method"
                      components={components}
                      inputValue={this.state.inputValue}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={this.handleChange}
                      onInputChange={this.handleInputChange}
                      onKeyDown={this.handleKeyDown}
                      placeholder="Type something and press enter..."
                      value={this.state.value}
                    />
                    <input
                      className="textarea"
                      name="method"
                      placeholder="eg: Put the cream and milk into a large pan and gently bring to just below boiling point. Meanwhile, in a large bowl, whisk the yolks, cornflour, sugar and vanilla. Gradually pour the hot milk mixture onto the sugar mixture, whisking constantly."
                      onChange={this.handleChange}
                    />
                    {this.state.errors.method && <small className="help is-danger">{this.state.errors.method}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Image</label>
                    <a>
                      <Filestack
                        mode="transform"
                        apikey={filestackKey}
                        options={options}
                        onSuccess={(result) => this.handleUploadImages(result)}
                        preload={true}
                      />
                    </a>
                    {this.state.formData.image && <img src={this.state.formData.image} />}
                  </div>
                  <button className="button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default NewRecipe