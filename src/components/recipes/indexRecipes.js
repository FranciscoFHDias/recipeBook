import React from 'react'
import { Link } from 'react-router-dom'
import Card from './indexCard'
import axios from 'axios'

class IndexRecipes extends React.Component{
  constructor() {
    super()
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    axios.get('/api/recipes')
      .then(res => {
        this.setState({ recipes: res.data })
      })
  }

  render() {
    console.log(this.state.recipes)
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {!this.state.recipes && <h2 className="title is-2">Loading</h2>}
            {this.state.recipes.map(recipe => 
              <div key={recipe._id} className="column is-half-tablet is-one-quarter-desktop">
                <Link to={`/recipes/${recipe._id}`}>
                  <Card {...recipe} />
                </Link>
              </div>)}
          </div>
        </div>
      </section>
    )
  }
}

export default IndexRecipes