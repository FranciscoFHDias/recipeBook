import React from 'react'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import Auth from '../../lib/auth'
import Filestack from 'filestack-react'

const options = {
  accept: 'image/*',
  options: {
    resize: {
      width: 50
    }
  },
  transformations: {
    crop: true,
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
      formData: {
      },
      errors: {},
      inputValueMethod: '',
      inputValueDietary: '',
      inputValueIngredients: '',
      valueMethod: [],
      valueDietary: [],
      valueIngredients: []
    }
    console.log(`state${this.state.valueMethod}`)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMethod = this.handleChangeMethod.bind(this)
    this.handleKeyDownMethod = this.handleKeyDownMethod.bind(this)
    this.handleInputChangeMethod = this.handleInputChangeMethod.bind(this)
    this.handleChangeDietary = this.handleChangeDietary.bind(this)
    this.handleKeyDownDietary = this.handleKeyDownDietary.bind(this)
    this.handleInputChangeDietary = this.handleInputChangeDietary.bind(this)
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this)
    this.handleKeyDownIngredients = this.handleKeyDownIngredients.bind(this)
    this.handleInputChangeIngredients = this.handleInputChangeIngredients.bind(this)
    this.handleChangeString = this.handleChangeString.bind(this)
    this.handleUploadImages = this.handleUploadImages.bind(this)
    
  }

  handleSubmit(e) {
    const data = { ...this.state.formData, method: this.state.valueMethod.map(step => step.value), ingredients: this.state.valueIngredients.map(ingredient => ingredient.value), dietary: this.state.valueDietary.map(diet => diet.value)}
    console.log(data)
    e.preventDefault()
    axios
      .post('/api/recipes', data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/recipes'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChangeString(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  handleInputChangeMethod (inputValueMethod) {
    this.setState({ inputValueMethod })
  }

  handleChangeMethod(valueMethod, actionMeta) {
    console.group('Value Changed')
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    this.setState({ valueMethod: [] })
  }

  handleKeyDownMethod (event) {
    const { inputValueMethod, valueMethod } = this.state
    if (!inputValueMethod) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added')
        console.log(valueMethod)
        console.groupEnd()
        this.setState({
          inputValueMethod: '',
          valueMethod: [...valueMethod, createOption(inputValueMethod)]
        })
        event.preventDefault()
    }
  }

  handleInputChangeDietary (inputValueDietary) {
    this.setState({ inputValueDietary })
  }

  handleChangeDietary(valueDietary, actionMeta) {
    console.group('Value Changed')
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    this.setState({ valueDietary: [] })
  }

  handleKeyDownDietary (event) {
    const { inputValueDietary, valueDietary } = this.state
    if (!inputValueDietary) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added')
        console.log(valueDietary)
        console.groupEnd()
        this.setState({
          inputValueDietary: '',
          valueDietary: [...valueDietary, createOption(inputValueDietary)]
        })
        event.preventDefault()
    }
  }

  handleInputChangeIngredients (inputValueIngredients) {
    this.setState({ inputValueIngredients })
  }

  handleChangeIngredients(valueIngredients, actionMeta) {
    console.group('Value Changed')
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    this.setState({ valueIngredients: [] })
  }

  handleKeyDownIngredients (event) {
    const { inputValueIngredients, valueIngredients } = this.state
    if (!inputValueIngredients) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added')
        console.log(valueIngredients)
        console.groupEnd()
        this.setState({
          inputValueIngredients: '',
          valueIngredients: [...valueIngredients, createOption(inputValueIngredients)]
        })
        event.preventDefault()
    }
  }

  render() {
    console.log(this.state)
    const { inputValueMethod, valueMethod, inputValueDietary ,valueDietary, inputValueIngredients ,valueIngredients } = this.state
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
                      onChange={this.handleChangeString}
                    />
                    {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <input
                      className="textarea"
                      name="description"
                      placeholder="eg: This custard tart recipe makes as-close-to-authentic Portuguese custard tarts with a rich egg custard nestled in shatteringly crisp pastry."
                      onChange={this.handleChangeString}
                    />
                    {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Ingredients</label>
                    <CreatableSelect
                      components={components}
                      inputValue={inputValueIngredients}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={this.handleChangeIngredients}
                      onInputChange={this.handleInputChangeIngredients}
                      onKeyDown={this.handleKeyDownIngredients}
                      placeholder="eg: 200ml double cream"
                      value={valueIngredients}
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
                      onChange={this.handleChangeString}
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
                      onChange={this.handleChangeString}
                    />
                    {this.state.errors.cookingTime && <small className="help is-danger">{this.state.errors.cookingTime}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Dietary</label>
                    <CreatableSelect
                      components={components}
                      inputValue={inputValueDietary}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={this.handleChangeDietary}
                      onInputChange={this.handleInputChangeDietary}
                      onKeyDown={this.handleKeyDownDietary}
                      placeholder="eg: Vegetarian"
                      value={valueDietary}
                    />
                    {this.state.errors.dietary && <small className="help is-danger">{this.state.errors.dietary}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Method</label>
                    <CreatableSelect
                      components={components}
                      inputValue={inputValueMethod}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={this.handleChangeMethod}
                      onInputChange={this.handleInputChangeMethod}
                      onKeyDown={this.handleKeyDownMethod}
                      placeholder="eg: Put the cream and milk into a large pan and gently bring to just below boiling point."
                      value={valueMethod}
                    />
                    {this.state.errors.method && <small className="help is-danger">{this.state.errors.method}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Image</label>
                    <a>
                      <Filestack
                        mode="transform"
                        apikey= {process.env.FILESTACKKEY}
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