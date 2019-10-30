import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return(
      <section className="hero is-large" >
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Recipe Book
            </h1>
            <h2 className="subtitle">
              Your favorite cooking buddy!
            </h2>
            <div className="buttons are-normal">
              <Link 
                className="button"
                to={{
                  pathname: '/login'
                }}>
                  Login
              </Link>
              <Link 
                className="button"
                to={{
                  pathname: '/register'
                }}>
                  Register
              </Link>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p className="has-text-black">
              <strong>Recipe Book</strong> by <a className="has-text-black" rel="noopener noreferrer" target="_blank" href="https://franciscofhdias.github.io/fd/">Francisco Dias</a> with &hearts;.
            </p>
          </div>
        </footer>
      </section>
    )
  }
}

export default Home