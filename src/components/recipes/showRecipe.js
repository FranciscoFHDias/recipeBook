import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class ShowRecipe extends React.Component{
  constructor() {
    super()
    this.state ={
      recipe: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    axios
      .get(`/api/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ recipe: res.data }))
  }

  handleDelete(e) {
    e.preventDefault()
    axios
      .delete(`/api/recipes/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/recipes/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    if(!this.state.recipe.ingredients && !this.state.recipe.method) return null
    return(
      <section className="section">
        <div className="container">
          <div className="column">
            <h1 className="title">{this.state.recipe.name}</h1>
          </div>
          <div className="columns is-multiline">
            <div className="column">
              <div className="tile is-parent">
                <figure className="imageShow">
                  <img src={this.state.recipe.image} />
                </figure>
              </div>
            </div>
            <div className="column">
              <div className="container">
                <h2 className="is-2"><strong>Preparation Time</strong></h2>
                <h2 className="is-2">{this.state.recipe.preparationTime}min</h2>
                <br/>
                <h2 className="is-2"><strong>Cooking Time</strong></h2>
                <h2 className="is-2">{this.state.recipe.cookingTime}min</h2>
                <br />
                {!this.state.recipe.dietary && <h2 className="is-2"><strong>Dietary</strong></h2>}
                {!this.state.recipe.dietary && <h2 className="is-2">{this.state.recipe.dietary}</h2>}
                <br />
                {Auth.isAuthenticated() && <a className="button" onClick={this.handleDelete}>Delete</a>}
              </div>
            </div>
          </div>
          <div className="columns is-multiline">
            <div className="column">
              <h1 className="title is-4">Ingredients</h1>
              {this.state.recipe.ingredients.map((ingredient, i) => <p key={i}>{ingredient}</p>)}
            </div>
            <div className="column">
              <h1 className="title is-4">Method</h1>
              {this.state.recipe.method.map((step, i) => 
                <div key={i} className="columns is-multiline">
                  <div className="column is-1">
                    <p>{i+1}.</p>
                  </div>
                  <div className="column">
                    <p>{step}</p>
                  </div>
                </div> 
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ShowRecipe
